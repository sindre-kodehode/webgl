export default class {
  constructor( gl, data ) {
    this.renderId = gl.createBuffer();
    this.data     = data;

    gl.bindBuffer( gl.ARRAY_BUFFER, this.renderId );
    gl.bufferData( gl.ARRAY_BUFFER, this.data, gl.STATIC_DRAW );
  }

  bind( gl ) {
    gl.bindBuffer( gl.ARRAY_BUFFER, this.renderId );
  }

  delete( gl ) {
    gl.deleteBuffer( this.renderId );
  }
}
