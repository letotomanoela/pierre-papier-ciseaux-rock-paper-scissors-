const rulesBtn = document.querySelectorAll('.rules')
const rulesModal = document.querySelector('.rules-modal')
const closeModal = document.querySelector('.close')
const step1 = document.querySelector('.step1')
const step2 = document.querySelector('.step2')
const players = step2.querySelectorAll('.img img')
const step3 = document.querySelector('.step3')
const playersResult = step3.querySelectorAll('.img img')
const btnChoices = step1.querySelectorAll('.img')
const resultTxt = step3.querySelector('.result-text')
const replayBtn = step3.querySelector('button')
const choices = ['PIERRE', 'PAPIER', 'CISEAUX']
const wins = [{
    player1: 'CISEAUX',
    player2: 'PAPIER'
}, {
    player1: 'PAPIER',
    player2: 'PIERRE'
}, {
    player1: 'PIERRE',
    player2: 'CISEAUX'
}]
const scoreTxt = document.querySelector('.score-txt')
let score = 0
btnChoices.forEach(choice => {
    choice.addEventListener('click', () => {
        let randomNumber = Math.floor(Math.random() * 3)
        let computerChoice = choices[randomNumber]
        let computerChoiceImg
        let computerBorderChoice

        switch (computerChoice) {
            case 'PIERRE':
                computerChoiceImg = 'images/icon-rock.svg'
                computerBorderChoice = 'pierre-color'
                break
            case 'PAPIER':
                computerChoiceImg = 'images/icon-paper.svg'
                computerBorderChoice = 'papier-color'
                break
            case 'CISEAUX':
                computerChoiceImg = 'images/icon-scissors.svg'
                computerBorderChoice = 'ciseaux-color'
                break
        }
        let yourChoice = choice.getAttribute('title')
        let yourBorderChoice
        switch (yourChoice) {
            case 'PIERRE':
                yourBorderChoice = 'pierre-color'
                break
            case 'PAPIER':
                yourBorderChoice = 'papier-color'
                break
            case 'CISEAUX':
                yourBorderChoice = 'ciseaux-color'
                break
        }
        let yourChoiceImg = choice.firstChild.getAttribute('src')
        step1.classList.add('hide')
        step2.classList.remove('hide')
        players[0].setAttribute('src', `${yourChoiceImg}`)
        players[0].parentElement.classList.add(yourBorderChoice)
        setTimeout(() => {
            players[1].parentElement.classList.remove('load')
            players[1].setAttribute('src', `${computerChoiceImg}`)
            players[1].parentElement.classList.add(computerBorderChoice)
        }, 500)
        setTimeout(() => {
            step2.classList.add('hide')
            step3.classList.remove('hide')
            playersResult[0].setAttribute('src', `${yourChoiceImg}`)
            playersResult[0].parentElement.classList.add(yourBorderChoice)
            playersResult[1].setAttribute('src', `${computerChoiceImg}`)
            playersResult[1].parentElement.classList.add(computerBorderChoice)
        }, 1200)

        if (computerChoice === yourChoice) {
            resultTxt.innerText = 'Match Nul'
        }
        wins.forEach(w => {
            if (w.player1 === yourChoice && w.player2 === computerChoice) {
                resultTxt.innerText = 'Vous avez gagné!!!'
                score++
            }
            if (w.player1 === computerChoice && w.player2 === yourChoice) {
                resultTxt.innerText = 'Vous avez perdu!!!'
                score--
            }
        })
        if (score < 0) score = 0
        setTimeout(() => {
            scoreTxt.innerText = score
        }, 1800)


    })
    replayBtn.addEventListener('click', () => {
        if (!step1.classList.contains('hide')) step3.classList.add('hide')
        else {
            step3.classList.add('hide')
            step1.classList.remove('hide')
        }
        players[0].removeAttribute('src')
        players[1].removeAttribute('src')
        playersResult[0].removeAttribute('src')
        playersResult[1].removeAttribute('src')
        players[0].parentElement.className = 'img player1'
        players[1].parentElement.className = 'img player2 load'
        playersResult[0].parentElement.className = 'img player1'
        playersResult[1].parentElement.className = 'img player2'


    })
})

rulesBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        rulesModal.classList.add('show-modal')
    })
})
closeModal.addEventListener('click', () => {
    rulesModal.classList.remove('show-modal')
})