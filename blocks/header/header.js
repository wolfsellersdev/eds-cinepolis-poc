import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

const getTarget = (root) => {
  let targetLink;
  [...root.querySelectorAll('a')].forEach((link) => {
    if (/\/programas$/.test(link.href)) {
      targetLink = link;
      targetLink.addEventListener('click', (e) => { e.preventDefault(); });
    }
  });
  targetLink.nextElementSibling.style.display = 'none';
  return { targetLink: targetLink.parentElement, ulTarget: targetLink.nextElementSibling };
};

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  const { targetLink, ulTarget } = getTarget(fragment);
  const closeBtn = document.createElement('button');
  closeBtn.innerText = 'X';
  ulTarget.appendChild(closeBtn);
  targetLink.addEventListener('mouseover', () => {
    ulTarget.style.display = 'flex';
  });

  window.addEventListener('click', (e) => {
    if (e.target !== ulTarget
      && e.target !== targetLink
      && e.target !== targetLink.querySelector('a')) {
      ulTarget.style.display = 'none';
    }
  });

  if (window.innerWidth <= 768) {
    fragment.children[0].addEventListener('click', () => {
      const parent1 = ulTarget.parentElement.parentElement.parentElement.parentElement;
      const parent2 = parent1.parentElement.children[3];
      parent1.style.display = 'flex';
      parent2.style.display = 'flex';
    });
  }

  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  block.append(nav);
}
