let canPlay = true;
let turn = true;
const order = 3;

function desenhar(boardArray) {
  table = $('<table></table>').appendTo(draw);

  for (let i = 0; i < order; i++) {
    tr = $('<tr></tr>').appendTo(table);

    for (let j = 0; j < order; j++) {
      td = $('<td></td>').appendTo(tr);

      td.attr('lin', i);
      td.attr('col', j);
    }

    let square = $('td');

    square.each(function () {
      $(this).on('click', () => {clicando(this, boardArray);});
    })
  }
}

function clicando(event, boardArray) {
  if (canPlay) {
    lin = $(event).attr('lin');
    col = $(event).attr('col');

    if ($(event).text() == '') {
      $(event).animate({ 'opacity': '100%' }, 140);
      if (turn) {
        text = 'X';
        boardArray[lin][col] = 1;
      } else {
        text = 'O';
        boardArray[lin][col] = -1;
      }

      $(event).text(text);
      turn = !turn;

      checkWin(lin, col, boardArray);
    }
  }
}

function checkWin(lin, col, boardArray) {
  let somaLin = 0;
  let somaCol = 0;
  let somaDi1 = 0;
  let somaDi2 = 0;
  let orderInvert = order - 1;

  for (let j = 0; j < order; j++) {
    somaLin += boardArray[lin][j];
    somaCol += boardArray[j][col];
    somaDi1 += boardArray[j][j];
    somaDi2 += boardArray[j][orderInvert];
    orderInvert -= 1;
  }

  if (somaDi1 == order || somaDi2 == order || somaLin == order || somaCol == order) {
    win('X', boardArray);
  } else if (somaDi1 == -order || somaDi2 == -order || somaLin == -order || somaCol == -order) {
    win('O', boardArray);
  }
}

function win(x, boardArray) {
  canPlay = false;

  relaod = $("<button name='reload' type='button'>Reiniciar</button>").appendTo(draw);

  winner = $('<h2></h2>').text(x + ' GANHOU');
  winner.appendTo(draw);

    relaod.on('click', function () {
      winner.remove();
      relaod.remove();

      for (let i = 0; i < order; i++) {
        for (let j = 0; j < order; j++) {
          boardArray[i][j] = 0;
        }
      }

      $('table').remove();

      canPlay = true;
      turn = true;

      desenhar(boardArray);

      return;
    })

    for (let k = 0; k <= 2000; k++) {
      winner.animate({ fontSize: '20px' });
      winner.animate({ fontSize: '40px' });
    }
}

$(document).ready(function () {
  let draw = $("#draw");
		
	let boardArray = new Array();
		
  for(let i = 0; i < order; i++) {
    boardArray.push(new Array());
    for (let j = 0; j < order; j++) {
      boardArray[i].push(0);
    }
  }

  draw.onload = desenhar(boardArray);
})