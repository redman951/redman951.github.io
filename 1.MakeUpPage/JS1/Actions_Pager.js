
const
  pageItemClass = 'Pages__Item',
  actionImageClass = 'Action_List__Item',
  actionImageHideClass = 'Action_List__Item__Hidden',
  controlRemoveFillingClass = 'Hidden_Item';
  actionTimerInterval = 3000,
  actionTransitionTime = 300;

let
  pageItemContainers = document.getElementsByClassName(pageItemClass),
  pageItems = [],
  imageElements = document.getElementsByClassName(actionImageClass),
  switchTimer,
  actionPage = 1;

initActionPager();

function initActionPager() {
  for (let i = 0; i < pageItemContainers.length; i++) {
    pageItems[i] = pageItemContainers[i].firstChild;
    pageItemContainers[i].setAttribute("onclick",`setActionPage(${i+1})`);
  }
  switchTimer = setInterval(switchPage,actionTimerInterval+actionTransitionTime);
}

function actionButtonClick(buttonPageIndex) {
  if (switchTimer) {
    clearInterval(switchTimer);
  }
  setActionPage(buttonPageIndex);
  switchTimer = setInterval(switchPage,actionTimerInterval+actionTransitionTime);
}

function switchPage() {
  let maxPages = 3;
  setActionPage(actionPage<maxPages ? actionPage + 1 : 1);
}

function setActionPage(pageIndex){
  pageItems[actionPage-1].classList.toggle(controlRemoveFillingClass);
  pageItems[pageIndex-1].classList.toggle(controlRemoveFillingClass);
  actionPage = pageIndex;
  for (let i = 0; i < imageElements.length; i++) {
    imageElements[i].classList.toggle(actionImageHideClass);
  }

  setTimeout(
    ()=>{
      let newImageUrls = getImages(pageIndex, 3);
      for (let i = 0; i < newImageUrls.length; i++){
        imageElements[i].src = newImageUrls[i];
        imageElements[i].classList.toggle(actionImageHideClass);
      }
    },
    actionTransitionTime
  )
}

function getImages(page, cnt) {
  const actionUrls = [
    "src/Actions/Action1.png",
    "src/Actions/Action2.png",
    "src/Actions/Action3.png",
  ];
  let result = [];
  if (page <= 1) {
    result = actionUrls.slice(0);
  } else {
    randomValues = getRandomArray(0, actionUrls.length, cnt);
    result = randomValues.map((imgIndex) => {return actionUrls[imgIndex]});
  }
  return result;
}

function getRandom(minValue, maxValue) {
  return Math.floor(minValue+Math.random()*maxValue);
}

function getRandomArray(minValue, maxValue, valueCount) {
  let res = [];
  for (let i = 0; i < valueCount; i++) {
    res[i] = getRandom(minValue, maxValue);
  }
  return res;
}
