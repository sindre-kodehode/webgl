export default class {
  constructor( gl ) {
    this.gl = gl;
  }

  clear() {
    this.gl.clear( this.gl.COLOR_BUFFER_BIT );
  }

  draw( vao, ibo, shader ) {
    vao.bind();
    ibo.bind();

    const mode   = this.gl.TRIANGLES;
    const type   = this.gl.UNSIGNED_INT;
    const offset = 0;

    this.gl.drawElements( mode, ibo.count, type, offset);
  }
}
