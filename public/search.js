// Client-side search logic
let searchIndex = [];

async function loadSearchIndex() {
  if (searchIndex.length) return;
  try {
    const res = await fetch('/search-index.json');
    searchIndex = await res.json();
  } catch (e) {
    searchIndex = [];
  }
}

function filterResults(query) {
  query = query.trim().toLowerCase();
  if (!query) return [];
  return searchIndex.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query) ||
    (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)))
  );
}

function renderResults(results) {
  let container = document.getElementById('search-results');
  const form = document.getElementById('search-form');
  const input = document.getElementById('search-input');
  if (!container) {
    container = document.createElement('div');
    container.id = 'search-results';
    container.className = 'absolute left-0 w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50';
    // Position below the input
    container.style.position = 'absolute';
    container.style.top = `${input.offsetHeight + 8}px`;
    container.style.left = '0';
    form.appendChild(container);
  } else {
    // Always keep it below the input
    container.style.top = `${input.offsetHeight + 8}px`;
    container.style.left = '0';
  }
  if (!results.length) {
    container.innerHTML = '<div class="p-4 text-gray-500">No results found.</div>';
    return;
  }
  container.innerHTML = results.map(item => `
    <a href="${item.url}" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm rounded">${item.title}</a>
  `).join('');
}

window.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('search-input');
  if (!input) return;
  loadSearchIndex();
  input.addEventListener('input', async (e) => {
    await loadSearchIndex();
    const results = filterResults(e.target.value);
    renderResults(results);
  });
  input.addEventListener('blur', () => {
    setTimeout(() => {
      const container = document.getElementById('search-results');
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    }, 200);
  });
});
