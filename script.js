// Fungsi Untuk Menghitung Matriks Minor 
function calculateMinor() {
    var matrixInput = document.getElementById('matrix').value;
    var matrix = parseMatrix(matrixInput);

    if (matrix) {
        var minorMatrix = getMinor(matrix);
        displayMatrixResult(minorMatrix);
    } else {
        displayErrorMessage('Format matriks tidak valid.');
    }
}

// Fungsi Untuk Menghitung Matriks Kofaktor
function calculateCofactor() {
    var matrixInput = document.getElementById('matrix').value;
    var matrix = parseMatrix(matrixInput);

    if (matrix) {
        var cofactorMatrix = getCofactor(matrix);
        displayMatrixResult(cofactorMatrix);
    } else {
        displayErrorMessage('Format matriks tidak valid.');
    }
}

// Fungsi Untuk Menghitung Invers Matriks
function calculateInverse() {
    var matrixInput = document.getElementById('matrix').value;
    var matrix = parseMatrix(matrixInput);

    if (matrix) {
        var inverseMatrix = getInverse(matrix);

        if (inverseMatrix) {
            displayMatrixResult(inverseMatrix);
        } else {
            displayErrorMessage('Matriks tidak memiliki invers.');
        }
    } else {
        displayErrorMessage('Format matriks tidak valid.');
    }
}

// Fungsi Untuk Mengurai Inputan Matriks Menjadi Bentuk Matriks 2D
function parseMatrix(matrixInput) {
    var rows = matrixInput.trim().split('\n');
    var matrix = [];

    for (var i = 0; i < rows.length; i++) {
        var row = rows[i].trim().split(' ');

        if (row.length === 1) {
            matrix.push(parseFloat(row[0])); 
        } else {
            matrix.push(row.map(parseFloat)); // Mengubah string menjadi angka
        }
    }

    return matrix;
}


// Fungsi Untuk Menghitung Matriks Minor
function getMinor(matrix) {
    var minorMatrix = [];
    var n = matrix.length;

    for (var i = 0; i < n; i++) {
        minorMatrix[i] = [];

        for (var j = 0; j < n; j++) {
            minorMatrix[i][j] = determinant(subMatrix(matrix, i, j));
        }
    }

    return minorMatrix;
}

// Fungsi Untuk Menghitung Matriks Kofaktor
function getCofactor(matrix) {
    var cofactorMatrix = [];
    var n = matrix.length;

    for (var i = 0; i < n; i++) {
        cofactorMatrix[i] = [];

        for (var j = 0; j < n; j++) {
            cofactorMatrix[i][j] = determinant(subMatrix(matrix, i, j)) * Math.pow(-1, i + j);
        }
    }

    return cofactorMatrix;
}

// Fungsi Untuk Menghitung Invers Matriks
function getInverse(matrix) {
    var determinantValue = determinant(matrix);

    if (determinantValue === 0) {
        return null;
    }

    var n = matrix.length;
    var adjugateMatrix = getCofactor(matrix);
    var inverseMatrix = [];

    for (var i = 0; i < n; i++) {
        inverseMatrix[i] = [];

        for (var j = 0; j < n; j++) {
            inverseMatrix[i][j] = adjugateMatrix[j][i] / determinantValue;
        }
    }

    return inverseMatrix;
}

// Fungsi Untuk Menghitung Determinan Matriks
function determinant(matrix) {
    var det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    return det;
}


// Fungsi Untuk Menghasilkan Matriks Sub
function subMatrix(matrix, row, col) {
    var subMatrix = [];
    var n = matrix.length;

    for (var i = 0; i < n; i++) {
        if (i !== row) {
            subMatrix.push(matrix[i].slice(0, col).concat(matrix[i].slice(col + 1)));
        }
    }

    return subMatrix;
}

// Fungsi Untuk Menampilkan Hasil Perhitungan Matriks
function displayMatrixResult(matrix) {
    var resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = '';

    var table = document.createElement('table');

    for (var i = 0; i < matrix.length; i++) {
        var row = document.createElement('tr');

        for (var j = 0; j < matrix[i].length; j++) {
            var cell = document.createElement('td');
            cell.textContent = matrix[i][j];
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    resultContainer.appendChild(table);
}

// Fungsi Untuk Menampilkan Pesan Kesalahan
function displayErrorMessage(message) {
    var resultContainer = document.getElementById('result-container');
    resultContainer.textContent = message;
}
