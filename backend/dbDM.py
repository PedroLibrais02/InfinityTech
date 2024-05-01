"""
    DataModulo destinado apenas às operações envolvendo 
    Banco de Dados.
"""
import time
import sqlite3
from os import path

#timestamp atual em segundos
def gerar_id():
    timestamp = int(time.time())
    return timestamp

# Relaiza o sql fornecido via parametro 
def do_SQL(sql, valores=None):
    DBConnection = sqlite3.connect('InfinityTech.db')
    DBCursor = DBConnection.cursor() 
    
    DBCursor.execute(sql, valores)
    DBConnection.commit()
    DBConnection.close()

# Retorna o primeiro resultado obtido do select realizado
def return_from_sql(sql, valores=None):
    DBConnection = sqlite3.connect('InfinityTech.db')
    DBCursor = DBConnection.cursor() 
    
    DBCursor.execute(sql, valores)
    result = DBCursor.fetchone()  # Usar fetchone() para retornar apenas um resultado
    
    if result is not None:
        result_string = str(result[0])  # Convertendo o primeiro elemento da tupla para string
        if result_string.isdigit():  # Verificando se é um número
            return int(result_string)  # Convertendo para int se for número
        else:
            return result_string  # Retornando como string caso contrário
    else:
        return None  # Retorna None se não houver resultados

    DBConnection.close()


# Cria a estrutura do banco de dados, por enquanto pequena
# DBeaver para visualização e operações no DB
def criar_tabelas_e_fk():
    try:
        if not path.exists('InfinityTech.db'):
            open('InfinityTech.db', 'w').close()
            
        DBConnection = sqlite3.connect('InfinityTech.db')
        DBCursor = DBConnection.cursor()

        # link do diagram: https://dbdiagram.io/d/Scrapping_BCC-C-65f1ba82b1f3d4062cd69cb4
        # Comando para criar a tabela 'Bancos', se não existir
        DBCursor.execute('''CREATE TABLE IF NOT EXISTS `Bancos` (
                            `ID` INTEGER PRIMARY KEY,
                            `Nome` VARCHAR(100)
                          )''')

        # Comando para criar a tabela 'Ultimo_Balanco', se não existir
        DBCursor.execute('''CREATE TABLE IF NOT EXISTS `Ultimo_Balanco` (
                            `ID` INTEGER PRIMARY KEY,
                            `publicacao` DATE,
                            `lucro_liquido` VARCHAR(30),
                            `patrimonio_liquido` VARCHAR(30),
                            `ativo_total` VARCHAR(30),
                            `captacoes` VARCHAR(30),
                            `carteira_credito` VARCHAR(30),
                            `patrimonio_ref` VARCHAR(30),
                            `agencias` INTEGER,
                            `pontos_atendimento` INTEGER
                          )''')

        # Confirma as alterações no banco de dados
        DBConnection.commit()
        print("Tabelas criadas com sucesso.")

    except sqlite3.Error as Error:
        print("Erro ao criar tabelas:", Error)

    finally:
        # Fecha a conexão com o banco de dados
        DBConnection.close()

def save_to_sqlite(data):
    try:
        # Estabelece a conexão com o banco de dados
        db_connection = sqlite3.connect('InfinityTech.db')
        db_cursor = db_connection.cursor()
        
        sId = data.get('ID', None)
        
        # Verifica se o registro já existe na tabela
        db_cursor.execute("SELECT ID FROM ultimo_balanco WHERE ID=?", (sId,))
        existing_banco = db_cursor.fetchone()

        if existing_banco:
            # Atualiza o registro existente
            db_cursor.execute("""
                UPDATE ultimo_balanco SET
                publicacao=?,
                lucro_liquido=?,
                patrimonio_liquido=?,
                ativo_total=?,
                captacoes=?,
                carteira_credito=?,
                patrimonio_ref=?,
                agencias=?,
                pontos_atendimento=?
                WHERE ID=?
            """, (
                data.get('Publicação', ''),
                data.get('Lucro Líquido (R$)', ''),
                data.get('Patrimônio Líquido (R$)', ''),
                data.get('Ativo Total (R$)', ''),
                data.get('Captações (R$)', ''),
                data.get('Carteira de Crédito Classificada (R$)', ''),
                data.get('Patrimônio de Referência RWA (R$)', ''),
                data.get('Número de Agências', ''),
                data.get('Número de Pontos de Atendimento', ''),
                sId
            ))
        else:
            # Insere um novo registro
            db_cursor.execute("""
                INSERT INTO ultimo_balanco 
                (ID, publicacao, lucro_liquido, patrimonio_liquido, ativo_total, captacoes, carteira_credito, patrimonio_ref, agencias, pontos_atendimento) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                sId,
                data.get('Publicação', ''),
                data.get('Lucro Líquido (R$)', ''),
                data.get('Patrimônio Líquido (R$)', ''),
                data.get('Ativo Total (R$)', ''),
                data.get('Captações (R$)', ''),
                data.get('Carteira de Crédito Classificada (R$)', ''),
                data.get('Patrimônio de Referência RWA (R$)', ''),
                data.get('Número de Agências', ''),
                data.get('Número de Pontos de Atendimento', '')
            ))

        db_connection.commit()

    finally:
        db_connection.close()



