let words = ["sound", "rose", "kick", "kiss", "little", "cool", "chance", "trousers", "cheer", "machine", "music", "mine" , "hanging", "larger", "blind", "discover", "throw", "laugh", "big", "chase", "sleep", "trouble", "myself", "faster", "slow", "request", "sender", "fire", "life", "world", "summer", "love", "home", "today", "don\'t", "rain", "heart", "under", "all", "good", "fun", "end", "bold", "somebody", "over", "one", "cry", "secret", "save", "yourself", "bye", "run", "brick", "eye", "day", "tonight", "tear", "thing", "begin", "lucky", "party", "march", "heal", "royal", "cross", "silence", "changes", "attention", "marry", "reason", "even", "from", "moment", "I", "want", "it", "that", "way", "tale", "time", "strong", "low", "beauty", "bird", "brown", "let", "sun", "hero", "holding", "out", "wonderful", "take", "memory", "queen", "my", "your", "song", "always", "careless", "living", "prayer", "wild", "one", "night", "coming", "back", "me", "pocket", "sunshine", "sorry"];

    let wordsArr = [];

    for (let i=0; i < 10; i++) {
        let wordList = words[Math.floor(Math.random() * words.length)];
        wordsArr.push(wordList);
        songSelect = words.indexOf(wordList);
        words.splice(songSelect, 1);
    }

    let selectedWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];
    cont.textContent = selectedWord;