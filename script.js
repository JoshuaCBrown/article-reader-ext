//create side panel and widget to show/remove side panel
const sideBar = document.createElement('div');
sideBar.id = 'side-container';
document.body.appendChild(sideBar);

const myIcon = document.createElement('img');
let iconUrl = chrome.runtime.getURL('art-reader-icon.png');
myIcon.src = iconUrl;
myIcon.id = 'icon';

const myWidget = document.createElement('div');
myWidget.id = 'stickything';

myWidget.appendChild(myIcon);

myWidget.addEventListener('click', () => {
    if (sideBar.className != 'show-sidebar') {
        sideBar.className = 'show-sidebar';
        myWidget.className = 'show-sidebar';

    } else {
        sideBar.classList.remove('show-sidebar');
        myWidget.classList.remove('show-sidebar');
    };
});

document.body.appendChild(myWidget);

const pagePTags = document.querySelectorAll('p');
console.log(pagePTags);

const article = document.querySelector('article');
const articlePTags = article.querySelectorAll('p');
let articleText;
let articleHTML;
getTextFromArticle(articlePTags);
getHTMLFromArticle(articlePTags);

function getTextFromArticle (arr) {
    articleText = arr[0].textContent;
    for (let i = 1; i < arr.length; ++i) {
        articleText += ' ' + arr[i].textContent;
    };
};

function getHTMLFromArticle(arr) {
    articleHTML = arr[0].innerHTML;
    for (let i = 1; i < arr.length; ++i) {
        articleHTML += arr[i].innerHTML;
    };
};

console.log(articleText);
console.log(articleHTML);

sideBar.textContent = articleText;