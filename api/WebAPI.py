from flask import Flask, jsonify
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)

def scrape_banco(banco_nome):
    url = f'https://bancodata.com.br/relatorio/{banco_nome}/'
    
    try:
        response = requests.get(url)
        if response.status_code == 200:
            banco_parser = BeautifulSoup(response.text, 'html.parser')
            info_banco = banco_parser.find('ul', {'class': 'statistics'})
            bancos_data = {'Nome': banco_nome}

            for item in info_banco.find_all('li'):
                key = item.find('span').text.strip()
                value = item.find('strong').text.strip()
                bancos_data[key] = value

            return bancos_data
        else:
            return {'error': 'Não foi possível acessar a URL fornecida.'}, 500
    except Exception as e:
        return {'error': f'Ocorreu um erro ao processar a solicitação: {str(e)}'}, 500

@app.route('/getInfoFromBank/<banco_nome>', methods=['GET'])
def get_info_from_bank_route(banco_nome):
    data = scrape_banco(banco_nome)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
