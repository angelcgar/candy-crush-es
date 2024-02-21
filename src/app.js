document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const scoreDisplay = document.getElementById('score')
  const width = 8
  const squares = []
  let score = 0

  const colorCandy = [
    'red',
    'yellow',
    'blue',
    'orange',
    'purple',
    'green'
  ]

  // crear cuadricula
  function createBoard() {
    for (let i = 0; i < width*width; i++) {
      const square = document.createElement('div')
      square.setAttribute('draggable', true)
      square.setAttribute('id', i)

      let colorRamdom = Math.floor(Math.random() * colorCandy.length)
      square.style.backgroundColor = colorCandy[colorRamdom]
      grid.appendChild(square)
      squares.push(square)
      // console.log(squares);
    }
  }

  createBoard()

  // dibujar los dulces
  let coloBeingDragged
  let coloBeingReplaced
  let squareIdBeingDragged
  let squareIdBeingReplace

  // lo estas haciendo mal y si es tu culpa
  //? estudiar a detalle estos 'drags' y drop
  squares.forEach(square => square.addEventListener('dragstart', dragStart))
  squares.forEach(square => square.addEventListener('dragend', dragEnd))
  squares.forEach(square => square.addEventListener('dragover', dragOver))
  squares.forEach(square => square.addEventListener('dragenter', dragEnter))
  squares.forEach(square => square.addEventListener('drageleave', dragleave))
  squares.forEach(square => square.addEventListener('drop', dragDrop))



 function dragStart() {
    coloBeingDragged = this.style.backgroundColor
    squareIdBeingDragged = parseInt(this.id)
    // console.log(coloBeingDragged);
    // Aqui es donde empieza a mover el dulce
    // console.log(this.id, 'dragstart');
  }

 function dragEnd() {
    // donde terminas de mover
    // console.log(this.id, 'dragend');
    // cual es el movimiento valido?
    let validMoves = [
      squareIdBeingDragged - 1,
      squareIdBeingDragged - width,
      squareIdBeingDragged + 1,
      squareIdBeingDragged + width
    ]
    let validMove = validMoves.includes(squareIdBeingReplace)

    if (squareIdBeingReplace && validMove) {
      squareIdBeingReplace = null
    } else if (squareIdBeingReplace && !validMove) {
      squares[squareIdBeingReplace].style.backgroundColor = coloBeingReplaced
      squares[squareIdBeingDragged].style.backgroundColor = coloBeingDragged
    } else squares[squareIdBeingDragged].style.backgroundColor = coloBeingDragged
  }

 function dragOver(e) {
  //  console.log(e.preventDefault());
    e.preventDefault()
    // por donde te mueves, en el tablero
    // console.log(this.id, 'dragOver');
  }

 function dragEnter(e) {
    e.preventDefault()
    // y aqui es por el que lo quieres cambiar de posicion
    // console.log(this.id, 'dragenter');
  }

 function dragleave() {
    // la anterior casilla
    // console.log(this.id, 'dragleave');
  }

 function dragDrop() {
    // console.log(this.id, 'dragdrop');
    coloBeingReplaced = this.style.backgroundColor
    squareIdBeingReplace = parseInt(this.id)
    this.style.backgroundColor = coloBeingDragged
    squares[squareIdBeingDragged].style.backgroundColor = coloBeingReplaced
  }

  //drop candies once some have been cleared
  function moveIntoSquareBelow() {
    for (let i = 0; i < 55; i ++) {
      if(squares[i + width].style.backgroundColor === '') {
        squares[i + width].style.backgroundColor = squares[i].style.backgroundColor
        squares[i].style.backgroundColor = ''
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
        const isFirstRow = firstRow.includes(i)
        if (isFirstRow && (squares[i].style.backgroundColor === '')) {
          let randomColor = Math.floor(Math.random() * colorCandy.length)
          squares[i].style.backgroundColor = colorCandy[randomColor]
        }
      }
    }
  }


  ///Checking for Matches
  //for row of Four
  function checkRowForFour() {
    for (let i = 0; i < 60; i ++) {
      let rowOfFour = [i, i+1, i+2, i+3]
      let decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
      if (notValid.includes(i)) continue

      if(rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        score += 4
        scoreDisplay.innerHTML = score
        rowOfFour.forEach(index => {
        squares[index].style.backgroundImage = ''
        })
      }
    }
  }
  checkRowForFour()

  //for column of Four
  function checkColumnForFour() {
    for (let i = 0; i < 39; i ++) {
      let columnOfFour = [i, i+width, i+width*2, i+width*3]
      let decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      if(columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        score += 4
        scoreDisplay.innerHTML = score
        columnOfFour.forEach(index => {
        squares[index].style.backgroundImage = ''
        })
      }
    }
  }
  checkColumnForFour()



  // Revisar por fila de tres
  function checkRowForThree() {
    for (let i = 0; i < 61; i++) {
      let rowOfThree = [i, i+1, i+2]
      let decideColor = squares[i].style.backgroundColor
      const isBlank = squares[i].style.backgroundColor === ''

      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
      if (notValid.includes(i)) continue

      if (rowOfThree.every(index => squares[index].style.backgroundColor === decideColor && !isBlank)) {
        score += 3
        scoreDisplay.innerHTML = score
        rowOfThree.forEach(index => {
          squares[index].style.backgroundColor = ''
        })
      }
    }
  }
  checkRowForThree()
  // Revisar por columna de tres
  function checkColumnForThree() {
    for (let i = 0; i < 47; i++) {
      // por que '* 2'
      let columnOfThree = [i, i + width, i + width * 2]
      let decideColor = squares[i].style.backgroundColor
      const isBlank = squares[i].style.backgroundColor === ''

      if (columnOfThree.every(index => squares[index].style.backgroundColor === decideColor && !isBlank)) {
        score += 3
        scoreDisplay.innerHTML = score
        columnOfThree.forEach(index => {
          squares[index].style.backgroundColor = ''
        })
      }
    }
  }

  checkColumnForThree()

  window.setInterval(function() {
    checkRowForFour()
    checkColumnForFour()
    checkRowForThree()
    checkColumnForThree()
    moveIntoSquareBelow()
  }, 100)

})