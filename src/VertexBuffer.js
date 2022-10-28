export default class {
  constructor( gl, data ) {
    this.gl       = gl;
    this.renderId = gl.createBuffer();
    this.data     = data;

    this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.renderId );
    this.gl.bufferData( this.gl.ARRAY_BUFFER, this.data, this.gl.STATIC_DRAW );
  }

  bind()   {
    this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.renderId );
  }

  delete() {
    this.gl.deleteBuffer( this.renderId );
  }
}
