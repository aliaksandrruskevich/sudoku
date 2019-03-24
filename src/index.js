
module.exports = function solveSudoku(matrix) {
  /**
* Решение судоку
*
* Метод в цикле пытается решить судоку, если на текущем этапе не изменилось
* ни одного элемента, то решение прекращается.
*/
function solve() {
var changed = 0;
do {
// сужаем множество значений для всех нерешенных чисел
changed = updateSuggests();
steps++;
if ( 81 < steps ) {
// Зашита от цикла
break;
}
} while (changed);
}; // end of method solve()

/**
* Обновляем множество предположений
*
* Проверяем основные правила -- уникальность в строке, столбце и секции.
*/
function updateSuggests() {
var changed = 0;
var buf = arrayDiff(solved[1][3][2], rowContent(1));
buf = arrayDiff(buf, colContent(3));
buf = arrayDiff(buf, sectContent(1, 3));
for ( var i=0; i<9; i++) {
for ( var j=0; j<9; j++) {
if ( 'unknown' != solved[i][j][1] ) {
  // Здесь решение либо найдено, либо задано
  continue;
}
// "Одиночка"
changed += solveSingle(i, j);
// "Скрытый одиночка"
changed += solveHiddenSingle(i, j);
}
}
return changed;
}; // end of method updateSuggests()
  /**
* Метод "Одиночка"
*/
function solveSingle(i, j) {
solved[i][j][2] = arrayDiff(solved[i][j][2], rowContent(i));
solved[i][j][2] = arrayDiff(solved[i][j][2], colContent(j));
solved[i][j][2] = arrayDiff(solved[i][j][2], sectContent(i, j));
if ( 1 == solved[i][j][2].length ) {
// Исключили все варианты кроме одного
markSolved(i, j, solved[i][j][2][0]);
return 1;
}
return 0;
}; // end of method solveSingle()
  /**
* Метод "Скрытый одиночка"
*/
function solveHiddenSingle(i, j) {
var less_suggest = lessRowSuggest(i, j);
var changed = 0;
if ( 1 == less_suggest.length ) {
markSolved(i, j, less_suggest[0]);
changed++;
}
var less_suggest = lessColSuggest(i, j);
if ( 1 == less_suggest.length ) {
markSolved(i, j, less_suggest[0]);
changed++;
}
var less_suggest = lessSectSuggest(i, j);
if ( 1 == less_suggest.length ) {
markSolved(i, j, less_suggest[0]);
changed++;
}
return changed;
}; // end of method solveHiddenSingle()

/**
* Минимизированное множество предположений по строке
*/
function lessRowSuggest(i, j) {
var less_suggest = solved[i][j][2];
for ( var k=0; k<9; k++ ) {
if ( k == j || 'unknown' != solved[i][k][1] ) {
continue;
}
less_suggest = arrayDiff(less_suggest, solved[i][k][2]);
}
return less_suggest;
}; // end of method lessRowSuggest()

/**
* Минимизированное множество предположений по столбцу
*/
function lessColSuggest(i, j) {
var less_suggest = solved[i][j][2];
for ( var k=0; k<9; k++ ) {
if ( k == i || 'unknown' != solved[k][j][1] ) {
continue;
}
less_suggest = arrayDiff(less_suggest, solved[k][j][2]);
}
return less_suggest;
}; // end of method lessColSuggest()

/**
* Минимизированное множество предположений по секции
*/
function lessSectSuggest(i, j) {
var less_suggest = solved[i][j][2];
var offset = sectOffset(i, j);
for ( var k=0; k<3; k++ ) {
for ( var l=0; l<3; l++ ) {
if ( ((offset.i+k) == i && (offset.j+l) == j)|| 'unknown' != solved[offset.i+k][offset.j+l][1] ) {
  continue;
}
less_suggest = arrayDiff(less_suggest, solved[offset.i+k][offset.j+l][2]);
}
}
return less_suggest;
};
 // end of method lessSectSuggest()
  var in_val =([
    [ 5 , 3 , 4 , 6 , 7 , 8 , 9 , 0 , 0 ],
    [ 6 , 7 , 2 , 1 , 9 , 5 , 3 , 4 , 8 ],
    [ 1 , 9 , 8 , 3 , 4 , 2 , 5 , 6 , 7 ],
    [ 8 , 5 , 9 , 7 , 6 , 1 , 4 , 2 , 3 ],
    [ 4 , 2 , 6 , 8 , 5 , 3 , 7 , 9 , 1 ],
    [ 7 , 1 , 3 , 9 , 2 , 4 , 8 , 5 , 6 ],
    [ 9 , 6 , 1 , 5 , 3 , 7 , 2 , 8 , 4 ],
    [ 2 , 8 , 7 , 4 , 1 , 9 , 6 , 3 , 5 ],
    [ 3 , 4 , 5 , 2 , 8 , 6 , 1 , 7 , 9 ]
  ]);
 
var sudoku = new Sudoku(in_val);
document.write(sudoku.html());
}
