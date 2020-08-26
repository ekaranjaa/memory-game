const starEls = document.querySelector('.star')
const movesEl = document.querySelector('.moves')
const timeEl = document.querySelector('.time')
const deck = document.querySelector('.deck')
let clicks = 0
let stars = 5
let moves = {
  total: 0,
  correct: 0,
}
let time = {
  seconds: 0,
  minutes: 0,
  timeout: 10,
}

// Check if player's cards match
function checkCards(cardOne, cardTwo) {
  const cards = document.querySelectorAll('.card')

  console.log(cardOne, cardTwo)

  cards.forEach(card => {
    card.classList.add('disabled')

    setTimeout(() => {
      if (cardOne === cardTwo) {
        if (
          card.getAttribute('data-name') === cardOne ||
          card.getAttribute('data-name') === cardTwo
        ) {
          card.classList.add('passed')
        }
      } else {
        card.classList.remove('active')
      }

      card.classList.remove('disabled')
    }, 800)
  })
}

// Refresh player's score
function refreshStars() {
  if (moves.correct > 1) {
    stars++
  }
}

// The game runs once a click event happens in the `deck` container
deck.onclick = e => {
  if (e.target.classList.contains('holder')) {
    if (
      e.target.firstElementChild.classList.contains('active') ||
      e.target.firstElementChild.classList.contains('passed')
    ) {
      return
    } else {
      clicks++

      e.target.firstElementChild.classList.toggle('active')

      if (clicks === 1) {
        sessionStorage.setItem(
          'cardOne',
          e.target.firstElementChild.getAttribute('data-name')
        )
      }

      if (clicks === 2) {
        sessionStorage.setItem(
          'cardTwo',
          e.target.firstElementChild.getAttribute('data-name')
        )
        checkCards(
          sessionStorage.getItem('cardOne'),
          sessionStorage.getItem('cardTwo')
        )

        clicks = 0
      }

      moves.total++
      movesEl.innerHTML = `<p>Moves: ${moves.total}</p>`
    }
  }
}

// Timer
const x = setInterval(() => {
  let seconds = ++time.seconds

  if (seconds > 59) {
    time.minutes++
    time.seconds = 0
  }

  if (time.minutes === time.timeout) {
    clearInterval(x)
  }

  timeEl.innerHTML = `<p>Time: ${time.minutes}m ${time.seconds}s</p>`
}, 1000)

// Re-shuffle cards
for (let i = deck.children.length; i >= 0; i--) {
  deck.appendChild(deck.children[Math.floor(Math.random() * i)])
}
