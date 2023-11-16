const apiKey = "177b37d9c76344f79ab432c3c478f800";
const apiURL = "https://newsapi.org/v2/everything?q="

// onload data
window.addEventListener('load', () => getNews('India'));

async function getNews (city){
    const response = await fetch(`${apiURL}${city}&apikey=${apiKey}`);
    const data = await response.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(article){

    const cardContainer = document.querySelector('.cards_container');
    const cardTemplate = document.getElementById('card_template');

    cardContainer.innerHTML = "";

    article.forEach((article) => {
        if(!article.urlToImage)
        return;

        const cloneCard = cardTemplate.content.cloneNode(true);
        fillDataInCard(article, cloneCard);
        cardContainer.appendChild(cloneCard);
    });

}


function fillDataInCard(article, cloneCard){
    cloneCard.querySelector('.card_header_img').src = article.urlToImage;
    cloneCard.getElementById('news_title').innerHTML = article.title.split(' ').slice(0,10).join(" ");
    cloneCard.getElementById('news_desc').innerHTML = article.description.slice(0,40) + '...';

    let news_Source = cloneCard.getElementById('news_source');

    const date = new Date(article.publishedAt).toLocaleString();

    news_Source.innerHTML = `${article.source.name}, ${date}`;

    cloneCard.getElementById('news_btn').addEventListener('click', () => {
        window.open(article.url);
    })

}

// working of head links
let curSelectedNav = null;
function onNavItemClick(interestedNews){
    getNews(interestedNews);
    const navItem = document.getElementById(interestedNews);
    curSelectedNav?.classList.remove("active");   // agar purane wale navItem ki value null nahi hai to uski active class ko remove kr do and agar null hai to means aap first navItem pr hi click kr rahe ho
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}


// working of search data
const searchIcon = document.querySelector(".search_icon");
const searchBtn = document.querySelector(".search_btn");

searchBtn.addEventListener('click', () => {
    if(!searchIcon.value)
    return;

    getNews(searchIcon.value);
    searchIcon.value = '';
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
});

