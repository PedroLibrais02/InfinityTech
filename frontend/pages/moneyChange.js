var money = ['NULL', 'USD', 'EUR', 'GBP'];
var moneySelected = 'NULL';

function changeMoney(index) {
  console.log(moneySelected);
  let bnn1 = document.getElementById("img-bunner1");
  let bnn2 = document.getElementById("img-bunner2");
  let bnn3 = document.getElementById("img-bunner3");
  let bnn4 = document.getElementById("img-bunner4");

  let img1 = document.getElementById("img1");
  let img2 = document.getElementById("img2");
  let img3 = document.getElementById("img3");
  let img4 = document.getElementById("img4");

  let bunners = [bnn1, bnn2, bnn3, bnn4];
  let imgs = [img1, img2, img3, img4];

    bunners.forEach(bunner => {
        bunner.style.right = '';
        bunner.style.zIndex = '';
    });

    imgs.forEach(img => {
        img.style.border = '';
    });

  moneySelected = money[index];
    switch(index) {
        case 0:
            bnn1.style.right = '5px';
            img1.style.border = '2px solid black';
           
           
            break;
        case 1:

            bnn2.style.right = '5px';
            img2.style.border = '2px solid black';
            
            
        
            break;
        case 2:
  
            bnn3.style.right = '5px';
            img3.style.border = '2px solid black';
       
            break;
        case 3:

            bnn4.style.right = '5px';
            img4.style.border = '2px solid black';
            break;
    }

  // if(moneySelected == 'NULL') {
  //   moneySelected = money[0];
  //   bnn1.style.right = '5px';
  //   bnn2.style.right = '35px';
  //   bnn3.style.rigth =
   
    
  //   img1.style.border = '0.5px solid black';
  //   img2.style.border = '2px solid black';
   


  // } 
  
  // else {
  //   moneySelected = money[1];
  //   bnn2.style.right = '5px';
  //   bnn1.style.right = '35px';
   

  //   // bnn2.style.zIndex = 2;
  //   // bnn1.style.zIndex = 3;

  //   img2.style.border = '0.5px solid black';
  //   img1.style.border = '2px solid black';
  // }

  if(document.getElementById("search").value != '') {
    search();
  }
}