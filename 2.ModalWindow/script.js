const
  buttonClass = "Open_Modal_Window_Button",
  modalWindowHolderClass = "Modal_Window_Holder",
  modalWindowClass = "Modal_Window",
  modalWindowCloseButtonClass = "Modal_Window__Close_Button",
  modalWindowBackgroundClass = "Modal_Window_Holder__Background",
  showHideDelay = 200; //ms
  buttonDisplayValue = 'table';

let
  buttonElement,
  modalWindowElement,
  windowOpened = false,
  doAnimate = false,
  initialWindowWidth;

initModalWindow();

function initModalWindow() {
  buttonElement = document.getElementsByClassName(buttonClass)[0];
  modalWindowHolderElement = document.getElementsByClassName(modalWindowHolderClass)[0];
  modalWindowElement = document.getElementsByClassName(modalWindowClass)[0];

  let
    closeButtonElement = document.getElementsByClassName(modalWindowCloseButtonClass)[0],
    modalWindowBackgroundElement = document.getElementsByClassName(modalWindowBackgroundClass)[0];

  let errorMessage;
  if (!buttonElement){
    errorMessage = "Modal button is not found!";
  } else if (!modalWindowHolderElement) {
    errorMessage = "Modal window holder is not found!";
  } else if (!modalWindowElement) {
    errorMessage = "Modal window is not found!";
  } else if (!closeButtonElement) {
    errorMessage = "Close button is not found!";
  } else if (!modalWindowBackgroundElement) {
    errorMessage = "Background element is not found!"
  }
  if (errorMessage) {
    alert("Error!\n"+errorMessage);
    return;
  }

  initialWindowWidth = document.body.clientWidth;
  buttonElement.addEventListener("click",showModalWindow);
  closeButtonElement.addEventListener("click", hideModalWindow);
  modalWindowBackgroundElement.addEventListener("click",hideModalWindow);
  window.onresize = goResize;
}

function showModalWindow(){
  if (windowOpened) return;
  if (doAnimate) return;
  windowOpened = true;
  setScrollingActive(false);

  buttonElement.style.opacity = 0;

  doAnimate = true;
  setTimeout(() => {
    buttonElement.style.display = "none";
    doAnimate = false;
  },showHideDelay);

  modalWindowHolderElement.style.display = "block";
  modalWindowHolderElement.style.opacity = 1;
  modalWindowElement.style.left = "10%";
  modalWindowElement.style.top = "10%";
  goCenterModalWindow();
}


function hideModalWindow(){
  if (!windowOpened) return;
  if (doAnimate) return;

  buttonElement.style.display = buttonDisplayValue;
  buttonElement.style.opacity = 1;

  modalWindowHolderElement.style.opacity = 0;
  modalWindowElement.style.left="80%";
  modalWindowElement.style.top="80%";


  doAnimate = true;
  setTimeout(() => {
    modalWindowHolderElement.style.display = "none";
    doAnimate = false;
  },
  showHideDelay);
  windowOpened = false;
  setScrollingActive(true);
}

function goResize(){
  initialWindowWidth = document.body.clientWidth;
  document.body.style.width=null;
  goCenterModalWindow();
}

function goCenterModalWindow(){
  if (!windowOpened) return;
  if (!modalWindowElement) return;
  let
    modalWindowHeight = modalWindowElement.clientHeight,
    modalWindowWidth = modalWindowElement.clientWidth,
    screenWidth = window.innerWidth,
    screenHeight = window.innerHeight,
    aLeft = Math.ceil(screenWidth/2)  - Math.ceil(modalWindowWidth/2),
    aTop  = Math.ceil(screenHeight/2) - Math.ceil(modalWindowHeight/2);
  modalWindowElement.style.top = aTop+"px";
  modalWindowElement.style.left = aLeft+"px";
}

function setScrollingActive(aActive){
  let contentWidth = document.body.clientWidth;

  if (aActive) {
    document.body.style.scroll = undefined;
    document.body.style.overflow = "";
  } else {
    document.body.style.scroll="disable";
    document.body.style.overflow = "hidden";
  }
  document.body.style.width = initialWindowWidth+"px";
}
