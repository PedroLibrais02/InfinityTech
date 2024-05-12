function openMenu() {
  const menu = document.getElementById("containerSideMenu");
  const button = document.getElementById("iconMenu");
  if (menu.style.left === "-440px") {
    menu.style.left = "0px";
    button.style.rotate = "180deg";
    listCharts();
  } else {
    menu.style.left = "-440px";
    button.style.rotate = "0deg";
  }
}