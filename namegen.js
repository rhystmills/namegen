const debugSyntax = true;

const consonants = ["b","c","d","f","g","h","j","k","l","m","n","p","qu","r","s","t","v","w","x","y","z"];
const vowels = ["a","e","i","o","u"];
const vowelMatches = [
    { match: "a", probability: 8},
    { match: "e", probability: 13},
    { match: "i", probability: 7},
    { match: "o", probability: 8},
    { match: "u", probability: 3},
    { match: "y", probability: 1}
]
const vowelCompounds = [
    { match: "Vgh", probability: 10},
    { match: "hy", probability: 10},
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
    { match: "th", probability: 10},
    { match: "ph", probability: 5},
    { match: "sh", probability: 10},
    { match: "ph", probability: 2},
    { match: "ch", probability: 8},
    { match: "wh", probability: 1},
    { match: "wr", probability: 1},
    { match: "st", probability: 4},
    { match: "ck", probability: 4},
    { match: "kn", probability: 2},
]
const patterns = [
    { match: "CVC", probability: 15},
    { match: "CV", probability: 30},
    { match: "CVV", probability: 5},
    { match: "VC", probability: 10},
];
const sections = [
    { match: 1, probability: 4},
    { match: 2, probability: 30},
    { match: 3, probability: 30},
    { match: 4, probability: 5},
    { match: 5, probability: 1}
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
    { match: false, probability: 80},
    { match: true, probability: 10}
]

const oneInN = (n) => {
    const randInt = Math.floor(Math.random() * n);
    if (randInt === 0) return true;
    return false;
}

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
const pickPattern = createProbabilityMap(patterns);
const pickSections = createProbabilityMap(sections);
const pickVowel = createProbabilityMap(vowelMatches);
const pickVowelCompound = createProbabilityMap(vowelCompounds);
const pickConsonant = createProbabilityMap(consonantMatches);
const pickDoubleableConsonant = createProbabilityMap(doubleableConsonantMatches);
const pickDoubledConsonant = createProbabilityMap(doubledConsonant);
const pickConsonantCompound = createProbabilityMap(consonantCompounds);

const getRandItemFromArray = (array) => {
    const randInt = Math.floor(Math.random() * array.length);
    return array[randInt];
}

const debugWrapper = (string, colourCode) => {
    if (debugSyntax && colourCode) return `${colourCode}${string}\x1b[0m`;
    if (debugSyntax) return `\x1b[31m${string}\x1b[0m`
    return string
}

const createName = () => {
    const numberOfSections = pickSections();
    let nameTemplate = "";
    for (let i = 0; i < numberOfSections; i++){
        nameTemplate += pickPattern();
    }
    let nameTemplateWithCompounds = "";
    for (let char of nameTemplate) {
        if (char === "V") { 
            if (oneInN(50)) { nameTemplateWithCompounds += debugWrapper(pickVowelCompound(), "\x1b[34m")}
            else nameTemplateWithCompounds += "V"
        }
        if (char === "C") {
            if (oneInN(20)) { nameTemplateWithCompounds += debugWrapper(pickConsonantCompound())}
            else nameTemplateWithCompounds += "C"
        }
    }
    let name = ""
    // for (let char of nameTemplateWithCompounds) {
    //     if (char === "V") { name += pickVowel() }
    //     else if (char ==="C") { name += pickConsonant() }
    //     else { name += char}
    // }
    const nameTemplateCharArray = [...nameTemplateWithCompounds]
    nameTemplateCharArray.forEach((char, i) => {
        if (char === "V") { name += pickVowel() }
        else if (char === "C") {
            if(pickDoubledConsonant() && i !== 0){
                const consonantToDouble = pickDoubleableConsonant();
                const dubs = consonantToDouble + consonantToDouble
                name += debugWrapper(dubs, "\x1b[35m")
            }
            name += pickConsonant() 
        }
        else { name += char}
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

for (let i = 0; i < 10; i++){
    console.log(createFullName());
}