export class Shader {
  constructor( gl, type, source ) {
    this.gl     = gl;
    this.type   = type;
    this.source = source;
  }

  compile() {
    this.shader = this.gl.createShader( this.type );

    this.gl.shaderSource( this.shader, this.source );
    this.gl.compileShader( this.shader );

    const success = this.gl.getShaderParameter(
      this.shader,
      this.gl.COMPILE_STATUS
    );

    if ( success ) return this.shader;

    const error = this.gl.getShaderInfoLog( this.shader );
    console.error( error );

    this.gl.deleteShader( this.shader );
  }
}

export class VertexShader extends Shader {
  constructor( gl, source ) {
    super( gl, gl.VERTEX_SHADER, source );
  }
}

export class FragmentShader extends Shader {
  constructor( gl, source ) {
    super( gl, gl.FRAGMENT_SHADER, source );
  }
}
