var money = ['USD', 'NULL'];
var moneySelected = 'NULL';

function changeMoney() {
  let bnn1 = document.getElementById("img-bunner1");
  let bnn2 = document.getElementById("img-bunner2");

  let img1 = document.getElementById("img1");
  let img2 = document.getElementById("img2");

  if(moneySelected == 'NULL') {
    moneySelected = money[0];
    bnn1.style.right = '5px';
    bnn2.style.right = '35px';

    bnn1.style.zIndex = 2;
    bnn2.style.zIndex = 3;
    
    img1.style.border = '0.5px solid black';
    img2.style.border = '2px solid black';
  } else {
    moneySelected = money[1];
    bnn2.style.right = '5px';
    bnn1.style.right = '35px';

    bnn2.style.zIndex = 2;
    bnn1.style.zIndex = 3;

    img2.style.border = '0.5px solid black';
    img1.style.border = '2px solid black';
  }

  if(document.getElementById("search").value != '') {
    search();
  }
}