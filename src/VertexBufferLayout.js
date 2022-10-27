export default class {
  constructor( gl ) {
    this.gl = gl;
    this.elements = [];
    this.stride   = 0;
  }

  pushFloat( count ) {
    this.elements.push({ 
      count      : count,
      type       : this.gl.FLOAT,
      normalized : false,
      size       : 4
    })
    
    this.stride += 4;
  }

  pushUint( count ) {
    this.elements.push({ 
      count      : count,
      type       : this.gl.UNSIGNED_INT,
      normalized : false,
      size       : 4
    })

    this.stride += 4;
  }
}
