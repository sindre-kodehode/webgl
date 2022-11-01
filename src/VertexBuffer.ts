export default class {
  gl       : WebGL2RenderingContext;
  data     : Float32Array;
  renderId : WebGLBuffer;

  constructor( 
    gl   : WebGL2RenderingContext,
    data : Float32Array
  ) {
    this.gl   = gl;
    this.data = data;

    this.renderId = gl.createBuffer() as WebGLBuffer;

    this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.renderId );
    this.gl.bufferData( this.gl.ARRAY_BUFFER, this.data, this.gl.STATIC_DRAW );
  }

  bind() {
    this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.renderId );
  }

  delete() {
    this.gl.deleteBuffer( this.renderId );
  }
}
