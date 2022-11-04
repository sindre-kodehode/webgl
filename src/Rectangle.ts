// *** default imports *** //
import IndexBuffer        from "./IndexBuffer";
import Shader             from "./Shader";
import VertexArray        from "./VertexArray";
import VertexBuffer       from "./VertexBuffer";
import VertexBufferLayout from "./VertexBufferLayout";

// *** named imports *** //
import { vec2 }           from "gl-matrix";

const vsSource =
`#version 300 es

uniform vec2 u_Resolution;
uniform vec2 u_Translation;

in vec2 a_Position;

void main() {
  vec2 position  = a_Position + u_Translation;
  vec2 zeroToOne = position / u_Resolution;
  vec2 zeroToTwo = zeroToOne * 2.0;
  vec2 clipSpace = zeroToTwo - 1.0;

  gl_Position = vec4( clipSpace * vec2( 1, -1 ), 0, 1 );
}`;

const fsSource =
`#version 300 es

precision highp float;

uniform vec4 u_Color;

out vec4 outColor;

void main() {
  outColor = u_Color;
}`;

export default class {
  gl          : WebGL2RenderingContext;
  ibo         : IndexBuffer;
  indices     : Uint32Array;
  layout      : VertexBufferLayout;
  positions   : Float32Array;
  program     : Shader;
  vao         : VertexArray;
  vbo         : VertexBuffer;
  x           : number;
  y           : number;

  color       : [ number, number, number, number ] = [
    Math.random(), Math.random(), Math.random(), 1
  ];
  height      : number = 100;
  translation : vec2   = vec2.fromValues( 0, 0 );
  width       : number = 100;

  constructor( gl : WebGL2RenderingContext, x : number, y : number ) {
    this.gl = gl;
    this.x  = x;
    this.y  = y;

    // *** buffer data *** //
    this.positions = new Float32Array([
             0.0,         0.0,
      this.width,         0.0,
      this.width, this.height,
             0.0, this.height
    ]);

    // *** index buffer data *** //
    this.indices = new Uint32Array([
      0, 1, 2,
      2, 3, 0,
    ]);

    // *** set buffer layout *** //
    this.layout = new VertexBufferLayout( this.gl );
    this.layout.pushFloat( 2 );

    // *** create buffers *** //
    this.vao = new VertexArray( this.gl );
    this.vbo = new VertexBuffer( this.gl, this.positions );
    this.ibo = new IndexBuffer( this.gl, this.indices );
    this.vao.bind();
    this.vao.addBuffer( this.vbo, this.layout );

    // *** compile shaders and create program *** //
    this.program = new Shader( this.gl, vsSource, fsSource );
    this.program.bind();
    this.program.setUniform4f( "u_Color", ...this.color );
    this.program.setUniform2f( "u_Translation", this.x, this.y );
  }

  update( dt : number ) {
    this.x += ( dt * 0.1 );
    if ( this.x > this.gl.canvas.width ) this.x = 0.0 - this.width;
  }

  draw() {
    this.vao.bind();
    this.ibo.bind();

    this.program.bind();
    this.program.setUniform2f(
      "u_Resolution", this.gl.canvas.width, this.gl.canvas.height
    );
    this.program.setUniform2f(
      "u_Translation", this.x, this.y
    );

    this.gl.drawElements( 
      this.gl.TRIANGLES, this.ibo.count, this.gl.UNSIGNED_INT, 0
    );
  }
}
