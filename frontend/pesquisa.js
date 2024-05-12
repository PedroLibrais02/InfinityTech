
bancos_classe.style.display = 'none';
let texto = "Banco não encontrado";

    function search() {
        let input = document.getElementById('search').value.toLowerCase();
        let x = document.getElementsByName('dados_banco');
        let conteudoDiv = document.querySelector("#conteudo");
        conteudoDiv.textContent = texto;
        if(input === '') {
            // Se a barra de pesquisa estiver vazia, oculta todos os elementos
            for(let i = 0; i < x.length; i++) {
                x[i].style.display = 'none';
                conteudoDiv.textContent = '';
            }
              
        } else {
            for(let i = 0; i < x.length; i++) {
                if(!x[i].innerHTML.toLowerCase().includes(input)) {
                    x[i].style.display = 'none';
                    
                    console.log(texto)
                   
                    
                  
                } else {
                    x[i].style.display = 'list-item';
                    conteudoDiv.textContent = '';
                }
            }
            // Mostra o elemento bancos_classe, se existir
            let bancos_classe = document.getElementById('bancos_classe');
            if(bancos_classe) {
                bancos_classe.style.display = 'list-item';
                
                
            }else{
                console.log(texto)
            }
            
        }
        
    }
   