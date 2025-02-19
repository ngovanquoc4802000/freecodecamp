const authorContainer = document.getElementById("author-container");
const loadMortBtn = document.getElementById("load-more-btn");

let start = 0;
let end = 8;
let result = [];

fetch("https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json")
  .then((res) => res.json())
  .then((data) => {
    result = data;
    displayAuthors(result.slice(start, end));
  });

const displayAuthors = (authors) => {
  authors.forEach(({ author, image, bio, url }, index) => {
    authorContainer.innerHTML += `
        <div id="${index}" class="user-card">
        <h2 class="author-name">${author}</h2>
        <img class="user-img" src="${image}" alt="${author}" />
        <div class="purple-divider"></div>
        <p class="bio">${bio.length > 50 ? bio.slice(0,50) + "..." : bio}</p>
        <a class="author-link" target="_blank" href="${url}">${author}'s author page</a>
        </div>
      `;
  });
};

const fetchMoreBtn = () => {
 start += 8;
 end +=8;
 displayAuthors(result.slice(start,end));
 if(result.length < end) {
 loadMortBtn.textContent = "No load more authors";
 loadMortBtn.disabled = true;
 loadMortBtn.style.cursor = "not-allowed" 
 }
}

loadMortBtn.addEventListener("click",fetchMoreBtn)