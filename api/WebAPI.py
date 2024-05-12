from flask import Flask, jsonify
from bs4 import BeautifulSoup
from flask_cors import CORS
import requests
import re

app = Flask(__name__)
CORS(app)

import re
import requests

def scrape_banco(banco_nome, moeda):
    try:
        banco_nome = banco_nome.lower().strip().replace(" ", "-")
        url = f'https://bancodata.com.br/relatorio/{banco_nome}/'
        response = requests.get(url)

        if response.status_code == 200:
            banco_parser = BeautifulSoup(response.text, 'html.parser')
            info_banco = banco_parser.find('ul', {'class': 'statistics'})
            banco_image = banco_parser.find('img', {'class': 'img-rounded'})
            
            bancos_data = {}
            
            if banco_image:
                img_tag = banco_image['src']
                bancos_data['Logo'] =  img_tag
            else:
                bancos_data['Logo'] = None
                
            bancos_data['Nome'] = banco_nome
            
            for item in info_banco.find_all('li'):
                key = item.find('span').text.strip()
                value = item.find('strong').text.strip()
                bancos_data[key] = value

            if moeda != 'NULL':
                api_url = f'https://economia.awesomeapi.com.br/json/last/{moeda}-BRL'
                conversion_response = requests.get(api_url)
                
                if conversion_response.status_code == 200:
                    conversion_data = conversion_response.json()
                    
                    # Obtendo o valor da moeda específica na resposta JSON
                    valor_moeda_especifica = float(conversion_data[f'{moeda}BRL']['bid'])

                    # regex p/ encontrar o valor numérico e o texto separadamente
                    padrao = r'([\d.,]+)\s*([a-zA-Z]+(?:\s*[\w~\-,]*)*)'

                    # Atualiza os valores no JSON com a moeda convertida
                    for key, value in bancos_data.items():
                        if key != 'Nome' and key != 'Logo' and key != 'Publicação':
                            if key == 'Ativo Total (R$)' or key == 'Captações (R$)' or key == 'Carteira de Crédito Classificada (R$)' or key == 'Lucro Líquido (R$)' or key == 'Patrimônio Líquido (R$)' or key == 'Patrimônio de Referência RWA (R$)':
                                valores = re.match(padrao, value)
                                if valores:
                                    valor_em_reais = float(valores.group(1).replace(',', '.'))
                                    texto_unidade = valores.group(2)

                                    valor_em_moeda = valor_em_reais / valor_moeda_especifica
                                    # Formata o valor convertido para sempre exibir duas casas decimais
                                    bancos_data[key] = f'{moeda} {valor_em_moeda} {texto_unidade}'
                else:
                    return {'error': 'Não foi possível acessar a API de conversão de moeda.'}, 500

            return bancos_data
    except Exception as e:
        return {'error': f'Ocorreu um erro ao processar a solicitação: {str(e)}'}, 500

@app.route('/getInfoFromBank/<banco_nome>/<moeda>', methods=['GET'])
def get_info_from_bank_route(banco_nome, moeda):
    data = scrape_banco(banco_nome, moeda)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
