export default async function decorate(block) {
  const parent = block.parentElement.parentElement;
  const checkStatus = () => {
    if (parent.getAttribute('data-section-status') === 'loaded') {
      parent.style.display = 'none';
    } else {
      setTimeout(checkStatus, 0);
    }
  };
  checkStatus();
  block.children[0].children[1].querySelector('strong')
    .addEventListener('click', () => {
      block.parentElement.parentElement.style.display = 'none';
    });
}
