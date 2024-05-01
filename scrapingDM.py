"""
    DataModulo destinado apenas às operações envolvendo 
    Scraping de Web Sites.
"""
import dbDM #InfinityTech Data Module
import requests
from bs4 import BeautifulSoup

def getPossibleFromIndexesScrap(url, search_term):
    try:    
        response = requests.get(url)
        
        if response.status_code == 200: 
            banco_parser = BeautifulSoup(response.text, 'html.parser')
            info_bancos = banco_parser.find('div', {'class': 'col-md-6'})
            print(info_bancos)
            for item in info_bancos.find_all('div', {'class' : 'row'}):
                #pega o html puro da imagem. ie: src, alt e class
                temp = item.find('div', {'class': 'col-md-10'})
                print(temp)
                title = temp.find('href="')
                print(title)
            
            return 'bancos_data'
        
    except Exception as Error:
        return Error
    return '???'

def getDictFromScrap(url, banco_nome):
    try:    
        response = requests.get(url)
        
        if response.status_code == 200: 
            banco_parser = BeautifulSoup(response.text, 'html.parser')
            info_banco = banco_parser.find('ul', {'class': 'statistics'})
            bancos_data = {'Nome': banco_nome}
            
            # Obtendo ID do banco, se existir
            sId = None
            sId = dbDM.return_from_sql('SELECT ID FROM bancos WHERE nome LIKE ?', [banco_nome])

            if not sId:
                sId = dbDM.gerar_id()
                dbDM.do_SQL('INSERT OR IGNORE INTO Bancos (ID, Nome) VALUES (?, ?)', [sId, banco_nome])

            bancos_data['ID'] = sId

            # Extraindo informações do banco
            for item in info_banco.find_all('li'):
                key = item.find('span').text.strip()
                value = item.find('strong').text.strip()
                bancos_data[key] = value
        
            return bancos_data
        else:
            return None
    except Exception as Error:
        return Error