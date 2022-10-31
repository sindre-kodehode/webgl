export default class {
  constructor() { }

  clear( gl ) {
    gl.clear( gl.COLOR_BUFFER_BIT );
  }

  draw( gl, vao, ibo, shader ) {
    vao.bind( gl );
    ibo.bind( gl );

    const mode   = gl.TRIANGLES;
    const type   = gl.UNSIGNED_INT;
    const offset = 0;

    gl.drawElements( mode, ibo.count, type, offset);
  }
}
