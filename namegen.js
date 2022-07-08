

const consonants = ["b","c","d","f","g","h","j","k","l","m","n","p","qu","r","s","t","v","w","x","y","z"];
const vowels = ["a","e","i","o","u"];
const vowelMatches = [
    { match: "a", probability: 8},
    { match: "e", probability: 13},
    { match: "i", probability: 7},
    { match: "o", probability: 8},
    { match: "u", probability: 3}
]
const consonantMatches = [
    { match: "b", probability: 150},
    { match: "c", probability: 280},
    { match: "d", probability: 430},
    { match: "f", probability: 220},
    { match: "g", probability: 200},
    { match: "h", probability: 610},
    { match: "j", probability: 15},
    { match: "k", probability: 77},
    { match: "l", probability: 400},
    { match: "m", probability: 240},
    { match: "n", probability: 670},
    { match: "p", probability: 190},
    { match: "qu", probability: 9},
    { match: "r", probability: 600},
    { match: "s", probability: 630},
    { match: "t", probability: 910},
    { match: "v", probability: 98},
    { match: "w", probability: 240},
    { match: "x", probability: 15},
    { match: "y", probability: 200},
    { match: "z", probability: 7}
]
const patterns = [
    { match: "vv", probability: 20}, 
    { match: "cvc", probability: 30},
    { match: "cv", probability: 30},
    { match: "vc", probability: 20}
];
const sections = [
    { match: 1, probability: 10},
    { match: 2, probability: 40},
    { match: 3, probability: 40},
    { match: 4, probability: 10}
]

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

const pickPattern = createProbabilityMap(patterns);
const pickSections = createProbabilityMap(sections);
const pickVowel = createProbabilityMap(vowels);
const pickConsonant = createProbabilityMap(consonants);

const getRandItemFromArray = (array) => {
    const randInt = Math.floor(Math.random() * array.length);
    return array[randInt];
}

const createName = () => {
    const numberOfSections = pickSections();
    let nameTemplate = "";
    for (let i = 0; i < numberOfSections; i++){
        nameTemplate += pickPattern();
    }
    let name = ""
    for (let char of nameTemplate) {
        console.log(pickVowel())
        if (char === "v") { name += getRandItemFromArray(vowels) }
        else { name += getRandItemFromArray(consonants)}
    } 
    return name
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

const createFullName = () => {
    const forename = capitalizeFirstLetter(createName());
    const surname = capitalizeFirstLetter(createName());
    console.log(`${forename} ${surname}`)
}

for (let i = 0; i < 20; i++){
    createFullName();
}