export default {
  pickRandom(arr) {
    let index = Math.floor(Math.random() * arr.length);
    return arr[index];
  }
};
