import { mat4 } from "gl-matrix";

export default class {
  gl               : WebGL2RenderingContext;
  vsSource         : string;
  fsSource         : string;
  renderId         : WebGLProgram | null;
  uniformLocations : Map< string, WebGLUniformLocation > = new Map();

  constructor( 
    gl       : WebGL2RenderingContext,
    vsSource : string,
    fsSource : string
  ) {
    this.gl       = gl;
    this.vsSource = vsSource;
    this.fsSource = fsSource;

    this.renderId = this.createShader();
  }

  delete() {
    this.gl.deleteProgram( this.renderId );
  }

  bind() {
    this.gl.useProgram( this.renderId );
  }

  setUniform4f( 
    name : string,
    v0   : number,
    v1   : number,
    v2   : number,
    v3   : number
  ) {
    this.gl.uniform4fv(
      this.getUniformLocation( name ),
      new Float32Array([ v0, v1, v2, v3 ])
    );
  }

  setUniform2f( 
    name : string,
    v0   : number,
    v1   : number,
  ) {
    this.gl.uniform2fv(
      this.getUniformLocation( name ),
      new Float32Array([ v0, v1 ])
    );
  }

  setUniform1i( 
    name  : string,
    value : number
  ) {
    this.gl.uniform1i(
      this.getUniformLocation( name ),
      value
    );
  }

  setUniformMat4f(
    name   : string,
    matrix : mat4
  ) {
    this.gl.uniformMatrix4fv(
      this.getUniformLocation( name ),
      false,
      matrix
    );
  }

  getUniformLocation( name : string ) : WebGLUniformLocation | null {
    if ( !this.renderId ) return null;

    if ( this.uniformLocations.has( name ) )
      return this.uniformLocations.get( name ) ?? null;

    const location = this.gl.getUniformLocation(
      this.renderId,
      name
    ) as WebGLUniformLocation;

    if ( !location )
      console.warn( "[WARN] Uniform :", name, "not found"  );

    this.uniformLocations.set( name, location );
    return location;
  }

  createShader() : WebGLProgram | null {
    const program = this.gl.createProgram() as WebGLProgram;

    const vs = this.compileShader(
      this.vsSource,
      this.gl.VERTEX_SHADER
    ) as WebGLShader;

    const fs = this.compileShader(
      this.fsSource,
      this.gl.FRAGMENT_SHADER
    ) as WebGLShader;

    this.gl.attachShader( program, vs );
    this.gl.attachShader( program, fs );

    this.gl.linkProgram( program );
    this.gl.validateProgram( program );

    this.gl.deleteShader( vs );
    this.gl.deleteShader( fs );

    const success : boolean = this.gl.getProgramParameter(
      program,
      this.gl.LINK_STATUS
    );

    if ( success ) return program;

    const error : string = this.gl.getProgramInfoLog( program ) ?? "";
    console.error( error );

    this.delete();

    return null;
  }

  compileShader( 
    source : string,
    type   : number
  ) : WebGLShader | null {
    const shader = this.gl.createShader( type ) as WebGLShader;

    this.gl.shaderSource( shader, source );
    this.gl.compileShader( shader );

    const success : boolean = this.gl.getShaderParameter(
      shader,
      this.gl.COMPILE_STATUS
    );

    if ( success ) return shader;

    const error : string = this.gl.getShaderInfoLog( shader ) ?? "";
    console.error( error );

    this.gl.deleteShader( shader );

    return null;
  }
}
