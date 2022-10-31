export default class {
  constructor( gl ) {
    this.renderId = gl.createVertexArray();
  }

  bind( gl ) {
    gl.bindVertexArray( this.renderId );
  }

  delete( gl ) {
    gl.deleteVertexArray( this.renderId );
  }

  addBuffer( gl, vb, layout ) {
    this.bind( gl );
    vb.bind( gl );

    let offset = 0;

    layout.elements.forEach( ( element, i ) => {
      gl.enableVertexAttribArray( i );
      gl.vertexAttribPointer(
        i,
        element.count,
        element.type,
        element.normalized,
        layout.stride,
        offset
      );

      offset += element.count * element.size;
    });
  }
}
