interface VertexBufferLayout {
  count      : number,
  type       : number,
  normalized : boolean,
  size       : number
}

export default class {
  gl       : WebGL2RenderingContext;
  elements : Array< VertexBufferLayout > = [];
  stride   : number = 0;

  constructor( gl : WebGL2RenderingContext ) {
    this.gl = gl;
  }

  pushFloat( count : number ) {
    const size : number = 4;

    this.elements.push({ 
      count      : count,
      type       : this.gl.FLOAT,
      normalized : false,
      size       : size
    });
    
    this.stride += size * count;
  }

  pushUint( count : number ) {
    const size : number = 4;

    this.elements.push({ 
      count      : count,
      type       : this.gl.UNSIGNED_INT,
      normalized : false,
      size       : size
    });

    this.stride += size * count;
  }
}
