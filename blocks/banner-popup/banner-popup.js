export default async function decorate(block) {
  const button = block.querySelector('a');
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const popup = document.querySelector('[class="section form-container popup-donate-container-container"]');
    popup.removeAttribute('style');
  });
}
