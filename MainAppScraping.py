"""
    Main Unit da nossa aplicação base
"""
import tkinter as tk
from os import path
import dbDM #InfinityTech DB Data Module
import scrapingDM #InfinityTech Scraping Data Module

def scrap_banco(label_message, entry_banco):
    try:  
        banco_nome = entry_banco.get()
        if not banco_nome:
            label_message.config(text="Por favor, insira o nome do banco.", fg="red")
            return None

        url = f'https://bancodata.com.br/relatorio/{banco_nome}/'
        dict_banco = scrapingDM.getDictFromScrap(url, banco_nome)

        if dict_banco is not None:     
            label_message.config(text="Informações do banco obtidas com sucesso.", fg="green")
        else:
            # label_message.config(text=f'Erro ao acessar o site: {dict_banco}. Verifique se o nome do banco foi digitado corretamente.', fg="red")
            banco_nome = '?i='+banco_nome.replace(' ', '+')
            label_message.config(text=f'Lista de sites acessaveis similares a esse nome: https://bancodata.com.br/{banco_nome}')
            url = f'https://bancodata.com.br/{banco_nome}'
            indexes_banco = scrapingDM.getPossibleFromIndexesScrap(url, banco_nome)
            label_message.config(text=f'Lista de sites acessaveis similares a esse nome: {indexes_banco}', fg="black")
            #label_message.config(text=f'Lista de sites acessaveis similares a esse nome: {dict_possiveis}')
        
        return dict_banco
    except Exception as Error:
        label_message.config(text=f"Erro durante o scraping dos dados:\n{(Error)}", fg="red")
        return None
    
def main():
    mainScreen = tk.Tk()
    mainScreen.title("WebScraping 1BCC-C")
    mainScreen.geometry("450x200")  # Define o tamanho da janela principal
    mainScreen.resizable(False, False)

    label_message = tk.Label(mainScreen, text="")
    label_message.pack(pady = 15)

    entry_banco = tk.Entry(mainScreen, width = 50)
    entry_banco.pack(pady = 15)

    if not path.exists('InfinityTech.db'): 
        dbDM.criar_tabelas_e_fk()
    
    def scrap_and_save():
        bancos_info = scrap_banco(label_message, entry_banco)
        if bancos_info:
            dbDM.save_to_sqlite(bancos_info)

    button_scrap = tk.Button(mainScreen, text="Pesquisar", command=scrap_and_save)
    button_scrap.pack(pady = 15)

    mainScreen.mainloop()

if __name__ == "__main__":
    main()
