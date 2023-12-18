document.addEventListener('DOMContentLoaded', () => {
    // Pobranie referencji do planszy
    const board = document.getElementById('board');

    // Tablica przechowująca pionki na planszy
    const pieces = [];

    // Zmienna przechowująca aktualnego gracza ('black' lub 'red')
    let currentPlayer = 'black';

    // Tworzenie planszy o wymiarach 8x8
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            // Tworzenie komórki planszy
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;

            // Nadawanie klas komórkom w zależności od koloru
            if ((row + col) % 2 === 0) {
                cell.classList.add('light');
            } else {
                cell.classList.add('dark');
            }

            // Umieszczanie pionków na planszy w odpowiednich komórkach
            if ((row + col) % 2 !== 0 && row < 3) {
                const piece = createPiece('black', row, col);
                pieces.push(piece);
                cell.appendChild(piece);
            } else if ((row + col) % 2 !== 0 && row > 4) {
                const piece = createPiece('red', row, col);
                pieces.push(piece);
                cell.appendChild(piece);
            }

            // Dodawanie obsługi zdarzenia kliknięcia do komórek
            cell.addEventListener('click', () => handleCellClick(cell));
            board.appendChild(cell);
        }
    }

    // Tworzenie pionka o określonym kolorze i pozycji
    function createPiece(color, row, col) {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        piece.classList.add(color);
        piece.dataset.row = row;
        piece.dataset.col = col;
        piece.dataset.color = color;
        return piece;
    }

    // Obsługa kliknięcia w komórkę
    function handleCellClick(cell) {
        const selectedPiece = document.querySelector('.selected');

        // Jeśli istnieje zaznaczony pionek
        if (selectedPiece) {
            const newRow = parseInt(cell.dataset.row);
            const newCol = parseInt(cell.dataset.col);

            // Sprawdzenie poprawności ruchu i wykonanie go
            if (isValidMove(selectedPiece, newRow, newCol) && !cellHasPiece(newRow, newCol)) {
                movePiece(selectedPiece, newRow, newCol);
                cell.appendChild(selectedPiece);
                selectedPiece.classList.remove('selected');

                // Sprawdzenie czy pionek stał się damką
                checkForKing(selectedPiece, newRow);

                // Zmiana gracza po udanym ruchu
                currentPlayer = (currentPlayer === 'black') ? 'red' : 'black';
            }
        }
        // Jeśli komórka ma pionek o właściwym kolorze, zaznacz go
        else if (cell.children.length > 0 && cell.children[0].dataset.color === currentPlayer) {
            clearSelection();
            cell.children[0].classList.add('selected');
        }
    }

    // Sprawdzenie poprawności ruchu
    function isValidMove(selectedPiece, newRow, newCol) {
        const currentRow = parseInt(selectedPiece.dataset.row);
        const currentCol = parseInt(selectedPiece.dataset.col);
        const color = selectedPiece.dataset.color;

        const rowDiff = Math.abs(newRow - currentRow);
        const colDiff = Math.abs(newCol - currentCol);

        // Sprawdzenie kierunku ruchu w zależności od koloru pionka
        if ((color === 'black' && newRow > currentRow) || (color === 'red' && newRow < currentRow)) {
            return rowDiff === 1 && colDiff === 1;
        }

        return false;
    }

    // Przesunięcie pionka na nową pozycję
    function movePiece(piece, newRow, newCol) {
        piece.dataset.row = newRow;
        piece.dataset.col = newCol;
    }

    // Sprawdzenie, czy pionek stał się damką
    function checkForKing(piece, newRow) {
        const color = piece.dataset.color;

        // Jeśli pionek dotarł do ostatniego rzędu przeciwnego terytorium
        if ((color === 'black' && newRow === 7) || (color === 'red' && newRow === 0)) {
            piece.classList.add('king');
        }
    }

    // Sprawdzenie, czy w danej komórce znajduje się pionek
    function cellHasPiece(row, col) {
        return pieces.some(piece => piece.dataset.row == row && piece.dataset.col == col);
    }

    // Usunięcie zaznaczenia z pionka
    function clearSelection() {
        const selectedPiece = document.querySelector('.selected');
        if (selectedPiece) {
            selectedPiece.classList.remove('selected');
        }
    }
});
