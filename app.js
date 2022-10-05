const emojiBtns = document.querySelectorAll("[data-emoji]")
let CURRENT_GAME_COUNT = 1
let USER_WIN_COUNT = 0
let CPU_WIN_COUNT = 0
const emojis = [
    {
        name:"rock",
        emoji:"👊",
        beats:"scissors",
        id:1
    },
    {
        name:"paper",
        emoji:"🤚",
        beats:"rock",
        id:2
    },
    {
        name:"scissors",
        emoji:"✌️",
        beats:"paper",
        id:3
    }
] 
emojiBtns.forEach(btn => {
    btn.addEventListener("click",()=>{
        const userChoice = emojis.find(emoji => emoji.name === btn.dataset.emoji)
        const computerChoice = makeComputerChoice(userChoice)
        const winner = checkWin(userChoice,computerChoice)
        incrementCounts(winner)
        addResult(userChoice.emoji,computerChoice.emoji, winner,CURRENT_GAME_COUNT)
        CURRENT_GAME_COUNT++;
    })
})

function incrementCounts(msg){
    const userScore = document.querySelector("#userScore")
    const computerScore = document.querySelector("#computerScore")
    if(msg === "You won"){
        USER_WIN_COUNT++;
        userScore.textContent = USER_WIN_COUNT
        return
    }
    if(msg === "You lost"){
        CPU_WIN_COUNT++;
        computerScore.textContent = CPU_WIN_COUNT
        return
    }
}

function addResult(userEmoji, computerEmoji, winningMsg, currentGameCount){
    const resultsWrapper = document.querySelector("#resultsWrapper")
    const resultTemplate = document.querySelector("[data-result]").content.cloneNode(true).children[0]
    resultTemplate.querySelector("#currentGameCount").textContent = currentGameCount
    resultTemplate.querySelector("#userChoice").textContent = userEmoji
    resultTemplate.querySelector("#computerChoice").textContent = computerEmoji
    resultTemplate.querySelector("#winningMessage").textContent = winningMsg
    resultsWrapper.append(resultTemplate)
}

function makeComputerChoice(userChoice){
    // let randomNumber = getRandomNumber(emojis.length)
    const computerChoice = emojis.find(emoji => emoji.beats === userChoice.name)
    
    return computerChoice
}

function checkGameCount(currentGameCount = 1){
    return currentGameCount + 1
}

function getRandomNumber(range = 1){
    return Math.round(Math.random() * range)
}

function checkWin(userChoice, computerChoice){
    console.log(userChoice, computerChoice);
    return userChoice.beats === computerChoice.name ? "You won" : computerChoice.beats === userChoice.name ? "You lost" : "Draw"
}