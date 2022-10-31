export default class {
  constructor( gl, data ) {
    this.renderId = gl.createBuffer();
    this.data     = data;
    this.count    = this.data.length;

    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.renderId );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.data, gl.STATIC_DRAW );
  }

  bind( gl ) {
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.renderId );
  }

  delete( gl ) {
    gl.deleteBuffer( this.renderId );
  }
}
