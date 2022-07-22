/**
 * Function that generates an array of letters ranging from charA to charZ. The passed in values don't necessarily need to be 'a' and 'z' but for this activity they should always be the default values.
 * @param charA, beginning of the range to generate the alphabetical array
 * @param charZ, end of the range for alphabetical array generated
 */

const generateAlphabetArray = (charA = 'a', charZ = 'z') => {
    let array = [], j = charZ.charCodeAt(0);
    for (let i = charA.charCodeAt(0); i <= j; ++i) {
        array.push(String.fromCharCode(i));
    }
    return array;
}


const searchForAlphabeticalIndex = ([stringToFindIndexForFirstLetter], alphabetArray = generateAlphabetArray()) => {
    // The binarySearchResults and linearSearchResults variables are incremented every time you iterate the binary and linear searches. As an iteration comes with the cost of computational time,
    // the one with lower iterations and therefore lower number has better performance.
    let binarySearchResults = 0;
    let binarySearchCharacterIndex = -1;
    let linearSearchResults = 0;
    let linearSearchCharacterIndex = -1;

    // first make sure stringToFindIndexForFirstLetter var is lowercase as your array generated above does not contain capital letters
    stringToFindIndexForFirstLetter = stringToFindIndexForFirstLetter.toLowerCase();


    // here is linear search implementation
    for (let i = 0; i < alphabetArray.length; i++) {
        // iterates the result to show how many iterations and therefore how efficient this search is
        linearSearchResults++;
        if (alphabetArray[i] === stringToFindIndexForFirstLetter) {
            linearSearchCharacterIndex = i;
            break; // keyword to jump out of a loop
        }
        // if you get through to the last iteration of the loop without breaking, set result to -1 for not found
        if (i === alphabetArray.length - 1) {
            linearSearchResults = -1;
        }
    }

    // here is the recursive binary search implementation
    let recursiveBinarySearch = (array, letter, startIndex, endIndex) => {
        binarySearchResults++; // this keeps track of how many iterations of Binary Search you have done, no need to change this code

        console.log(startIndex, endIndex);
        // establish base case for not finding the letter in the given array
        if (startIndex > endIndex) {
          binarySearchResults = -1;
          return false;
        }

        let midIndex = Math.floor((startIndex + endIndex) / 2);

        //check if the value at midIndex is equal to the character being searched for, return true if so
        if (array[midIndex] === letter) {
          binarySearchCharacterIndex = midIndex; 
          return true;
        }

        if(letter < array[midIndex]) {
          return recursiveBinarySearch(array, letter, startIndex, midIndex - 1);
        } else {
          return recursiveBinarySearch(array, letter, midIndex + 1, endIndex);
        }

        // note that just like 2 < 4 will evaluate to true, 'a' < 'b' will also evaluate true, javascript can compare letters just like numbers by their position in the alphabet
    }

    // Invokes the recursiveBinarySearch you just defined
    if (recursiveBinarySearch(alphabetArray, stringToFindIndexForFirstLetter, 0, alphabetArray.length - 1)) {
        console.log('Letter: ', stringToFindIndexForFirstLetter, ' found after ', binarySearchResults, ' iterations.')
    } else {
        console.log('Letter: ', stringToFindIndexForFirstLetter, ' not found within array: ', alphabetArray);
    }


    // add the necessary inputs and results to the DOM
    const numberToSearchForElm = document.getElementById('number-searching-for-id') || {};
    numberToSearchForElm.innerText += stringToFindIndexForFirstLetter;

    const arrayOfNumbersToSearchInsideElm = document.getElementById('searched-array-id') || {};
    arrayOfNumbersToSearchInsideElm.innerText += alphabetArray;

    const linearSearchResultsElm = document.getElementById('linear-search-results') || {};
    linearSearchResultsElm.innerText += linearSearchResults;

    const linearSearchPositionElm = document.getElementById('linear-search-position') || {};
    linearSearchPositionElm.innerText += linearSearchCharacterIndex;

    const binarySearchResultsElm = document.getElementById('binary-search-results') || {};
    binarySearchResultsElm.innerText += binarySearchResults;

    const binarySearchPositionElm = document.getElementById('binary-search-position') || {};
    binarySearchPositionElm.innerText += binarySearchCharacterIndex;

    return binarySearchResults;
}

// Don't change this code aside from the numeric parameter passed in which indicates the number to search for, may see how searching different numbers results in different iterations for linear and binary search once your implementation is complete
// note: searchForAlphabeticalIndex is defaulted to generate an array of length 100 which ranges from 0-99, inputting a number outside that range will not be found and should therefore show -1 in the results for both searches.
window.onload = () => {
    let avengers = ['Iron Man', 'Captain America', 'Thor', 'Hulk', 'Black Widow', 'Hawkeye'];
    let randomAvenger = avengers[Math.floor(Math.random() * avengers.length)];
    searchForAlphabeticalIndex(randomAvenger);
};

//don't change this line
if (typeof module !== 'undefined') {
    module.exports = { searchForAlphabeticalIndex };
}
