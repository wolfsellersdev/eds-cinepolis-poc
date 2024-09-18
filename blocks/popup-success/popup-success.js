export default async function decorate(block) {
  const button = block.querySelector('a');
  button.addEventListener('click', () => {
    const popup = document.querySelector('[class="section form-container popup-success-container"]');
    popup.removeAttribute('style');
  });
}
