const anchors = [].slice.call(document.querySelectorAll('div[href*="#"]'));

anchors.forEach(function(item) {
  item.addEventListener('click', function(e) {e.preventDefault();
    let
      screenY = window.pageYOffset,
      targetY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + screenY;
    window.scrollTo({
      top:targetY,
      behavior: "smooth"});
  });
});
