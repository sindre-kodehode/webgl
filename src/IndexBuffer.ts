export default class {
  gl       : WebGL2RenderingContext;
  data     : Uint32Array;
  count    : number;
  renderId : WebGLBuffer;

  constructor( 
    gl   : WebGL2RenderingContext,
    data : Uint32Array
  ) {
    this.gl       = gl;
    this.data     = data;
    this.count    = this.data.length;
    this.renderId = this.gl.createBuffer() as WebGLBuffer;

    this.gl.bindBuffer( this.gl.ELEMENT_ARRAY_BUFFER, this.renderId );
    this.gl.bufferData( this.gl.ELEMENT_ARRAY_BUFFER, this.data, this.gl.STATIC_DRAW );
  }

  bind() {
    this.gl.bindBuffer( this.gl.ELEMENT_ARRAY_BUFFER, this.renderId );
  }

  delete() {
    this.gl.deleteBuffer( this.renderId );
  }
}
