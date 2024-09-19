export default async function decorate(block) {
  block.children[0].children[1].querySelector('strong')
    .addEventListener('click', () => {
      block.parentElement.parentElement.style.display = 'none';
    });
}
