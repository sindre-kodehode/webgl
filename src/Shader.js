export default class {
  constructor( gl, vsSource, fsSource ) {
    this.gl       = gl;
    this.vsSource = vsSource;
    this.fsSource = fsSource;

    this.renderId = this.createShader();
    this.uniformLocations = new Map();
  }

  delete() {
    this.gl.deleteProgram( this.renderId );
  }

  bind() {
    this.gl.useProgram( this.renderId );
  }

  setUniform4f( name, v0, v1, v2, v3 ) {
    this.gl.uniform4fv(
      this.getUniformLocation( name ),
      new Float32Array([ v0, v1, v2, v3 ])
    );
  }

  setUniform1i( name, value ) {
    this.gl.uniform1i(
      this.getUniformLocation( name ),
      value
    );
  }

  getUniformLocation( name ) {
    if ( this.uniformLocations.has( name ) )
      return this.uniformLocations.get( name );

    const location = this.gl.getUniformLocation( this.renderId, name );

    if ( !location )
      console.warn( "[WARN] Uniform :", name, "not found"  );

    this.uniformLocations.set( name, location );
    return location;
  }

  createShader() {
    const program = this.gl.createProgram();

    const vs = this.compileShader( this.vsSource, this.gl.VERTEX_SHADER   );
    const fs = this.compileShader( this.fsSource, this.gl.FRAGMENT_SHADER );

    this.gl.attachShader( program, vs );
    this.gl.attachShader( program, fs );

    this.gl.linkProgram( program );
    this.gl.validateProgram( program )

    this.gl.deleteShader( vs );
    this.gl.deleteShader( fs );

    const success = this.gl.getProgramParameter(
      program,
      this.gl.LINK_STATUS
    );

    if ( success ) return program;

    const error = this.gl.getProgramInfoLog( program );
    console.error( error );

    this.delete();
  }

  compileShader( source, type ) {
    const shader = this.gl.createShader( type );

    this.gl.shaderSource( shader, source );
    this.gl.compileShader( shader );

    const success = this.gl.getShaderParameter(
      shader,
      this.gl.COMPILE_STATUS
    );

    if ( success ) return shader;

    const error = this.gl.getShaderInfoLog( shader );
    console.error( error );

    this.gl.deleteShader( shader );
  }
}
