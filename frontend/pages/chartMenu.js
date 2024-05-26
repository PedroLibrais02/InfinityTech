// // let label = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']

// // let data = [12, 19, 3, 5, 2, 3]

var chartsList = [];

function createChart(id, labels, data, i) {
  let minhaChart = new Chart(document.getElementById(id), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Banco',
        data: data,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function itemChart(i) {
  return `
    <div style="background-color: #e8e7e7;">
      <div style="display: flex; justify-content: right; flex-direction: row;">
        <button style="border:none; color: black;" onclick="removeChart('myChart${i}')">Remover</button>
      </div>
      <canvas id="myChart${i}"></canvas>
    </div>
  `;
}

function addChart(i) {
  let div = itemChart(listaBusca[i]['Nome']);

  let label = ["Ativo Total (R$)", "Captações (R$)", "Patrimônio Líquido (R$)", "Carteira de Crédito Classificada (R$)"];
  let data = [
    listaBusca[i]["Ativo Total (R$)"], 
    listaBusca[i][ "Captações (R$)"], 
    parseInt(listaBusca[i]["Patrimônio Líquido (R$)"]), 
    parseInt(listaBusca[i]["Carteira de Crédito Classificada (R$)"])
  ];

  chartsList.unshift({
    "id": `${listaBusca[i]['Nome']}_${Math.random(0, 100)}`,
    "label": label,
    "data": data,
    "div": div,
    "divClass": `myChart${listaBusca[i]['Nome']}`,
    "chart": ''
  });

  console.log(chartsList);
  // if(menu.style.left == "0px") {
    listCharts();
  // }
}

function removeChart(i) {
  chartsList.pop(chartsList.findIndex((element) => element["id"] == i));
  listCharts();
}

function listCharts() {
  var div = document.getElementById("contentSideMenu");

  div.innerHTML = "";
  for(var i = 0; i < chartsList.length; i ++) {
    div.innerHTML += chartsList[i]["div"];
    createChart(chartsList[i]["divClass"], chartsList[i]["label"], chartsList[i]["data"], i);
  }
}