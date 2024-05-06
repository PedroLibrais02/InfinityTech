function openMenu() {
  const menu = document.getElementById("containerSideMenu");
  if (menu.style.left === "-440px") {
    menu.style.left = "0px";
    listCharts();
  } else {
    menu.style.left = "-440px";
  }
}