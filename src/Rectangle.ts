// *** default imports *** //
import IndexBuffer        from "./IndexBuffer";
import Shader             from "./Shader";
import VertexArray        from "./VertexArray";
import VertexBuffer       from "./VertexBuffer";
import VertexBufferLayout from "./VertexBufferLayout";

// *** named imports *** //
import { mat3, vec2 }     from "gl-matrix";

const vsSource =
`#version 300 es

uniform vec2 u_Resolution;
uniform mat3 u_Matrix;

in vec2 a_Position;

void main() {
  vec2 position  = ( u_Matrix * vec3( a_Position, 1 ) ).xy;

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
  position    : vec2;
  program     : Shader;
  rotation    : number;
  scale       : vec2;
  vao         : VertexArray;
  vbo         : VertexBuffer;

  constructor( gl : WebGL2RenderingContext ) {
    this.gl       = gl;
    this.position = vec2.fromValues( 0, 0 );
    this.rotation = 0.0;
    this.scale    = vec2.fromValues( 100, 100 );

    // *** buffer data *** //
    this.positions = new Float32Array([
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0
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
    this.program.setUniform4f(
      "u_Color",
      Math.random(),
      Math.random(),
      Math.random(),
      1
    );

    const translation = mat3.create();
    mat3.translate( translation, translation, this.position );
    mat3.rotate( translation, translation, this.rotation * Math.PI / 180 );
    mat3.scale( translation, translation, this.scale );

    this.program.setUniformMat3f( "u_Matrix", translation );
  }

  update( dt : number ) { return dt }

  draw() {
    this.vao.bind();
    this.ibo.bind();

    this.program.bind();
    this.program.setUniform2f(
      "u_Resolution", this.gl.canvas.width, this.gl.canvas.height
    );

    const translation = mat3.create();
    mat3.translate( translation, translation, this.position );
    mat3.rotate( translation, translation, this.rotation * Math.PI / 180 );
    mat3.scale( translation, translation, this.scale );

    this.program.setUniformMat3f( "u_Matrix", translation );

    this.gl.drawElements( 
      this.gl.TRIANGLES, this.ibo.count, this.gl.UNSIGNED_INT, 0
    );
  }
}
