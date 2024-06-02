var chartsList = [];

function itemChart(id) {
  return `
    <div id="container_${id}" style="background-color: #e8e7e7;">
      <div style="display: flex; justify-content: right; flex-direction: row;">
        <button style="border:none; color: black;" onclick="removeChart('${id}')">Remover</button>
      </div>
      <canvas id="${id}"></canvas>
    </div>
  `;
}

function addChart(i) {
  const uniqueId = `myChart${Math.random().toString(36).substr(2, 9)}`;
  const div = itemChart(uniqueId);

  const labels = [`Ativo Total (${listaBusca[i]['ife']})`, `Captações (${listaBusca[i]['ife']})`, `Patrimônio Líquido (${listaBusca[i]['ife']})`, `Carteira de Crédito Classificada (${listaBusca[i]['ife']})`];
  const data = [
    listaBusca[i]["Ativo Total (R$)"], 
    listaBusca[i]["Captações (R$)"], 
    parseInt(listaBusca[i]["Patrimônio Líquido (R$)"]), 
    parseInt(listaBusca[i]["Carteira de Crédito Classificada (R$)"])
  ];

  chartsList.unshift({
    "id": uniqueId,
    "label": labels,
    "data": data,
    "div": div
  });

  listCharts();
}

function removeChart(id) {
  const index = chartsList.findIndex(element => element.id === id);
  if (index !== -1) {
    chartsList.splice(index, 1);
  }
  listCharts();
}

function listCharts() {
  const div = document.getElementById("contentSideMenu");
  div.innerHTML = ""; 

  for (let i = 0; i < chartsList.length; i++) {
    div.innerHTML += chartsList[i].div;
  }

  for (let i = 0; i < chartsList.length; i++) {
    const ctx = document.getElementById(chartsList[i].id).getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartsList[i].label,
        datasets: [{
          label: 'Banco',
          data: chartsList[i].data,
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
}