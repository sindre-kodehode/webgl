export default class {
  constructor( gl, vs, fs ) {
    this.gl        = gl;
    this.programId = this.gl.createProgram();

    this.gl.attachShader( this.programId, vs.shaderId );
    this.gl.attachShader( this.programId, fs.shaderId );
    this.gl.linkProgram(  this.programId );

    const success = this.gl.getProgramParameter(
      this.programId,
      this.gl.LINK_STATUS
    );

    if ( success ) {
      this.gl.useProgram( this.programId );
      return;
    }

    console.error( gl.getProgramInfoLog( program ) );
    this.delete();
  }

  delete() {
    this.gl.deleteProgram( this.programId );
  }
}
