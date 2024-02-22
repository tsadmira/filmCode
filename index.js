const elements = {
    container: document.querySelector('.js-movie'),
    loadBtn : document.querySelector('.js-add-movie'),
}
let page = 1;
elements.loadBtn.addEventListener('click', handler);

function handler() { 
    page += 1;
    serviceFilm(page)
        .then(data => {
            elements.container.insertAdjacentHTML('beforeend', createMarkup(data.results));
            if (data.page >= data.total_pages) {
                elements.loadBtn.classList.replace('btn-load', 'btn-load-hidden')
            }
        })
        .catch(err => { elements.loadBtn.classList.replace('btn-load', 'btn-load-hidden') });;
}
function createMarkup(arr) { 
    console.log(arr);
    const markup = arr.map(item => {
        return `<div class="movie-item">
                    <img class="img-movie" src="${item.poster_path ? 'https://image.tmdb.org/t/p/w500/' + item.poster_path : 'https://www.reelviews.net/resources/img/default_poster.jpg'}/> 
                    alt="${item.title || 'Title not found'}">
                    <h3>${item.title || 'Title not found'}</h3>
                    <p>Release Date: ${item.release_date || 'XXXX.XX.XX'}</p>
                    <p>Vote Average: ${item.vote_average || 'XX.XX'}</p>
                </div>`
    }).join('');
    return markup;
}
function serviceFilm(currentPage = '1') {
    const params = new URLSearchParams({
        page: currentPage,
        api_key: 'a60d3b1782ef083c04070e65848b0cda',
    })
    return fetch(`https://api.themoviedb.org/3/trending/movie/week?${params}`)
        .then(resp => {
            if (!resp.ok) { 
                throw new Error("error");
            }
            return resp.json();
        } )
}
serviceFilm()
    .then(data => {
        console.log(data);
            elements.container.insertAdjacentHTML('beforeend', createMarkup(data.results));

        if (data.page < data.total_pages) {
            elements.loadBtn.classList.replace('btn-load-hidden' , 'btn-load')
        }
    })
    .catch(err => { elements.loadBtn.classList.replace('btn-load', 'btn-load-hidden') });

