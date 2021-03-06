const debugSyntax = false;

const consonants = ["b","c","d","f","g","h","j","k","l","m","n","p","qu","r","s","t","v","w","x","y","z"];
const vowels = ["a","e","i","o","u"];
const vowelMatches = [
    { match: "a", probability: 8},
    { match: "e", probability: 13},
    { match: "i", probability: 7},
    { match: "o", probability: 8},
    { match: "u", probability: 3},
]
const vowelCompounds = [
    { match: "Vgh", probability: 10, start: true, end: true},
    { match: "hy", probability: 8, start: false, end: false},
    { match: "ea", probability: 40, start: true, end: true},
    { match: "ae", probability: 10, start: true, end: false},
    { match: "ai", probability: 30, start: true, end: false},
    { match: "ou", probability: 30, start: true, end: false},
    { match: "eo", probability: 30, start: true, end: false},
    { match: "ee", probability: 50, start: true, end: true},
    { match: "oo", probability: 20, start: true, end: true},
    { match: "aa", probability: 4, start: true, end: false},
    { match: "y", probability: 40, start: false, end: true }
]
const consonantMatches = [
    { match: "b", probability: 150},
    { match: "c", probability: 280},
    { match: "d", probability: 430},
    { match: "f", probability: 220},
    { match: "g", probability: 200},
    { match: "h", probability: 50},
    { match: "j", probability: 15},
    { match: "k", probability: 25},
    { match: "l", probability: 400},
    { match: "m", probability: 240},
    { match: "n", probability: 670},
    { match: "p", probability: 190},
    { match: "qu", probability: 9},
    { match: "r", probability: 600},
    { match: "s", probability: 630},
    { match: "t", probability: 700},
    { match: "v", probability: 50},
    { match: "w", probability: 100},
    { match: "x", probability: 15},
    { match: "y", probability: 200},
    { match: "z", probability: 7}
]
const doubleableConsonantMatches = [
    { match: "b", probability: 150},
    { match: "d", probability: 430},
    { match: "f", probability: 220},
    { match: "g", probability: 200},
    { match: "l", probability: 400},
    { match: "m", probability: 240},
    { match: "n", probability: 670},
    { match: "p", probability: 190},
    { match: "s", probability: 630},
    { match: "t", probability: 700},
]
const consonantCompounds = [
    { match: "th", probability: 4, start: true, end: true},
    { match: "ph", probability: 5, start: true, end: true},
    { match: "pr", probability: 4, start: true, end: false},
    { match: "sh", probability: 6, start: true, end: true},
    { match: "ch", probability: 8, start: true, end: true},
    { match: "wh", probability: 1, start: true, end: false},
    { match: "wr", probability: 1, start: true, end: false},
    { match: "nd", probability: 4, start: false, end: false},
    { match: "rg", probability: 3, start: false, end: false},
    { match: "rt", probability: 4, start: false, end: true},
    { match: "rth", probability: 4, start: false, end: true},
    { match: "rm", probability: 4, start: false, end: true},
    { match: "st", probability: 4, start: true, end: true},
    { match: "sp", probability: 1, start: true, end: true},
    { match: "sc", probability: 2, start: true, end: false},
    { match: "sk", probability: 1, start: true, end: true},
    { match: "sl", probability: 2, start: true, end: false},
    { match: "sn", probability: 2, start: true, end: false},
    { match: "sm", probability: 2, start: true, end: false},
    { match: "ck", probability: 4, start: false, end: true}, //TODO: Not first letter
    { match: "kn", probability: 2, start: true, end: false},
]
// const patterns = [
//     { match: "CVC", probability: 15},
//     { match: "CV", probability: 30},
//     { match: "CVV", probability: 5},
//     { match: "VC", probability: 10},
// ];
// const sections = [
//     { match: 1, probability: 4},
//     { match: 2, probability: 30},
//     { match: 3, probability: 30},
//     { match: 4, probability: 5},
//     { match: 5, probability: 1}
// ]
const parts = [
    { match: 2, probability: 12},
    { match: 3, probability: 32},
    { match: 4, probability: 74},
    { match: 5, probability: 35},
    { match: 6, probability: 20},
    { match: 7, probability: 12},
    { match: 8, probability: 3},
    { match: 9, probability: 2},
    { match: 10, probability: 1}
]
const totalNames = [
    { match: 1, probability: 1},
    { match: 2, probability: 90},
    { match: 3, probability: 9}
]
const doubleBarrel = [
    { match: false, probability: 95},
    { match: true, probability: 5}
]
const doubledConsonant = [
    { match: false, probability: 85},
    { match: true, probability: 15}
]
const vowelFirst = [
    { match: true, probability: 30},
    { match: false, probability: 70}
]
const compoundVowel = [
    { match: true, probability: 15},
    { match: false, probability: 85}
]
const compoundConsonant = [
    { match: true, probability: 20},
    { match: false, probability: 80}
]
// const oneInN = (n) => {
//     const randInt = Math.floor(Math.random() * n);
//     if (randInt === 0) return true;
//     return false;
// }

// Returns a function that returns a value from the probMatches based on the probabilities
const createProbabilityMap = (probMatches) => {
    const total = probMatches.reduce((a,b) => a + b.probability, 0)
    return () => {
        const rules = probMatches.reduce((a,b,i) => {
            a.push({ match: b.match, probability: a[i - 1] ? a[i - 1].probability + b.probability : b.probability})
            return a
        }, [])
        
        const randInt = Math.floor(Math.random() * total);
        const chosen = rules.reduce((a,b) => {
            if (a && a.probability && randInt < a.probability) return a;
            if (randInt < b.probability) return b;
            return undefined
        })

        return chosen.match
    }
}

const pickTotalNames = createProbabilityMap(totalNames);
const pickDoubleBarrel = createProbabilityMap(doubleBarrel);

// const pickPattern = createProbabilityMap(patterns);
// const pickSections = createProbabilityMap(sections);

const pickTotalParts = createProbabilityMap(parts);
const pickVowelFirst = createProbabilityMap(vowelFirst);

const pickVowel = createProbabilityMap(vowelMatches);
const pickVowelCompound = createProbabilityMap(vowelCompounds);
const pickStartVowelCompound = createProbabilityMap(vowelCompounds.filter(compound => compound.start === true));
const pickEndVowelCompound = createProbabilityMap(vowelCompounds.filter(compound => compound.end === true));

const pickConsonant = createProbabilityMap(consonantMatches);
const pickDoubleableConsonant = createProbabilityMap(doubleableConsonantMatches);
const pickDoubledConsonant = createProbabilityMap(doubledConsonant);

const pickStartConsonantCompound = createProbabilityMap(consonantCompounds.filter(compound => compound.start === true));
const pickEndConsonantCompound = createProbabilityMap(consonantCompounds.filter(compound => compound.end === true));
const pickConsonantCompound = createProbabilityMap(consonantCompounds);

const pickCompoundVowel =  createProbabilityMap(compoundVowel)
const pickCompoundConsonant = createProbabilityMap(compoundConsonant)

const getRandItemFromArray = (array) => {
    const randInt = Math.floor(Math.random() * array.length);
    return array[randInt];
}

const debugWrapper = (string, colourCode) => {
    if (debugSyntax && colourCode) return `${colourCode}${string}\x1b[0m`;
    if (debugSyntax) return `\x1b[31m${string}\x1b[0m`
    return string
}

const isEven = (num) => {
    return num % 2 === 0;
}

const substituteOneWildcard = (string) => {
    const newString = string.replace("V",pickVowel()).replace("C", pickConsonant())
    return newString;
}

const getPositionInName = (i, length) => {
    if (i === 0) return "start";
    if (i === length -1 ) return "end";
    return "middle";
}
const getVowel = (position) => {
    if (pickCompoundVowel()){
        switch (position) {
            case "start":
                return substituteOneWildcard(pickStartVowelCompound());
            case "end":
                return substituteOneWildcard(pickEndVowelCompound());
            case "middle":
                return substituteOneWildcard(pickVowelCompound());
        }
   } else {
     return pickVowel();
   }
}
const getConsonant = (position) => {
    if (pickCompoundConsonant()){
        switch (position) {
            case "start":
                return debugWrapper(pickStartConsonantCompound());
            case "end":
                return debugWrapper(pickEndConsonantCompound(), "\x1b[34m");
            case "middle":
                return pickConsonantCompound();
        }
    } else if (pickDoubledConsonant() && position !== "start"){ 
        const consonant = pickDoubleableConsonant();
        return `${consonant}${consonant}`
    } else {
        return pickConsonant();
    }
}
const getPart = (position, vowelOrConsonant) => {
    return vowelOrConsonant === "vowel" ? getVowel(position) : getConsonant(position)
}

const createName = () => {

    let nameTemplate = "";
    const numberOfParts = pickTotalParts();
    const vowelFirst = pickVowelFirst();
    for (let i = 0; i < numberOfParts; i++){
        if (vowelFirst){ 
            if(isEven(i)){
                nameTemplate += "V"
            } else {
                nameTemplate += "C"
            }
        } else {
            // consonantFirst
            if(isEven(i)){
                nameTemplate += "C"
            } else {
                nameTemplate += "V"
            }
        }
    }    

    let name = ""
    const nameTemplateCharArray = [...nameTemplate]
    nameTemplateCharArray.forEach((char, i) => {
        const position = getPositionInName(i, nameTemplateCharArray.length)
        const vowelOrConsonant = char ==="V" ? "vowel" : "consonant";
        name += getPart(position, vowelOrConsonant)
    })

    return name
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  
const createFullName = () => {
    const totalNames = pickTotalNames();
    let fullName = ""
    for (let i = 0; i < totalNames; i++){
        if (pickDoubleBarrel()){
            fullName += `${capitalizeFirstLetter(createName())}-${capitalizeFirstLetter(createName())}`
        } else { fullName += capitalizeFirstLetter(createName())}
        if (i !== totalNames - 1) {
            fullName += " "
        }
    }
    return fullName;
}

for (let i = 0; i < 20; i++){
    console.log(createFullName());
}