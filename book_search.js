/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {

    var result = {
        "SearchTerm": "",
        "Results": []
    };

    result.SearchTerm = searchTerm;

    //Split content into words.
    words = []     //Words is a 3d array.  The rows are books, columns are the lines in the book, and depth is the content of each line.
    for(var book in scannedTextObj) {
        content = []
        for (var line in scannedTextObj[book].Content) {
            content.push(scannedTextObj[book].Content[line].Text.split(" "));
        }
        words.push(content);
    }

    //Combine hyphenated words
    for(book in words){ 
        for(line = 0; line < words[book].length; line++) {
            lastWord = words[book][line].length - 1;
            lastLetter = words[book][line][lastWord].length - 1;
            if(words[book][line][lastWord][lastLetter] === '-' && line != words[book].length) {
                words[book][line][lastWord] = words[book][line][lastWord] + words[book][line + 1][0];
                words[book][line + 1][0] = words[book][line][lastWord];
            }
        }
    }

    //Remove punctuation
    var regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    for(book in words) {
        for(line in words[book]) {
            for(word in words[book][line]) {
                words[book][line][word] = words[book][line][word].replace(regex, '');
            }
        }
    }

    //Search for words
    for(book in words) {
        for(line in words[book]) {
            for(word in words[book][line]) {
                if(words[book][line][word] === searchTerm) {
                    res = {
                        "ISBN": scannedTextObj[book].ISBN,
                        "Page": scannedTextObj[book].Content[line].Page,
                        "Line": scannedTextObj[book].Content[line].Line,
                    };
                    result.Results.push(res)
                }
            }
        }
    }

    return result;
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    },
    {
        "Title": "Ender's Shadow",
        "ISBN": "0812575717",
        "Content": [
            {
                "Page": 1,
                "Line": 1,
                "Text": "You think you've found somebody, so suddenly my pro-"
            },
            {
                "Page": 1,
                "Line": 2,
                "Text": "gram gets the ax?"
            },
            {
                "Page": 1,
                "Line": 3,
                "Text": "It's not about this kid that Graff found.  It's about the"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "0812575717",
            "Page": 1,
            "Line": 2
        },
        {
            "ISBN": "0812575717",
            "Page": 1,
            "Line": 3
        }
    ]
}

const twentyLeaguesOutHyphen = {
    "SearchTerm": "darkness",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        },
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const twentyLeaguesOutNegative = {
    "SearchTerm": "guitar",
    "Results": []
}

const twentyLeaguesOutCase = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

test2result = findSearchTermInBooks("darkness", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOutHyphen) === JSON.stringify(test2result)) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOutHyphen);
    console.log("Received:", test2result);
}

test3result = findSearchTermInBooks("guitar", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOutNegative) === JSON.stringify(test3result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", twentyLeaguesOutNegative);
    console.log("Received:", test3result);
}

test4result = findSearchTermInBooks("The", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOutCase) === JSON.stringify(test4result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", twentyLeaguesOutCase);
    console.log("Received:", test3result);
}