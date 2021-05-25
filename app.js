require('dotenv').config();




const API_KEY = process.env.ACCESS_KEY
console.log(API_KEY);
const searchForm = document.getElementById("search-form");
searchForm.addEventListener('submit', handleSubmit);

const nextPage = document.getElementById("next-button")
const prevPage = document.getElementById("prev-button")
let currentPage = 1;
let userQuery;
let currentImages


// handle search, send query to api endpoint

function handleSubmit(e) {
    // console.log('handling search...')
    e.preventDefault();
    userQuery = document.getElementById("search").value;
    fetchSearchResults(userQuery);
    
}

// event listeners for prev and next page buttons

nextPage.addEventListener('click', () => {
    currentPage += 1;
    fetchSearchResults(userQuery)
})

prevPage.addEventListener('click', () => {
    currentPage -= 1;
    fetchSearchResults(userQuery);
})


// modal components

const modalBackground = document.getElementById('modal-background');
const modalImage = document.getElementById('modal-image')
const body = document.querySelector('body');

// close modal event listener

body.addEventListener("click", () => {
    body.style.overflow = 'auto';
    modalBackground.style.display = 'none';
})






//pagination function

function pagination(numPages) {
    nextPage.classList.remove('hidden');
    if (currentPage >= numPages){
        nextPage.classList.add('hidden')
    }

    prevPage.classList.add('hidden');
    if (currentPage <= numPages){
        prevPage.classList.remove('hidden')
    }
}




async function queryUnsplash(userQuery) {

    const endpoint = `https://api.unsplash.com/search/photos?query=${userQuery}&per_page=10&page=${currentPage}&client_id=${API_KEY}`;
    const res = await fetch(endpoint);
    if(!res.ok){
        throw Error(res.statusText)
    }
    const resJSON = await res.json();
    return resJSON
}

async function fetchSearchResults(userQuery) {
    try {
        const results = await queryUnsplash(userQuery);
        pagination(results.total_pages);
        createResultsList(results);
        currentImages = document.querySelectorAll(".result-list-wrapper img")
        if(currentImages){
            currentImages.forEach(img =>{
                img.addEventListener('click', e => {
                    e.stopPropagation();
                    modalBackground.style.display = 'block';
                    modalImage.src = img.src; 
                })
            })
        }
    } catch(err){
        alert('Search Failed');
    }
    
}


function createResultsList(resJSON) {
    const searchResults = document.querySelector(".search-results");
    searchResults.textContent= '';
    resJSON.results.forEach(res => {
        let url = res.urls.small;
        searchResults.insertAdjacentHTML(
            "beforeend",
            `<div>
                <div class="result-list-wrapper" id="result-list-wrapper">
                    <img 
                        class="result-list-item" 
                        src="${url}"
                    >
                </div>
            </div>`
        )
    })
}