# PhotoWaiter
  
    
    
![alt text](https://github.com/jbotoro/markdown_images/blob/master/PhotoWaiterLanding.png)


## Overview


PhotoWaiter is a simple image search app that utilizes the Unsplash API to retrieve
and display images based on user search query. It was built using Vanilla JS, HTML, and CSS.


## Technologies 
 
  
  
#### Frontend
  * JavaScript
  * HTML5
  * CSS3
  
## Features
 
#### Users Search
   * Users can search the Unsplash API for images based on their search query
   
   
   ![searchUnsplash](https://github.com/jbotoro/markdown_images/blob/master/PhotoWaiterSearchGIF.gif)
   
   ``` javascript
    function handleSubmit(e) {
       
        e.preventDefault();
        userQuery = document.getElementById("search").value;
        fetchSearchResults(userQuery);
        
    }
   
   ```
   
   * Search query sent to api endpoint
  
   
   ``` javascript
    async function queryUnsplash(userQuery) {

        const endpoint = `https://api.unsplash.com/search/photos?query=${userQuery}&per_page=10&page=${currentPage}&client_id=${API_KEY}`;
        const res = await fetch(endpoint);
        if(!res.ok){
            throw Error(res.statusText)
        }
        const resJSON = await res.json();
        return resJSON
    }
   ```
   
   * Results used to create HTML element for each image
   
   ``` javascript
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
   ```
   
   
  
   
   
 
#### Results Paginated
   * 10 results are displayed per page, prev page and next page buttons allow user to browse through all results  
     
     
   ![paginatedResults](https://github.com/jbotoro/markdown_images/blob/master/PhotoWaiterNextPageGIF.gif)
   ``` javascript
        const nextPage = document.getElementById("next-button")
        const prevPage = document.getElementById("prev-button")
        let currentPage = 1;
   ```
   * Pagination event listeners update currentPage . 
   ``` javascript
    nextPage.addEventListener('click', () => {
        currentPage += 1;
        fetchSearchResults(userQuery)
    })

    prevPage.addEventListener('click', () => {
        currentPage -= 1;
        fetchSearchResults(userQuery);
    })
   ```

   ``` javascript
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
   ```
   
 
   


