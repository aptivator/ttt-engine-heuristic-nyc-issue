export default {
  isObjectLike(o) {
    return o !== null && typeof o === 'object';
  },
  
  isRegularObject(o) {
    if(!this.isObjectLike(o) || this.toString(o) !== '[object Object]') {
      return false;
    }
    
    if(Object.getPrototypeOf(o) === null) {
      return true;
    }
    
    for(var proto = o; Object.getPrototypeOf(proto) !== null;) {
      proto = Object.getPrototypeOf(proto);
    }
    
    return Object.getPrototypeOf(o) === proto;
  },
  
  pickRandom(arr) {
    let index = Math.floor(Math.random() * arr.length);
    return arr[index];
  },
  
  toString(value) {
    return Object.prototype.toString.call(value);
  }
};
