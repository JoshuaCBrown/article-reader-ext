//***TO DO*** add '.' for line breaks, have handler that deals with ' . . .' and '....' etc. 
//***TD*** make acronym finder that finds all acronyms in text by all letters in a word being capitalized 
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
    'CPT.',
    'DEPT.',
    'DPT.',
    'DEP.',
    'MT.',
    'CIR.'
];

let timeIdentifiers = [
    'Monday',
    'Mon',
    'Tuesday',
    'Tues',
    'Tue',
    'Wednesday',
    'Wed',
    'Thursday',
    'Thurs',
    'Thrs',
    'Thr',
    'Friday',
    'Fri',
    'Saturday',
    'Sat',
    'Sunday',
    'Sun',
    'January',
    'Jan',
    'February',
    'Feb',
    'March',
    'Mar',
    'April',
    'Apr',
    'May',
    'June',
    'Jun',
    'July',
    'Jul',
    'August',
    'Aug',
    'September',
    'Sep',
    'October',
    'Oct',
    'November',
    'Nov',
    'December',
    'Dec',
    '2020',
    '2021',
    '2022',
    '2023',
    '2024',
    '2025',
    '2026',
    '2027',
    '2028',
    '2029',
    '2030',
];

//button style function
function btnStyler (clickedBtn) {
    const btnArr = btnMainContainer.querySelectorAll('button');
    btnArr.forEach((indyBtn) => {
        indyBtn.classList.remove('pressed');
    })
    clickedBtn.className = 'pressed';
}

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
    let quoter = /["“].+?[\S]["”]/gm;
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

//remove '.' in common abbreviations that could create sentence fragments and impede functionality 
function removeAbbreviations(str) {
    const dirtyArr = str.split(' ');
    let regExVal = /^([a-z]\.)+$/i
    let cleanArr = [];
    for (let i = 0; i < dirtyArr.length; ++i) {
        if (abbreviationsArr.includes(dirtyArr[i].toUpperCase()) || regExVal.test(dirtyArr[i])) {
            let cleanAbbreviation = dirtyArr[i].replace(/\.+/g, '');
            cleanArr.push(cleanAbbreviation);
        } else {
            cleanArr.push(dirtyArr[i]);
        };
    };
    let cleanStr = cleanArr.join(' ');
    console.log(cleanStr);
    removeCharBreakers(cleanStr)
};

//remove characters that potentially impede functionality
function removeCharBreakers (str) {
    let cleanStr = str.replace(/[/;()“"”]+/g, '');
    makeSentenceArr(cleanStr);
};


function makeSentenceArr(str) {
    sentenceArr = str.split('. ');
    makeWordArr(sentenceArr);
};

function makeWordArr(arr) {
    for (let i = 0; i < arr.length; ++i) {
        let oneSentenceArr = arr[i].split(' ');
        wordsInSentencesArr.push(oneSentenceArr);
    };
    ofTimeFinder(wordsInSentencesArr);
};

// ***TO DO *** 
// function idiomTimeFinder (myArr) {
//     //'this year' 'next year' 'last week' 'TIMEID' 'this upcoming May'
// }

function ofTimeFinder (myArr) {
    let ofArr = [];
    for (let j = 0; j < myArr.length; ++j) {
        ofArr[j] = [];
        for (let i = 0; i < myArr[j].length; ++i) {
            let currentWord = myArr[j][i].replace(/,/g, '');
            let character = currentWord.charAt(0);
            if (isNumber(character)) {
                while (myArr[j][i+1] === 'of' && (myArr[j][i + 2] != undefined && timeIdentifiers.includes(myArr[j][i + 2]))) {
                    let nextWord = myArr[j][i+1];
                    let wordAfterNext = myArr[j][i+2];
                    currentWord += ' ' + nextWord + ' ' + wordAfterNext;
                    myArr[j].splice((i+1), 2);
                    console.log(currentWord);
                };
            } else if (isAlpha(character) && timeIdentifiers.includes(currentWord)) {
                while (myArr[j][i+1] === 'of' && (myArr[j][i + 2] != undefined && isNumber(myArr[j][i + 2]))) {
                    let nextWord = myArr[j][i+1];
                    let wordAfterNext = myArr[j][i+2];
                    currentWord += ' ' + nextWord + ' ' + wordAfterNext;
                    myArr[j].splice((i+1), 2);
                    console.log(currentWord);
                };
            }
            ofArr[j][i] = currentWord;
        };
    };
    capFinder(ofArr);
};

function capFinder (myArr) {
    for (let j = 0; j < myArr.length; ++j) {
        capArr[j] = [];
        for (let i = 0; i < myArr[j].length; ++i) {
            let currentWord = myArr[j][i].replace(/,/g, '');
            let character = currentWord.charAt(0);
            let nextWord;
            let nextChar;
        //if the first character of the word is a number 
        //OR 
        //if the first character is uppercase letter
            if (isNumber(character) || isAlpha(character)) {
        //WHILE
        //  there is another word in the sentence (the next entry is NOT undefined)
        //  AND 
        //      the first character of the next word is a number 
        //      OR 
        //      the first character of the next word is an uppercase letter
                while (myArr[j][i+1] != undefined && (isNumber(myArr[j][i+1].charAt(0)) || isAlpha(myArr[j][i+1].charAt(0)))) {
                    nextWord = myArr[j][i+1].replace(/,/g, '');
            //Add nextWord to the currentWord index with a space between
            //and remove the index of nextWord
            //e.g. 
            //currentWord = 'Example' in ['Example', 'Case', 'lowercase']
            //currentWord = 'Example Case' in ['Example Case', 'lowercase']
                    currentWord += ' ' + nextWord;
                    myArr[j].splice((i+1), 1);
            //testing with console log
                    console.log(currentWord);
                };
            //end of WHILE statement
            //IF 
            //  currentWord is not included in array of wordsToExclude 
            //  AND
            //  currentWord is not a number (to avoid returning arbitrary numbers as buttons)
            //  add currentWord to capArray
                if (!isNumber(currentWord)) {
                    capArr[j].push(currentWord);
                };
            };
        };
    };
    //test in console
    console.log(capArr);
    //pass capArray to makeBtns function
    // makeBtns(capArray);
};

function isNumber(str) {
    console.log(/^\d+$/.test(str));
    return /^\d+$/.test(str);
};

//tests that first character is uppercase letter
function isAlpha (ch) {
    return /^[A-Z]$/.test(ch);
};
// function getHTMLFromArticle(arr) {
//     articleHTML = arr[0].innerHTML;
//     for (let i = 1; i < arr.length; ++i) {
//         articleHTML += arr[i].innerHTML;
//     };
// };


//global variables
let articleText;
let articleHTML;
let sentenceArr = [];
let wordsInSentencesArr = [];
let capArr = [];

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
goodBtn.id = 'good-btn';

const timeSpaceBtn = document.createElement('button');
timeSpaceBtn.textContent = 'Space/Time';
timeSpaceBtn.id = 'time-space-btn';

const budgetBtn = document.createElement('button');
budgetBtn.textContent = 'Budget';
budgetBtn.id = 'budget-btn';

const quoteBtn = document.createElement('button');
quoteBtn.textContent = 'Quotes';
quoteBtn.id = 'quote-btn';

const overflowBtn = document.createElement('button');
overflowBtn.textContent = 'Overflow';
overflowBtn.id = 'overflow-btn';

const customBtn = document.createElement('button');
customBtn.textContent = 'Custom';
customBtn.id = 'custom-btn';
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

btnMainContainer.addEventListener('click', (e) => {
    if (e.target.type === 'submit') {
        btnStyler(e.target)
    };
    console.log(e.target.className);
});

