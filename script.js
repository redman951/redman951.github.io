const
  link = [
    "1.MakeUpPage/index.html",
    "2.ModalWindow/index.html"
  ],
  pageElementClass = 'PagePresent';

function setLinks(){
  let elems = document.getElementsByClassName(pageElementClass);
  for (let i = 0; i < elems.length && i < link.length; ++i) {
    elems[i].addEventListener("click",() => document.location.href = link[i]);
  }
}
