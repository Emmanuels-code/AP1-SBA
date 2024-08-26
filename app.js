const form = document.querySelector('form');
const container = document.querySelector('.moviepic-container');

form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  const input = form.querySelector('input');
  const query = input.value.trim() || 'seal';

  try {
    const movies = await fetchMovies(query);
    renderMovies(movies);
  } catch (error) {
    console.error(error);
  }
}

async function fetchMovies(query) {
  const url = `https://api.tvmaze.com/search/shows?q=${query}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

function renderMovies(movies) {
  container.innerHTML = '';
  movies.forEach((movie) => {
    const img = document.createElement('img');
    img.src = movie.show.image.medium;
    container.appendChild(img);
  });
}