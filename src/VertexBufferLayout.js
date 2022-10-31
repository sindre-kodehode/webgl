export default class {
  constructor() {
    this.elements = [];
    this.stride   = 0;
  }

  pushFloat( gl, count ) {
    this.elements.push({ 
      count      : count,
      type       : gl.FLOAT,
      normalized : false,
      size       : 4
    })
    
    this.stride += 4 * count;
  }

  pushUint( gl, count ) {
    this.elements.push({ 
      count      : count,
      type       : gl.UNSIGNED_INT,
      normalized : false,
      size       : 4
    })

    this.stride += 4 * count;
  }
}
