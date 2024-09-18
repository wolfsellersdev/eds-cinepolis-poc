export default async function decorate(block) {

  const cardsToShow = 3;
  const cards = [...block.children];
  const parentElement = block.parentElement;
  let index  = 0;
  let startX = 0;
  let startY = 0;
  let distX  = 0;
  let distY  = 0;
  const threshold = 50; // Min distance to cosider a swipe
  const restaint  = 100; // Max distance in the Y axis to consider a swipe
  const allowedTime = 500; // Max time for a valid swipe
  let startTime = 0;

    
  const renderCards = () => { 
    block.innerHTML = '';
    cards.slice(index, index + cardsToShow).forEach( e => {
      block.appendChild(e);
    });
  }

  if('ontouchstart' in window || navigator.maxTouchPoints > 0){
    block.addEventListener( 'touchstart',  e => {
      const touchObj = e.changedTouches[0];
      startX = touchObj.pageX;
      startY = touchObj.pageY;
      startTime = new Date().getTime();
      e.preventDefault();
    }, false);
    block.addEventListener('touchend', e => {
      const touchObj = e.changedTouches[0];
      distX = touchObj.pageX - startX;
      distY = touchObj.pageY - startY;
      const elapsedTime = new Date().getTime() - startTime;
      if( elapsedTime <= allowedTime && Math.abs(distX) >= threshold && Math.abs(distY) <= restaint ) {
        if( distX < 0 && (index + 1) <= (cards.length - cardsToShow)) {
          index++;
          renderCards();
        } else if( distX > 0 && (index - 1) >= 0) {
          index--;
          renderCards();
        }
      }
    });
  }


  const btnLeft = document.createElement('a');
  btnLeft.innerText = '<-- ';
  btnLeft.classList.add('prev-image');
  btnLeft.addEventListener('click', () => {
    if( index - 1 >= 0 ) {
      index--;
      renderCards();
    }
  });

  const btnRight = document.createElement('a');
  btnRight.innerText = ' -->';
  btnRight.classList.add('next-image');
  btnRight.addEventListener('click', () => {
    if( index + 1 <= (cards.length - cardsToShow) ){
      index++;
      renderCards();
    }
  });

  renderCards();

  parentElement.appendChild(btnLeft);
  parentElement.appendChild(btnRight);
}
  