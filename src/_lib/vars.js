export const CENTER = 4;

export const moves = {
  corners: [0, 2, 6, 8],
  sides: [1, 3, 5, 7],
  center: [CENTER]
};

export const opponent = {
  'x': 'o',
  'o': 'x'
};

export const oppositeCorners = {
  0: 8,
  2: 6, 
  6: 2,
  8: 0
};

export const wins = [
  {cells: [0, 1, 2], sideWin: true}, 
  {cells: [0, 3, 6], sideWin: true},
  {cells: [0, 4, 8]}, 
  {cells: [1, 4, 7]},
  {cells: [2, 5, 8], sideWin: true}, 
  {cells: [2, 4, 6]}, 
  {cells: [3, 4, 5]}, 
  {cells: [6, 7, 8], sideWin: true}
];
