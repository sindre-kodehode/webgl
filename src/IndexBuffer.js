export default class {
  constructor( gl, data ) {
    this.gl       = gl;
    this.renderId = gl.createBuffer();
    this.data     = data;
    this.count    = this.data.length;

    this.gl.bindBuffer( this.gl.ELEMENT_ARRAY_BUFFER, this.renderId );
    this.gl.bufferData( this.gl.ELEMENT_ARRAY_BUFFER, this.data, this.gl.STATIC_DRAW );
  }

  bind()   {
    this.gl.bindBuffer( this.gl.ELEMENT_ARRAY_BUFFER, this.renderId );
  }

  unbind() {
    this.gl.bindBuffer( this.gl.ELEMENT_ARRAY_BUFFER, 0 );
  }

  delete() {
    this.gl.deleteBuffer( this.renderId );
  }
}
