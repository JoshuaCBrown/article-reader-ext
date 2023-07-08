//***TO DO*** add '.' for line breaks, have handler that deals with ' . . .' and '....' etc. 
//  and for lists
//***TD*** make acronym finder that finds all acronyms in text by all letters in a word being capitalized 
// *** TD maybe?*** automatically add of to currentWord if it is the word that follows and analyze per normal. 
//  then if 'of' is the last word in a given entry (e.g. "Ken Abramson of") remove it 
// *** TO DO *** Contact info selector - emails and phone numbers 
// space identifiers I-# or SR-# or SH-#
// & - treat it like 'of' identifier?
// replace '/' with whitespace
// comma handler
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

let sigIdentifiers = [
    'Construction',
    'Development',
    'Developers',
    'Builders',
    'Inc',
    'Incorporated',
    'LLC',
    'Contractors',
    'Constructors',
    'Group',
    'Partners',
    'Capital',
    'Co',
    'Company',
    'Developer',
    'Department',
    'Transportation',
    'Dep',
    'Property',
    'Properties',
    'Homes',
    'Investment',
    'Investors',
    'Contracting',
    'Corp',
    'Corporation',
];

let spaceIdentifiers = [
    'Road',
    'Parkway',
    'Interstate',
    'Street',
    'St',
    'Highway',
    'HWY',
    'SR',
    'State',
    'Route',
    'Road',
    'Rd',
    'Lane',
    'Ln',
    'Circle',
    'Cir',
    'S',
    'N',
    'W',
    'E',
    'NW',
    'NE',
    'SW',
    'SE',
    'South',
    'North',
    'East',
    'West',
    'Northwest',
    'Northeast',
    'Southwest',
    'Southeast',
    'Rd',
    'Drive',
    'Dr',
    'Pkwy',
    'Alabama',
    'AL',
    'Alaska',
    'AK',
    'Arizona',
    'AZ',
    'Arkansas',
    'AR',
    'California',
    'CA',
    'Colorado',
    'CO',
    'Connecticut',
    'CT',
    'Delaware',
    'DE',
    'Florida',
    'FL',
    'Georgia',
    'GA',
    'Hawaii',
    'HI',
    'Idaho',
    'ID',
    'Illinois',
    'IL',
    'Indiana',
    'IN',
    'Iowa',
    'IA',
    'Kansas',
    'KS',
    'Kentucky',
    'KT',
    'Louisiana',
    'LA',
    'Maine',
    'MN',
    'Maryland',
    'MD',
    'Massachussetts',
    'MT',
    'Michigian',
    'MI',
    'Minnesota',
    'MN',
    'Mississippi',
    'MS',
    'Missouri',
    'MO',
    'Montana',
    'MT',
    'Nebraska',
    'NB',
    'Nevada',
    'NV',
    'New',
    'Hampshire',
    'NH',
    'Jersey',
    'NJ',
    'Mexico',
    'NM',
    'York',
    'NY',
    'Carolina',
    'NC',
    'Dakota',
    'ND',
    'Ohio',
    'OH',
    'Oklahoma',
    'OK',
    'Oregon',
    'OR',
    'Pennsylvania',
    'PA',
    'Rhode',
    'Island',
    'RI',
    'SC',
    'SD',
    'Tennessee',
    'TN',
    'Texas',
    'TX',
    'Utah',
    'UT',
    'Vermont',
    'VT',
    'Virginia',
    'VA',
    'Washington',
    'WA',
    'WV',
    'Wisconsin',
    'WI',
    'Wyoming',
    'WY',
    'Canada',
    'America',
    'United States',
    'US',
    'USA',
    'Chicago',
    'CHI',
    'Boston',
    'Atlanta',
    'ATL',
    'BOS',
    'Los',
    'Angeles',
    'Santa',
    'City',
    'Park',
    'Airport',
    'County',
    'Yard',
    'Place',
    'Downtown'
]

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

let wordsToExclude = [
    'The',
    'It',
    'However',
    'While',
    'On',
    'These',
    'That',
    'Although',
    'This',
    'It\'s',
    'Those',
    'Without',
    'Overall',
    'When',
    'Where',
    'What',
    'Who',
    'If',
    'Whenever',
    'Whoever',
    'Wherever',
    'Therefore',
    'There',
    'In',
];

let moneyIdentifier = [
    'million',
    'thousand',
    'billion',
    'trillion',
    'm',
    'b',
    't',
    'mil',
    'bil',
    'hundred',
    'mm',
    'bb',
    'tt',
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
    createQuoteBtns(quotes);
};

function createQuoteBtns (myArr) {
    for (let i = 0; i < myArr.length; ++i) {
        const newBtn = document.createElement('button');
        newBtn.textContent = btnText(myArr[i]);
    //give button id of 'sentence index' + 'v' + 'word index'
        newBtn.id = 'q-' + i;
    //pass given word index to btnClass to determine class
        newBtn.className = btnClass(myArr[i]);
    //add class of 'all-btn' to every button
        newBtn.classList.add('all-str-btn');
    };
    // showBtns();
};

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
    let cleanStr = str.replace(/[/;()“"”,]+/g, '');
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

// finds idiomatic phrases to convey dates with connector 'of' 
// e.g. 12th of June, May of 2025
function ofTimeFinder (myArr) {
    console.log(myArr);
    let ofArr = [];
    for (let j = 0; j < myArr.length; ++j) {
        ofArr[j] = [];
        for (let i = 0; i < myArr[j].length; ++i) {
            let currentWord = myArr[j][i].replace(/,/g, '');
            let character = currentWord.charAt(0);
            if (isNumber(character)) {
                while (myArr[j][i+1] === 'of' && (myArr[j][i + 2] != undefined && timeIdentifiers.includes(myArr[j][i + 2]))) {
                    let nextWord = myArr[j][i+1].replace(/,/, '');
                    let wordAfterNext = myArr[j][i+2].replace(/,/, '');
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
    moneyFinder(ofArr);
};

function moneyFinder(myArr) {
    let cashArr = [];
    for (let j = 0; j < myArr.length; ++j) {
        cashArr[j] = [];
        for (let i = 0; i < myArr[j].length; ++i) {
            let currentWord = myArr[j][i];
            if (isDollarAmount(currentWord) && (cashArr[j][i + 1] != undefined && moneyIdentifiers.includes(cashArr[j][i + 1].toLowerCase()))) {
                currentWord += ' ' + myArr[j][i + 1];
                myArr[j].splice((i + 1), 1);
            };
            cashArr[j][i] = currentWord;
        };
    };
    console.log(cashArr);
    capFinder(cashArr);
};



function capFinder (myArr) {
    for (let j = 0; j < myArr.length; ++j) {
        capArr[j] = [];
        for (let i = 0; i < myArr[j].length; ++i) {
            let currentWord = myArr[j][i].replace(/,/g, '');
            let character = currentWord.charAt(0);
            let nextWord;
            let moneyRegEx = /^[$€£¥]$/;
        //if the first character of the word is a number 
        //OR 
        //if the first character is uppercase letter
            if (isNumber(character) || (isAlpha(character) || moneyRegEx.test(character))) {
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
                if (timeIdentifiers.includes(currentWord) || (!theRemover(currentWord) && !isNumber(currentWord))) {
                    capArr[j].push(currentWord);
                };
            };
        };
        
    };
    //test in console
    createBtns(capArr);
    console.log(capArr);
    //pass capArray to makeBtns function
    // makeBtns(capArray);
};

function isNumber(str) {
    console.log(/^\d+[%]?$/.test(str));
    return /^\d+[.]?([\d]+)?[%]?$/.test(str);
};

//tests that first character is uppercase letter
function isAlpha (ch) {
    return /^[A-Z]$/.test(ch);
};

function isDollarAmount(str) {
    let cashRegEx = /^[$€£¥]\d+[.]?(\d+)?([mbtrilon]+)?$/i;
    return cashRegEx.test(str);
};

function theRemover (myWord) {
    return wordsToExclude.includes(myWord);
};

// function getHTMLFromArticle(arr) {
//     articleHTML = arr[0].innerHTML;
//     for (let i = 1; i < arr.length; ++i) {
//         articleHTML += arr[i].innerHTML;
//     };
// };

function createBtns (myArr) {
    for (let j = 0; j < myArr.length; ++j) {
        for (let i = 0; i < myArr[j].length; ++i) {
            const newBtn = document.createElement('button');
            newBtn.textContent = btnText(myArr[j][i]);
        //give button id of 'sentence index' + 'v' + 'word index'
            newBtn.id = j + '-' + i;
        //pass given word index to btnClass to determine class
            newBtn.className = btnClass(myArr[j][i]);
        //add class of 'all-btn' to every button
            newBtn.classList.add('all-str-btn');
            newBtn.style.display = 'none';
            filterDisplay.appendChild(newBtn); 
        };
    };
    // showBtns();
};

function btnClass(str) {
    if (/[“"”]/.test(str.charAt(0))) {
        return 'quote-str-btn';
    };
    if (/^[$€£¥]$/.test(str.charAt(0))) {
        return 'budget-str-btn';
    };
    if (timeIdentifiers.includes(str)) {
        return 'spacetime-str-btn';
    };
    if (!str.includes(' ')) {
        return 'overflow-str-btn';
    };
    let wordSplit = str.split(' ');
    for (let l = 0; l < wordSplit.length; ++l) {
        console.log(wordSplit[l]);
        if (sigIdentifiers.includes(wordSplit[l]) === true) {
            console.log(wordSplit[l]);
            return 'sig-str-btn';
        };
    };
    for (let h = 0; h < wordSplit.length; ++h) {
        console.log(wordSplit[h]);
        if (timeIdentifiers.includes(wordSplit[h]) || (spaceIdentifiers.includes(wordSplit[h]) || isNumber(wordSplit[h]))) {
            return 'spacetime-str-btn';
        }; 
    };
    return 'good-str-btn';
};

function btnText (str) {
    if (str.length > 19) {
        newStr = str.slice(0, 17) + '...';
        return newStr;
    } else {
        return str;
    };
};

function organizeResults(myBtn) {
    removeShownBtns();
    console.log('heyo');
    controlPanelArr = [
        goodBtn,
        spacetimeBtn,
        budgetBtn,
        quoteBtn,
        overflowBtn
    ];
    const sigStrBtns = document.querySelectorAll('.sig-str-btn');
    const goodStrBtns = document.querySelectorAll('.good-str-btn');
    const spacetimeStrBtns = document.querySelectorAll('.spacetime-str-btn');
    const budgetStrBtns = document.querySelectorAll('.budget-str-btn');
    const quoteStrBtns = document.querySelectorAll('.quote-str-btn');
    const overflowStrBtns = document.querySelectorAll('.overflow-str-btn');

    const liveSigBtnsArray = Array.from(sigStrBtns);
    const liveGoodBtnsArr = Array.from(goodStrBtns);
    const greatStrBtns = liveSigBtnsArray.concat(liveGoodBtnsArr);

    const allOfMyFilteredBtns = [
        greatStrBtns,
        spacetimeStrBtns,
        budgetStrBtns,
        quoteStrBtns,
        overflowStrBtns
    ];

    let index = controlPanelArr.indexOf(myBtn);

    console.log(allOfMyFilteredBtns);
    console.log(index);
    
    allOfMyFilteredBtns[index].forEach((strBtn) => {
        strBtn.style.display = null;
    }); 
};

function removeShownBtns() {
    const shownBtnsCurrently = filterDisplay.querySelectorAll('.all-str-btn');
    console.log(shownBtnsCurrently);
    console.log(shownBtnsCurrently.length);
    if (shownBtnsCurrently.length != 0) {
        shownBtnsCurrently.forEach((indyShownBtn) => {
            indyShownBtn.style.display = 'none';
        });
    };   
}

//global variables
let articleText;
let articleHTML;
let sentenceArr = [];
let wordsInSentencesArr = [];
let capArr = [];
let quoteArr = [];
let controlPanelArr = [];

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

const spacetimeBtn = document.createElement('button');
spacetimeBtn.textContent = 'Space/Time';
spacetimeBtn.id = 'space-time-btn';

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
btnContainerLeft.appendChild(spacetimeBtn);
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
        btnStyler(e.target);
        organizeResults(e.target);
    };
    console.log(e.target.className);
});

const article = document.querySelector('article');
if (article === null) {
    getAllThePs();
} else {
    getArticlePs();
};