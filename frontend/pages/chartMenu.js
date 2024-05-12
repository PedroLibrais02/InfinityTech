// // let label = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']

// // let data = [12, 19, 3, 5, 2, 3]

// var chartsList = [];

// const createChart = (id, labels, data) => {
//   let ctx = document.getElementById(id);
//   new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: labels,
//       datasets: [{
//         label: '# of Votes',
//         data: data,
//         borderWidth: 1
//       }]
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     }
//   });
// }

// const itemChart = (i) => {
//   return `
//     <div style="background-color: white;">
//       <canvas id="myChart${i}"></canvas>
//     </div>
//   `;
// }

// function addChart(i="") {

//   console.log(i);
//   let div = itemChart(i);

//   chartsList[i] = {
//     "id": i,
//     "label": label,
//     "data": data,
//     "div": div,
//     "divClass": `myChart${i}`
//   };

//   console.log(chartsList);
// }

// function removeChart(i) {
//   chartsList.pop(chartsList.findIndex((element) => element["id"] == i));
// }

// function listCharts() {
//   const div = document.getElementById("contentSideMenu");

//   div.innerHTML = "";
//   chartsList.forEach((element) => {
//     div.innerHTML += element["div"];
//     createChart(element["divClass"], label, data)
//   });
// }