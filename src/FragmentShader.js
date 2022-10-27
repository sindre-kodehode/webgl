export default class {
  constructor( gl, source ) {
    this.gl     = gl;
    this.type   = this.gl.FRAGMENT_SHADER;
    this.source = source;

    this.shaderId = this.gl.createShader( this.type );

    this.gl.shaderSource( this.shaderId, this.source );
    this.gl.compileShader( this.shaderId );

    const success = this.gl.getShaderParameter(
      this.shaderId,
      this.gl.COMPILE_STATUS
    );

    if ( success ) return;

    const error = this.gl.getShaderInfoLog( this.shaderId );
    console.error( error );

    this.gl.deleteShader( this.shaderId );
  }
}
