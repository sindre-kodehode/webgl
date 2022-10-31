export default class {
  constructor( gl, vsSource, fsSource ) {
    this.vsSource = vsSource;
    this.fsSource = fsSource;

    this.renderId = this.createShader( gl );
    this.uniformLocations = new Map();
  }

  delete( gl ) {
    gl.deleteProgram( this.renderId );
  }

  bind( gl ) {
    gl.useProgram( this.renderId );
  }

  setUniform4f( gl, name, v0, v1, v2, v3 ) {
    gl.uniform4fv(
      this.getUniformLocation( name ),
      new Float32Array([ v0, v1, v2, v3 ])
    );
  }

  setUniform1i( gl, name, value ) {
    gl.uniform1i(
      this.getUniformLocation( gl, name ),
      value
    );
  }

  getUniformLocation( gl, name ) {
    if ( this.uniformLocations.has( name ) )
      return this.uniformLocations.get( name );

    const location = gl.getUniformLocation( this.renderId, name );

    if ( !location )
      console.warn( "[WARN] Uniform :", name, "not found"  );

    this.uniformLocations.set( name, location );
    return location;
  }

  createShader( gl ) {
    const program = gl.createProgram();

    const vs = this.compileShader( gl, this.vsSource, gl.VERTEX_SHADER   );
    const fs = this.compileShader( gl, this.fsSource, gl.FRAGMENT_SHADER );

    gl.attachShader( program, vs );
    gl.attachShader( program, fs );

    gl.linkProgram( program );
    gl.validateProgram( program )

    gl.deleteShader( vs );
    gl.deleteShader( fs );

    const success = gl.getProgramParameter( program, gl.LINK_STATUS );

    if ( success ) return program;

    const error = gl.getProgramInfoLog( program );
    console.error( error );

    this.delete();
  }

  compileShader( gl, source, type ) {
    const shader = gl.createShader( type );

    gl.shaderSource( shader, source );
    gl.compileShader( shader );

    const success = gl.getShaderParameter( shader, gl.COMPILE_STATUS );

    if ( success ) return shader;

    const error = gl.getShaderInfoLog( shader );
    console.error( error );

    gl.deleteShader( shader );
  }
}
