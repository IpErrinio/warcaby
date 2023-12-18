document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const pieces = [];
    let currentPlayer = 'black';
    let selectedPiece = null;

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

            cell.addEventListener('mousedown', (event) => handleCellClick(event, cell));
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

    function handleCellClick(event, cell) {
        const clickedRow = parseInt(cell.dataset.row);
        const clickedCol = parseInt(cell.dataset.col);

        if (selectedPiece) {
            const selectedRow = parseInt(selectedPiece.dataset.row);
            const selectedCol = parseInt(selectedPiece.dataset.col);

            if (isValidMove(selectedRow, selectedCol, clickedRow, clickedCol) && !cellHasPiece(clickedRow, clickedCol)) {
                movePiece(selectedPiece, clickedRow, clickedCol);
                cell.innerHTML = ''; // Usunięcie poprzedniego pionka z komórki
                cell.appendChild(selectedPiece); // Dodanie nowego pionka do komórki
                currentPlayer = (currentPlayer === 'black') ? 'red' : 'black';
                clearSelection();
                selectPieceWithMoves();
            } else if (cell.children.length > 0 && cell.children[0].dataset.color === currentPlayer) {
                clearSelection();
                selectedPiece = cell.children[0];
                selectedPiece.classList.add('selected');
            } else {
                clearSelection();
                selectPieceWithMoves();
            }
        } else if (cell.children.length > 0 && cell.children[0].dataset.color === currentPlayer) {
            selectedPiece = cell.children[0];
            selectedPiece.classList.add('selected');
        }

        event.preventDefault(); // Zapobiega zaznaczaniu tekstu po kliknięciu
    }

    function isValidMove(selectedRow, selectedCol, newRow, newCol) {
        if (!selectedPiece || !selectedPiece.dataset) {
            return false;
        }

        const color = selectedPiece.dataset.color;
        const rowDiff = Math.abs(newRow - selectedRow);
        const colDiff = Math.abs(newCol - selectedCol);

        if ((color === 'black' && newRow > selectedRow) || (color === 'red' && newRow < selectedRow)) {
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
        if (selectedPiece) {
            selectedPiece.classList.remove('selected');
        }
    }

    function isValidPiece(piece) {
        return piece && piece.dataset && piece.dataset.color === currentPlayer;
    }

    function selectPieceWithMoves() {
        selectedPiece = null;

        for (const piece of pieces) {
            const row = parseInt(piece.dataset.row);
            const col = parseInt(piece.dataset.col);

            if (isValidPiece(piece) && (isValidMove(row, col, row + 1, col - 1) || isValidMove(row, col, row + 1, col + 1))) {
                selectedPiece = piece;
                selectedPiece.classList.add('selected');
                break;
            }
        }
    }

    selectPieceWithMoves();
});
