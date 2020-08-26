'use strict'

const cards = [
  'lemon',
  'candy',
  'carrot',
  'hotdog',
  'hamburger',
  'cookie',
  'pizza',
  'apple',
]
const stars = [1, 2, 3, 4, 5]
let moves
let holders = document.querySelectorAll('.holder')

holders.forEach(holder => {
  holder.onclick = e => {
    e.stopPropagation()
    e.target.firstElementChild.classList.toggle('active')
  }
})
