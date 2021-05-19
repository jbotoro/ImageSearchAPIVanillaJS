
import config from "./config.js";


const ACCESS_KEY = config.accessKey;
const searchForm = document.getElementById("search-form");
searchForm.addEventListener('submit', handleSubmit);

const nextPage = document.getElementById("next-button")
const prevPage = document.getElementById("prev-button")
let currentPage = 1;
let userQuery;


// handle search, send query to api endpoint

function handleSubmit(e) {
    console.log('handling search...')
    e.preventDefault();
    userQuery = document.getElementById("search").value;
    // console.log(input);
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

//event listener for modal open/close

document.addEventListener('click', (e) => {
    if (!e.target.matches('.result-list-wrapper')) return;
    e.preventDefault();
    console.log(e.target)
}, false)

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

    const endpoint = `https://api.unsplash.com/search/photos?query=${userQuery}&per_page=10&page=${currentPage}&client_id=${ACCESS_KEY}`;
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
        console.log(results);
        pagination(results.total_pages);
        // function  to display results  displayFunction(results);
        createResultsList(results);
    } catch(err){
        console.log(err);
        alert('Search Failed');
    }
    
}


function createResultsList(resJSON) {
    const searchResults = document.querySelector(".search-results");
    searchResults.textContent= '';
    console.log(searchResults);
    resJSON.results.forEach(res => {
        let url = res.urls.small;
        let link = res.links.html;
        // let photographer = res.user.name;
        // let photographerLink = res.user.links.html;
        // let resLI = createListItem(res);
        searchResults.insertAdjacentHTML(
            "beforeend",
            `<div>
                <a href=${url} target="_blank" class="result-list-wrapper">
                    <div 
                        class="result-list-item" 
                        style="background-image : url(${url});"
                    >

                    </div>
                </a>
            </div>`
        )
    })
}