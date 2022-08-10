//every possible winning combination of the 3-by-3 tictactoe game
const winComb = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]]

//retrieving divs that will need to be changed or used during the game
const nextplayerdiv = document.getElementById('nextplayer')
const winnerdiv = document.getElementById('winner')
const playdiv = document.getElementById('play')
const warningxdiv = document.getElementById('warningX')
const warningodiv = document.getElementById('warningO')
const submitX = document.getElementById('buttonX')
const submitO = document.getElementById('buttonO')
const Xinput = document.getElementById('inputx')
const Oinput = document.getElementById('inputo')
const xinputdiv = document.getElementById('xinputdiv')
const oinputdiv = document.getElementById('oinputdiv')


const pXdiv = document.getElementById('playerX')
const pOdiv = document.getElementById('playerO')

const Xnamediv = document.getElementById('xplayer')
const Onamediv = document.getElementById('oplayer')
const xscorediv = document.getElementById('xscore')
const oscorediv = document.getElementById('oscore')

//arrow function to get all the button elements
const makeblockarr = () => {
  let blockarr = []
  for (let i = 1; i < 10; i++) {
    blockarr.push(document.getElementById(i.toString()))
  } return blockarr

}
//making the O-Player input invisible to ensure the X player inputs their name first
oinputdiv.style.display = 'none'

//making an array of the blocks
const blocks = makeblockarr()


//arrow function to determine if all the blocks have been used
const allblockstaken = () => {
  let nottaken = blocks.filter(block => block.innerText == '')
  if (nottaken.length == 0) {
    return true
  }
  return false
}

//to disable the blocks from being used at the beginning of the game to ensure that the players input their names
blocks.forEach(block => {
  block.disabled = true
})

//to disable the play button from being functional at the beginning of the game to ensure that the players input their names
playdiv.disabled = true

//takes in a boolean which will be used to disable or enable all the blocks depending on the state of the game
const setbuttons = (bool) => {
  blocks.forEach((block) => {
    if (bool == true) {
      block.disabled = bool
      nextplayerdiv.innerText = 'GAME ENDED. RESTART GAME!'
    } else {
      block.style.backgroundColor = 'green'
      block.disabled = bool
    }
  })
}

//helper function for ultimateValid
const validComb = (mycomb, comb) => {
  let final = []
  for (let i = 0; i < comb.length; i += 1) {
    if (mycomb.includes(comb[i])) {
      final.push(comb[i])
    }
  }
  if (final.length == 3) {
    return final
  } else { return [] }
}

//function to determine if the player's blocks contains any winning combination
const ultimateValid = (mycomb) => {
  let combs = []
  for (let i = 0; i < winComb.length; i += 1) {
    let arr = validComb(mycomb, winComb[i])
    if (arr.length > 0) (
      combs.push(arr)
    )

  }
  if (combs.length > 0) {
    return true
  }
  return false
}



//Player class
class Player {
  constructor(name, side, opp) {
    this.name = name
    this.side = side
    this.blocks = []
    this.opp = opp
    this.score = 0
    this.message = `${side} played, ${opp} is next.`
    side == 'X' ? this.played = false : this.played = true
    //this.played = false
  }

  //method which uses ultimateValid function to check if a winning combination has been made by a player and returns a boolean
  checkBlocks(blocks) {
    let trueComb = false
    if (blocks.length >= 3) {
      trueComb = ultimateValid(blocks.sort())
    } return trueComb

  }
//method to reset some of the players properties when playing a new game
  reset() {
    this.blocks = []
    this.side == 'X' ? this.played = false : this.played = true

  }
//method to ensure a player doesn't play twice
  chooseNext(p1, p2) {
    if (p1.played == false && p2.played == true) {
      p1.played = true
      p2.played = false
      return p1
    } else {
      p1.played = false
      p2.played = true
      return p2
    }

  }
  //method to increment score and update the div displaying the score
  incrementscore() {
    this.score++
    this.side == 'X' ?
      xscorediv.innerText = this.score : oscorediv.innerText = this.score
  }

}
let xname;
let oname;


let playerX = new Player(xname, 'X', 'O')
let playerO = new Player(oname, 'O', 'X')

//checks the X player's name to ensure that a valid name is entered, displays a warning if an invalid name is entered
submitX.onclick = () => {
  if (Xinput.value == '' || !isNaN(Xinput.value)) {
    warningxdiv.innerText = 'Please enter a valid name!'
    warningxdiv.style.color = 'red'
    playerX.name = ' '
    setTimeout(()=>{
      warningxdiv.style.display = 'none'}, 2000)
  }
  else {
    playerX.name = Xinput.value.toUpperCase()
    Xnamediv.innerText = playerX.name + ':'
    xinputdiv.style.display = 'none'
    pXdiv.innerText = 'PlayerX' + ': ' + playerX.name.toUpperCase()
    oinputdiv.style.display = 'block'


  } console.log(xname)
  console.log(playerX)
}

//checks the O player's name to ensure that a valid name is entered, displays a warning if an invalid name is entered
submitO.onclick = () => {
  if (Oinput.value == '' || !isNaN(Oinput.value)) {
    warningodiv.innerText = 'Please enter a valid name!'
    warningodiv.style.color = 'red'
    playerO.name = ' '
    setTimeout(()=>{
      warningodiv.style.display = 'none'}, 2000)

  } else {
    playerO.name = Oinput.value.toUpperCase()
    Onamediv.innerText = playerO.name + ':'
    playerO.played = true
    oinputdiv.style.display = 'none'
    pOdiv.innerText = 'PlayerO' + ': ' + playerO.name.toUpperCase()
    playdiv.disabled = false

  } console.log(oname)
  console.log(playerO)
}




xscorediv.innerText = playerX.score
oscorediv.innerText = playerO.score
let currentPlayer = new Player('', '', '')

//function to display the players names
const updateplayerdiv = () => {
  pXdiv.innerText = 'PlayerX' + ': ' + playerX.name
  pOdiv.innerText = 'PlayerO' + ': ' + playerO.name
}



blocks.forEach((block) => {
  block.onclick = () => {
    //checks if a block has been taken
    if (block.innerText == 'X' || block.innerText == 'O') {
      nextplayerdiv.innerText = "BLOCK ALREADY USED. CHOOSE ANOTHER"

    } else {
      //chooses the next player
      currentPlayer = playerX.chooseNext(playerX, playerO)
      block.innerText = currentPlayer.side
      block.style.backgroundColor = 'yellow'
      currentPlayer.blocks.push(blocks.indexOf(block) + 1)
      nextplayerdiv.innerText = currentPlayer.message
      gameOver = currentPlayer.checkBlocks(currentPlayer.blocks)
      if (gameOver || allblockstaken()) {
        if (gameOver) {
          winnerdiv.innerText = `${currentPlayer.side} WINS! ${currentPlayer.opp} LOSES!`
          currentPlayer.incrementscore()
          playdiv.innerText = 'Restart Game'
        } else if (allblockstaken()) {
          winnerdiv.innerText = `${currentPlayer.side} WINS! ${currentPlayer.opp} LOSES!`
          winnerdiv.innerText = `IT'S A DRAW!`
        }
        //nextplayerdiv.innerText = 'PRESS RESTART GAME TO CLEAR GAME!'
        setbuttons(true)
      }
    }

  }
})

//actions to take when the play button is clicked
playdiv.onclick = () => {
  blocks.forEach((block) => {
    block.innerText = ''
  })
  playerX.reset()
  playerO.reset()
  nextplayerdiv.innerText = 'X goes first!'
  winnerdiv.innerText = 'Game On!'
  updateplayerdiv()
  setbuttons(!true)

}

