  const opacityMaxAtY = 200,
    toTopButtonClass = 'To_Top_Button',
    startYShift = 600;

let bttDiv = document.getElementsByClassName(toTopButtonClass)[0];

calcToTopOpacity();
window.addEventListener('scroll',calcToTopOpacity);

function calcToTopOpacity(){
  let opacity = (window.pageYOffset - startYShift) / opacityMaxAtY;
  opacity = opacity > 1 ? 1 : opacity;
  bttDiv.style.opacity = opacity;
}
