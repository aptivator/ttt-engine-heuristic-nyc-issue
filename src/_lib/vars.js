export const wins = [
  [0, 1, 2], 
  [0, 3, 6], 
  [0, 4, 8], 
  [1, 4, 7], 
  [2, 5, 8], 
  [2, 4, 6], 
  [3, 4, 5], 
  [6, 7, 8]
];

wins.side = [0, 1, 4, 7];

export const CENTER = 4;

export const opponent = {
  'x': 'o',
  'o': 'x'
};

export const moves = {
  corners: [0, 2, 6, 8],
  sides: [1, 3, 5, 7],
  center: [CENTER]
};

export const oppositeCorners = {
  0: 8,
  2: 6, 
  6: 2,
  8: 0
};
