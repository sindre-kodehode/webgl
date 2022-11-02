import                         "./css/style.css";
import leaves             from "./res/leaves.jpg";

import fsSource           from "./FragmentShaderSource";
import vsSource           from "./VertexShaderSource";

import IndexBuffer        from "./IndexBuffer";
import Renderer           from "./Renderer";
import Shader             from "./Shader";
import Texture            from "./Texture";
import VertexArray        from "./VertexArray";
import VertexBuffer       from "./VertexBuffer";
import VertexBufferLayout from "./VertexBufferLayout";

import { mat4, vec3 }     from "gl-matrix";

const main = () => {
  const canvas = document.querySelector( "canvas" ) as HTMLCanvasElement;
  const gl     = canvas.getContext( "webgl2" );

  if ( !gl ) {
    console.error( "Unable to Initialize WebGL" )
    return;
  }

  // *** buffer data *** //
  const positions = new Float32Array([
       0.0,   0.0,  0.0, 0.0,
     240.0,   0.0,  1.0, 0.0,
     240.0, 180.0,  1.0, 1.0,
       0.0, 180.0,  0.0, 1.0,
  ]);

  // *** index buffer data *** //
  const indices = new Uint32Array([
    0, 1, 2,
    2, 3, 0,
  ]);

  // *** set buffer layout *** //
  const layout = new VertexBufferLayout( gl );
  layout.pushFloat( 2 );
  layout.pushFloat( 2 );

  // *** create buffers *** //
  const vao = new VertexArray( gl );
  const vbo = new VertexBuffer( gl, positions );
  const ibo = new IndexBuffer( gl, indices );
  vao.bind();
  vao.addBuffer( vbo, layout );

  // *** compile shaders and create program *** //
  const shader = new Shader( gl, vsSource, fsSource );
  shader.bind();

  // *** create projection matrix *** //
  const projection = mat4.create();
  mat4.ortho(
    projection,
     0.0, gl.canvas.width,
     0.0, gl.canvas.height,
    -1.0, 1.0
  );
  shader.setUniformMat4f( "u_Projection", projection );

  // *** create view matrix *** //
  let view = mat4.create();
  mat4.translate(
    view,
    view,
    vec3.fromValues( 0.0, 0.0, 0.0 )
  );
  shader.setUniformMat4f( "u_View", view );

  // *** create model matrix *** //
  let model = mat4.create();
  mat4.translate(
    model,
    model,
    vec3.fromValues( 0.0, 0.0, 0.0 )
  );
  shader.setUniformMat4f( "u_Model", model );

  // *** create texture *** //
  const texture = new Texture( gl, leaves );
  texture.bind();
  shader.setUniform1i( "u_Texture", 0 );

  // *** render loop *** //
  const renderer = new Renderer( gl );
  const render = () => {
    requestAnimationFrame( render );

    // *** resize canvas and viewport *** //
    if ( gl.canvas.width  !== gl.canvas.clientWidth  ||
         gl.canvas.height !== gl.canvas.clientHeight   ) {
      gl.canvas.width  = gl.canvas.clientWidth;
      gl.canvas.height = gl.canvas.clientHeight;
    }
    gl.viewport( 0, 0, gl.canvas.width, gl.canvas.height );
    gl.clearColor( 0, 0, 0, 1.0 );

    renderer.clear();

    vao.bind();
    ibo.bind();
    shader.bind();
    
    // *** update uniforms *** //
    mat4.ortho(
      projection,
       0.0, gl.canvas.width,
       0.0, gl.canvas.height,
      -1.0, 1.0
    );
    mat4.translate(
      model,
      mat4.create(),
      vec3.fromValues(
        ( gl.canvas.width  / 2 ) - 120,
        ( gl.canvas.height / 2 ) -  90,
        0.0
      )
    );

    shader.setUniformMat4f( "u_Model", model );
    shader.setUniformMat4f( "u_Projection", projection );

    renderer.draw( vao, ibo );
  };

  requestAnimationFrame( render );
};

window.addEventListener( "load", main );
