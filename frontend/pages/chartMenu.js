// // let label = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']

// // let data = [12, 19, 3, 5, 2, 3]

var chartsList = [];

const createChart = (id, labels, data) => {
  let ctx = document.getElementById(id);
  return new Chart(ctx, {
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

function removeChart(id) {
  chartsList.splice((chartsList.indexOf(id)));
}

function addChart(i) {
  let menu = document.getElementById("containerSideMenu");
  let div = itemChart(listaBusca[i]['Nome']);

  let label = ["Ativo Total (R$)", "Captações (R$)", "Patrimônio Líquido (R$)", "Carteira de Crédito Classificada (R$)"];
  let data = [
    listaBusca[i]["Ativo Total (R$)"], 
    listaBusca[i][ "Captações (R$)"], 
    parseInt(listaBusca[i]["Patrimônio Líquido (R$)"]), 
    parseInt(listaBusca[i]["Carteira de Crédito Classificada (R$)"])
  ];

  chartsList.push({
    "id": `${listaBusca[i]['Nome']}_${Math.random(0, 100)}`,
    "label": label,
    "data": data,
    "div": div,
    "divClass": `myChart${listaBusca[i]['Nome']}`
  });

  if(menu.style.left == "0px") {
    listCharts();
  }
}

function removeChart(i) {
  chartsList.pop(chartsList.findIndex((element) => element["id"] == i));
}

function listCharts() {
  const div = document.getElementById("contentSideMenu");

  div.innerHTML = "";
  for(var i = 0; i < chartsList.length; i ++) {
    let element = chartsList[i];
    div.innerHTML += element["div"];
    div.innerHTML += "<br>"
    createChart(element["divClass"], element["label"], element["data"])
  }
}