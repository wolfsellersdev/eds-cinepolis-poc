export default async function decorate(block) {
  const parent = block.parentElement.parentElement;
  const button = document.querySelector('[data-action="/fomrulario-apoya-nuestra-causa"]')
    .querySelector('button');
  const checkStatus = () => {
    if (parent.getAttribute('data-section-status') === 'loaded') {
      parent.style.display = 'none';
    } else {
      setTimeout(checkStatus, 0);
    }
  };
  checkStatus();
  parent.children[0].querySelector('strong')
    .addEventListener('click', () => {
      parent.style.display = 'none';
    });
  button.addEventListener('click', (e) => {
    document.querySelector('[class="section popup-success-container"]')
      .removeAttribute('style');
    e.preventDefault();
  });
}
