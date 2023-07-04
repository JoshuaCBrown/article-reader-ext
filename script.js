

//for all the Ps - possibly needs some more work to clean Ps if not in article text
function getAllThePs() {
    const pagePTags = document.querySelectorAll('p');
    processRawText(pagePTags)
};

//for p tags found within <article> tag
function getArticlePs() {
    const articlePTags = article.querySelectorAll('p');
    processRawText(articlePTags);
}
//may need some cleaning but this function may be useless
function processRawText(arr) {
    console.log(arr);
    getTextFromArticle(arr);
};

function getTextFromArticle (arr) {
    articleText = arr[0].textContent;
    for (let i = 1; i < arr.length; ++i) {
        articleText += ' ' + arr[i].textContent;
    };
    //***TO DO*** create identifyQuotes function
    identifyQuotes(articleText);
    removeLineBreaks(articleText);
    console.log(articleText);  
};


function identifyQuotes (str) {
    let quoter = /["“].+?[^\s\n\r]["”]/gm;
    const quotes = str.match(quoter);
    console.log(quotes);
}

function removeLineBreaks(arr) {
    const noLineBreaks = arr.replace(/(?<=[a-z()"'“”?:]+)\.?\s?[()"'“”](\r|\n)/gi, '. ');
    ensureSingleSpacing(noLineBreaks);
};

function ensureSingleSpacing(arr) {
    const singleSpacing = arr.replace(/\s+/g, ' ');
    console.log(singleSpacing);
};

function getHTMLFromArticle(arr) {
    articleHTML = arr[0].innerHTML;
    for (let i = 1; i < arr.length; ++i) {
        articleHTML += arr[i].innerHTML;
    };
};

let articleText;
let articleHTML;

//create side panel and widget to show/remove side panel
const sideBar = document.createElement('div');
sideBar.id = 'side-container';
document.body.appendChild(sideBar);

const myIcon = document.createElement('img');
let iconUrl = chrome.runtime.getURL('artreadericon.png');
myIcon.src = iconUrl;
myIcon.id = 'icon';

const myWidget = document.createElement('div');
myWidget.id = 'stickything';

myWidget.appendChild(myIcon);

//event listener on tab click to show side panel
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

//select article tags, then p tags within article
const article = document.querySelector('article');

if (article === null) {
    getAllThePs();
} else {
    getArticlePs();
};

console.log(articleText);


sideBar.textContent = articleText;