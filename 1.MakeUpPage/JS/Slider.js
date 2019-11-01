const
  sliderImageClass = 'Images_Container__Image',
  sliderControlClass = 'Slider__Slider_Controls',
  sliderControlHTMLContent = '<div class="Slider_Controls__Dot Slider_Controls__Dot__Selected">'
    +'<div class="Dot__Filler"></div>'
    +'</div>',
  sliderControlDotSelectedClass='Slider_Controls__Dot__Selected',
  timerInterval = 4000;

let imageUrls = [
  'Src/Header/Slider/Background1.jpg',
  'Src/Header/Slider/Background21.png',
  'Src/Header/Slider/Background23.png'
],
  lastImageIndex,
  currentImageIndex,
  sliderImageElems,
  sliderControlElems,
  sliderTimer;


initSlider();
startSliderTimer();

function initSlider(){
  initSliderImages();
  initSliderControls();
}

function initSliderImages(){
  let
    imageElemHTML = `<div class="${sliderImageClass}"></div>`,
    imagesContainer = document.getElementsByClassName('Slider__Images_Container')[0];
  for (let i = 0; i < imageUrls.length; ++i){
    imagesContainer.innerHTML += imageElemHTML;
  }
  sliderImageElems = document.getElementsByClassName(sliderImageClass);
  for (let i = 0; i < imageUrls.length; ++i){
    sliderImageElems[i].style["background-image"] = `url(${imageUrls[i]})`;
    sliderImageElems[i].style.left = i == 0 ? "0" : "100%";
    sliderImageElems[i].style.opacity = i == 0 ? "1" : "0";
  }
  lastImageIndex = 0;
  currentImageIndex = 0;
}

function initSliderControls(){
  dotElem = document.getElementsByClassName("Slider_Controls__Dot")[0];
  newDot = dotElem.parentNode.innerHTML;

  sliderControlElement = document.getElementsByClassName("Slider__Slider_Controls")[0];
  for (let i = 0; i < imageUrls.length - 1; i++) {
    sliderControlElement.innerHTML+=newDot;
  }
  sliderControlElems = document.getElementsByClassName("Slider_Controls__Dot");
  sliderControlElems[0].classList.add(sliderControlDotSelectedClass);

  for (let i = 0; i < imageUrls.length; i++) {
    sliderControlElems[i].setAttribute("onclick",`controlClick(${i})`);
  }
}

function startSliderTimer(){
  if (sliderTimer) {
    clearInterval(sliderTimer);
  }
  if (imageUrls.length >= 2) {
    sliderTimer = setInterval(timerCycle, timerInterval);
  }
}

function timerCycle(){
  let nextImageIndex = getNextIndex(currentImageIndex, imageUrls.length);
  setSliderImage(nextImageIndex);
}

function controlClick(controlIndex){
  setSliderImage(controlIndex);
  startSliderTimer();
}

function setSliderImage(imageIndex){
  lastImageIndex = currentImageIndex;
  slidePicture(imageIndex);
  setSlideControlActive(imageIndex);
  currentImageIndex = imageIndex;
}

function slidePicture(imageIndex){
  sliderImageElems[lastImageIndex].style.left = "-100%";

  sliderImageElems[imageIndex].classList.toggle("No_Transition");
  var triggerLayout = sliderImageElems[imageIndex].offsetHeight;
  sliderImageElems[imageIndex].style.opacity = "0";
  sliderImageElems[imageIndex].style.left="100%";
  sliderImageElems[imageIndex].classList.toggle("No_Transition");

  sliderImageElems[imageIndex].style["transition-property"] = "left";
  sliderImageElems[imageIndex].style["transition-duration"] = "0.8s";
  sliderImageElems[imageIndex].style.opacity = "1";
  sliderImageElems[imageIndex].style.left="0%";

  for (let i = 0; i < imageUrls.length; i++) {
    if ((i == lastImageIndex) || (i == imageIndex)) {
      continue;
    }
    sliderImageElems[i].style["transition-duration"] = "0s";
    sliderImageElems[i].style.opacity = "0";
    sliderImageElems[i].style.left="100%";
  }
}

function setSlideControlActive(controlIndex){
  for (let i = 0; i < imageUrls.length; i++) {
    if (i == controlIndex) {
      sliderControlElems[i].classList.add(sliderControlDotSelectedClass);
    } else {
      sliderControlElems[i].classList.remove(sliderControlDotSelectedClass);
    }
  }
}

function getNextIndex(currentIndex, limit) {
  return currentIndex >= limit - 1 ? 0 : currentIndex + 1;
}

function getPreviousIndex(currentIndex, limit) {
  return currentIndex <= 0 ? limit - 1 : currentIndex - 1;
}
