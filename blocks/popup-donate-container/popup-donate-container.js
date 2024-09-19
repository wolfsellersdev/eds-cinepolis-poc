export default async function decorate(block) {
  const parent = block.parentElement.parentElement;
  const button = document.querySelector('[data-action="/fomrulario-apoya-nuestra-causa"]')
  .querySelector('button');
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
  