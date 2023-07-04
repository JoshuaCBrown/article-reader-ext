let abbreviationsArr = [
    'MR.',
    'DR.',
    'SR.',
    'JR.',
    'MRS.',
    'MS.',
    'U.S.',
    'U.S.A.',
    'BLVD.',
    'AVE.',
    'RD.',
    'CPT.'
]

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
    let quoter = /["“].+?["”]/gm;
    const quotes = str.match(quoter);
    console.log(quotes);
}

function removeLineBreaks(str) {
    const noLineBreaks = str.replace(/(?<=[a-z()"'“”?:]+)\.?\s?[()"'“”](\r|\n)/gi, '. ');
    ensureSingleSpacing(noLineBreaks);
};
//Take away all instances of double (or more) whitespace and replace with single whitespace
function ensureSingleSpacing(str) {
    const singleSpacing = str.replace(/\s+/g, ' ');
    console.log(singleSpacing);
    removeAbbreviations(singleSpacing);
};

function removeAbbreviations(str) {
    const dirtyArr = str.split(' ');
    let cleanArr = [];
    for (let i = 0; i < dirtyArr.length; ++i) {
        if (abbreviationsArr.includes(dirtyArr[i].toUpperCase())) {
            let cleanAbbreviation = dirtyArr[i].replace(/\.+/g, '');
            cleanArr.push(cleanAbbreviation);
        } else {
            cleanArr.push(dirtyArr[i]);
        };
    };
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


// sideBar.textContent = articleText;

// create icon image div and img
const headerDiv = document.createElement('div');
headerDiv.className = 'header-div';

const mainIcon = document.createElement('img');
let mainIconUrl = chrome.runtime.getURL('artreadericon.png');
mainIcon.src = mainIconUrl;
mainIcon.id = 'main-icon';

headerDiv.appendChild(mainIcon);
sideBar.appendChild(headerDiv);

// create selection buttons 

const btnMainContainer = document.createElement('div');
btnMainContainer.className = 'btn-main-container';

const btnContainerLeft = document.createElement('div');
btnContainerLeft.className = 'btn-container-left';
const btnContainerRight = document.createElement('div');
btnContainerRight.className = 'btn-container-right';

const goodBtn = document.createElement('button');
goodBtn.textContent = 'Good';
goodBtn.className = '.good-btn';

const timeSpaceBtn = document.createElement('button');
timeSpaceBtn.textContent = 'Space/Time';
timeSpaceBtn.className = '.time-space-btn';

const budgetBtn = document.createElement('button');
budgetBtn.textContent = 'Budget';
budgetBtn.className = '.budget-btn';

const quoteBtn = document.createElement('button');
quoteBtn.textContent = 'Quotes';
quoteBtn.className = '.quote-btn';

const overflowBtn = document.createElement('button');
overflowBtn.textContent = 'Overflow';
overflowBtn.className = '.overflow-btn';

const customBtn = document.createElement('button');
customBtn.textContent = 'Custom';
customBtn.className = '.custom-btn';
customBtn.disabled = true;

btnContainerLeft.appendChild(goodBtn);
btnContainerLeft.appendChild(timeSpaceBtn);
btnContainerLeft.appendChild(budgetBtn);
btnContainerRight.appendChild(quoteBtn);
btnContainerRight.appendChild(overflowBtn);
btnContainerRight.appendChild(customBtn);

btnMainContainer.appendChild(btnContainerLeft);
btnMainContainer.appendChild(btnContainerRight);

sideBar.appendChild(btnMainContainer);

//create filter display
const filterDisplay = document.createElement('div');
filterDisplay.className = 'filter-display';

sideBar.appendChild(filterDisplay);
