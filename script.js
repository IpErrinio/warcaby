document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const pieces = [];
    let currentPlayer = 'black';

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;

            if ((row + col) % 2 === 0) {
                cell.classList.add('light');
            } else {
                cell.classList.add('dark');
            }

            if ((row + col) % 2 !== 0 && row < 3) {
                const piece = createPiece('black', row, col);
                pieces.push(piece);
                cell.appendChild(piece);
            } else if ((row + col) % 2 !== 0 && row > 4) {
                const piece = createPiece('red', row, col);
                pieces.push(piece);
                cell.appendChild(piece);
            }

            cell.addEventListener('click', () => handleCellClick(cell));
            board.appendChild(cell);
        }
    }

    function createPiece(color, row, col) {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        piece.classList.add(color);
        piece.dataset.row = row;
        piece.dataset.col = col;
        piece.dataset.color = color;
        return piece;
    }

    function handleCellClick(cell) {
        const selectedPiece = document.querySelector('.selected');

        if (selectedPiece) {
            const newRow = parseInt(cell.dataset.row);
            const newCol = parseInt(cell.dataset.col);

            if (isValidMove(selectedPiece, newRow, newCol) && !cellHasPiece(newRow, newCol)) {
                movePiece(selectedPiece, newRow, newCol);
                cell.appendChild(selectedPiece);
                selectedPiece.classList.remove('selected');
                currentPlayer = (currentPlayer === 'black') ? 'red' : 'black';
            }
        } else if (cell.children.length > 0 && cell.children[0].dataset.color === currentPlayer) {
            clearSelection();
            cell.children[0].classList.add('selected');
        }
    }

    function isValidMove(selectedPiece, newRow, newCol) {
        const currentRow = parseInt(selectedPiece.dataset.row);
        const currentCol = parseInt(selectedPiece.dataset.col);
        const color = selectedPiece.dataset.color;

        const rowDiff = Math.abs(newRow - currentRow);
        const colDiff = Math.abs(newCol - currentCol);

        if ((color === 'black' && newRow > currentRow) || (color === 'red' && newRow < currentRow)) {
            return rowDiff === 1 && colDiff === 1;
        }

        return false;
    }

    function movePiece(piece, newRow, newCol) {
        piece.dataset.row = newRow;
        piece.dataset.col = newCol;
    }

    function cellHasPiece(row, col) {
        return pieces.some(piece => piece.dataset.row == row && piece.dataset.col == col);
    }

    function clearSelection() {
        const selectedPiece = document.querySelector('.selected');
        if (selectedPiece) {
            selectedPiece.classList.remove('selected');
        }
    }
});