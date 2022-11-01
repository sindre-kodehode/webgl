import IndexBuffer from "./IndexBuffer";
import VertexArray from "./VertexArray";

export default class {
  gl : WebGL2RenderingContext;

  constructor( gl : WebGL2RenderingContext ) {
    this.gl = gl;
  }

  clear() {
    this.gl.clear( this.gl.COLOR_BUFFER_BIT );
  }

  draw( 
    vao : VertexArray,
    ibo : IndexBuffer
  ) {
    vao.bind();
    ibo.bind();

    const mode   : number = this.gl.TRIANGLES;
    const type   : number = this.gl.UNSIGNED_INT;
    const offset : number = 0;

    this.gl.drawElements( mode, ibo.count, type, offset);
  }
}
