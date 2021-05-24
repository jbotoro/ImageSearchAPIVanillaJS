
import config from "./config.js";


const ACCESS_KEY = config.accessKey;
const searchForm = document.getElementById("search-form");
searchForm.addEventListener('submit', handleSubmit);

const nextPage = document.getElementById("next-button")
const prevPage = document.getElementById("prev-button")
let currentPage = 1;
let userQuery;
let currentImages


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

// document.addEventListener('click', (e) => {
//     if (!e.target.matches('.result-list-wrapper')) return;
//     e.preventDefault();
//     console.log(e.target)
// }, false)

// modal 

const modalBackground = document.getElementById('modal-background');
const modalContent = document.getElementById('modal-content');
const closeButton = document.getElementsByClassName('close-modal')[0];
const modalImage = document.getElementById('modal-image')

const modalElement = element => document.querySelector(`.modal-background ${element}`);
const body = document.querySelector('body');





// openModal function

function openModal(){
    modalBackground.style.display = "block";
}

//close modal function and close modal on body click event listener

function closeModal(){
    modalBackground.style.display = 'none';
}

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
        currentImages = document.querySelectorAll(".result-list-wrapper img")
        console.log(currentImages)
        if(currentImages){
            currentImages.forEach(img =>{
                img.addEventListener('click', e => {
                    console.log('image event listener fired')
                    console.log(modalBackground)
                    console.log(modalBackground.style.display)
                    e.stopPropagation();
                    modalBackground.style.display = 'block';
                    modalImage.src = img.src; 
                })
            })
            console.log(currentImages)
        }
    } catch(err){
        console.log(err);
        alert('Search Failed');
    }
    
}


function createResultsList(resJSON) {
    const searchResults = document.querySelector(".search-results");
    searchResults.textContent= '';
    // console.log(searchResults);
    // console.log(resJSON.results)
    resJSON.results.forEach(res => {
        let url = res.urls.small;
        // let id = res.id;
        // let link = res.links.html;
        // let photographer = res.user.name;
        // let photographerLink = res.user.links.html;
        // let resLI = createListItem(res);
        // searchResults.insertAdjacentHTML(
        //     "beforeend",
        //     `<div>
        //         <div class="result-list-wrapper" id="result-list-wrapper">
        //             <div 
        //                 class="result-list-item" 
        //                 style="background-image : url(${url});"
        //             >

        //             </div>
        //         </div>
        //     </div>`
        // )
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