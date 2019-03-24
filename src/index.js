module.exports = function solveSudoku(matrix) {
  // your solution
  let unassigned_location;
  if (unassigned_locations(matrix) == 0) {
    //if there is no unassigned locations than it's done
    return matrix;
  }
  else {
    unassigned_location = unassigned_locations(matrix);
  }
  let row = unassigned_location[0];
  let col = unassigned_location[1];

  for (let num = 1; num < 10; num++) {
    if (is_safe(matrix, row, col, num)) {
      matrix[row][col] = num;
      if (solveSudoku(matrix)) {
        return matrix;
      }
      matrix[row][col] = 0; // if you didn't suceed with lowest possible number
      //it assigns cells value to 0 so it will try with number higher
    }
  }
}
//checks if num is used in a row
function used_in_row(matrix, num_of_row, num) {
  if (matrix[num_of_row].indexOf(num) == -1) {
    return false;
  }
  else {
    return true;
  }
}
//checks if num is used in a column
function used_in_column(matrix, num_of_column, num) {
  for (let row = 0; row < 9; row++) {
    if (num == matrix[row][num_of_column]) {
      return true;
    }
  }
  return false;
}
//checks if num is used in a box 3x3
function used_in_box(matrix, box_start_row, box_start_col, num) {
  for (let row = 0 + box_start_row; row < 3 + box_start_row; row++) {
    for (let col = 0 + box_start_col; col < 3 + box_start_col; col++) {
      if (matrix[row][col] == num) {
        return true;
      }
    }
  }
  return false;
}
//checks is it safe to place given number in given position
function is_safe(matrix, num_of_row, num_of_column, num) {
  return !used_in_row(matrix, num_of_row, num)
    && !used_in_column(matrix, num_of_column, num)
    && !used_in_box(matrix, num_of_row - num_of_row % 3, num_of_column - num_of_column % 3, num);
}
//finds unassigned location
function unassigned_locations(matrix) {
  //let array_of_unassigned_locations = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (matrix[row][col] == 0) {
        return [row, col];
        //array_of_unassigned_locations.push([row, col]);

      }
    }
  }
  return 0;
}
