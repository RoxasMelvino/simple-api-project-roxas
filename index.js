const quoteContainer = document.querySelector('.quote-container');
const quoteListContainer = document.querySelector('.quote-container__list');
const getQuoteBtn = document.getElementById('getQuoteBtn');
const getQuotesBtn = document.getElementById('getQuotesBtn');
const favoritesListBtn = document.querySelector('.fa-bookmark');
const favoriteList = [];


// get quotes data
let quotes;
fetch('http://localhost:3000/api/quotes')
.then(response => response.json())
.then(data =>  {
    quotes = data;
    getSingleQuote();
})
.catch(error => console.error('LMFAOOFOAA', error))

// functions --------
function getSingleQuote() {
    const randIdx = Math.floor(Math.random() * quotes.length) + 1
    const quote = document.getElementById('quote');
    const author = document.getElementById('author');

    quote.textContent = `"${quotes[randIdx].q}"`
    author.textContent = quotes[randIdx].a
}

function getListOfQuotes() {
    const quoteListContainerItem = document.querySelectorAll('.quote-container__list-item');

    // stops the items from multiplying
    if (quoteListContainerItem.length >= 9) {
        quoteListContainerItem.forEach(elem => elem.remove())
    }

    for (let i = 0; i < 9; i++) {
        createQuoteBox();
    }
}

function createQuoteBox() {
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const author = document.createElement('small');
    const favoriteIcon = document.createElement('i');
    const randIdx = Math.floor(Math.random() * quotes.length + 1)


    div.className = "quote-container__list-item";
    favoriteIcon.classList.add('fa-regular', 'fa-star', 'fa-lg');
    favoriteIcon.style.marginLeft = "auto";

    h3.textContent = quotes[randIdx].q;
    author.textContent = quotes[randIdx].a;
    
    div.appendChild(favoriteIcon)
    div.appendChild(h3);
    div.appendChild(author);

    quoteListContainer.appendChild(div);
}

function createFavoriteQuoteBox(favoriteListElem) {
    for (let i = 0; i < favoriteList.length; i++) {
        const div = document.createElement('div');
        const h4 = document.createElement('h4');
        const small = document.createElement('small');

        div.className = "quote-container__list-item"
        h4.textContent = favoriteList[i].q 
        small.textContent = favoriteList[i].a

        div.style.width = "250px"
        div.appendChild(h4);
        div.appendChild(small);
                
        favoriteListElem.appendChild(div);
    }
}

function favoriteQuote(quote, author) {
    // If the quote is already on the list, do not put it push it!
    for (let i = 0; i < favoriteList.length; i++) {
        if (quote.textContent === favoriteList[i].q) {
            return alert('Woops! This appears to be in your favorites list already.')
        }
    }

    favoriteList.push({q: quote.textContent, a: author.textContent})
}

function displayFavoriteQuotes() {
    const favoriteListElem = document.querySelector('.favorites-list')  
    const favoriteListItems = favoriteListElem.querySelectorAll('.quote-container__list-item')
    
    // favoriteListElem.classList.toggle('favorites-list--show')
    if (!favoriteListElem.classList.contains('favorites-list--show')) {
        favoriteListElem.classList.add('favorites-list--show')
        createFavoriteQuoteBox(favoriteListElem);
    } else {
        favoriteListElem.classList.remove('favorites-list--show');
        favoriteListItems.forEach(elem => elem.remove())
    }
}

// event listeners --------
getQuoteBtn.addEventListener('click', getSingleQuote)
getQuotesBtn.addEventListener('click', getListOfQuotes)
favoritesListBtn.addEventListener('click', displayFavoriteQuotes);
quoteListContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-star')) {
        console.log(e.target);
        e.target.className = 'fa-solid fa-star';
        const quote = e.target.parentElement.querySelector('h3');
        const author = e.target.parentElement.querySelector('small');
        favoriteQuote(quote, author);
    }
})

