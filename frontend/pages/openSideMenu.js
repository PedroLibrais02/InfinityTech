function openMenu() {
  let menu = document.getElementById("containerSideMenu");
  let button = document.getElementById("iconMenu");
  if (menu.style.left === "-540px") {
    menu.style.left = "0px";
    button.style.rotate = "180deg";
    listCharts();
  } else {
    menu.style.left = "-540px";
    button.style.rotate = "0deg";
  }
}