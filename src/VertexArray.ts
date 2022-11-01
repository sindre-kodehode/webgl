import VertexBuffer       from "./VertexBuffer";
import VertexBufferLayout from "./VertexBufferLayout";

export default class {
  gl       : WebGL2RenderingContext;
  renderId : WebGLVertexArrayObject;

  constructor( gl : WebGL2RenderingContext ) {
    this.gl       = gl
    this.renderId = this.gl.createVertexArray() as WebGLVertexArrayObject;
  }

  bind() {
    this.gl.bindVertexArray( this.renderId );
  }

  delete() {
    this.gl.deleteVertexArray( this.renderId );
  }

  addBuffer( 
    vb      : VertexBuffer,
    layout  : VertexBufferLayout
  ) {
    this.bind();
    vb.bind();

    let offset : number = 0;

    layout.elements.forEach( ( element, index ) => {
      const { count, type, normalized } = element;
      const { stride }                  = layout;

      this.gl.enableVertexAttribArray( index );
      this.gl.vertexAttribPointer(
        index,
        count,
        type,
        normalized,
        stride,
        offset
      );

      offset += element.count * element.size;
    });
  }
}
