export default class {
  constructor( gl ) {
    this.gl       = gl;
    this.renderId = this.gl.createVertexArray();
  }

  bind() {
    this.gl.bindVertexArray( this.renderId );
  }

  delete() {
    this.gl.deleteVertexArray( this.renderId );
  }

  addBuffer( vb, layout ) {
    this.bind();
    vb.bind();

    let offset = 0;

    layout.elements.forEach( ( element, i ) => {
      this.gl.enableVertexAttribArray( i );
      this.gl.vertexAttribPointer(
        i,
        element.count,
        element.type,
        element.normalized,
        layout.elements.stride,
        offset
      );

      offset += element.count * element.size;
    });
  }
}
