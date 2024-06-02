const url_api = "http://127.0.0.1:5000/getInfoFromBank/";
const divBancos = document.querySelector("#bancos_classe");

var listaBusca = [];

async function search() {
  divBancos.innerHTML = "";
  let text = document.getElementById("search").value;
  await fetch(url_api + text + '/' + moneySelected, {
    method: "GET",
    mode: "cors", 
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrerPolicy: "no-referrer"
  })
    .then((data) => data.json() )
    .then((response) => {
      if(response[1] == 500) {
        console.log("Banco não encontrado!");
      } else {
        writeBanks([response], moneySelected);
      }
    });
}

function writeBanks(data=[], money="NULL") {
  data.forEach((element) => {
    let obj = fomartDataResponse(element);
    let ife = money == "NULL"? "R$" : "$";
    obj["ife"] = ife;
    let i = listaBusca.push(obj);

    divBancos.innerHTML += `<li class="dados_banco"> 
      <hr>
      <div class='container_banco'>
        <div id='info_banco'>
          <div class="header_banco">
            <img height="50px" src="https:${element['Logo']}" alt="">
            <button 
              onclick="addChart(${i-1})"
            >
              <span class="material-symbols-outlined">
                  add_circle
              </span>
            </button>
          </div>
          <div class="content_banco">
            <h2>${String(element.Nome).toUpperCase()} - ${element['Publicação']}</h2>
            <p>Ativo Total: ${ ife + " " + obj['Ativo Total (R$)']}</p>
            <p>Lucro Líquido: ${ ife + " " + obj['Lucro Líquido (R$)']}</p>
            <p>Patrimônio Líquido: ${ ife + " " + obj['Patrimônio Líquido (R$)']}</p>
          </div>
        </div>
      </div>
      <hr>
    </li>`;
    // console.log(divBancos.innerHTML);
  });
}

function convertOfNumber(valor) {
  const numeroLimpo = valor.replace(/[R$,]/g, '')
    .replace("USD", "")
    .replace('trilhão', 'e12')
    .replace('trilhões', 'e12')
    .replace('bilhão', 'e9')
    .replace('bilhões', 'e9')
    .replace('milhão', 'e6')
    .replace('milhões', 'e6')
    .replace(/\s+/g, '');
  return parseFloat(numeroLimpo);
}

function fomartDataResponse(dados={}) {
  const dadosProcessados = {};
  for (const chave in dados) {
    if (dados.hasOwnProperty(chave)) {
      if (chave.includes("(R$)")) {
        dadosProcessados[chave] = convertOfNumber(dados[chave]);
      } else {
        dadosProcessados[chave] = dados[chave];
      }
    }
  }
  return dadosProcessados;
}
