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

const main = () => {
  const canvas = document.querySelector( "canvas" ) as HTMLCanvasElement;
  const gl     = canvas.getContext( "webgl2" );

  if ( !gl ) {
    console.error( "Unable to Initialize WebGL" )
    return;
  }

  // *** initialize viewport *** //
  gl.viewport( 0, 0, gl.canvas.width, gl.canvas.height );
  gl.clearColor( 0, 0, 0, 1.0 );

  // *** buffer data *** //
  const positions = new Float32Array([
    -0.5, -0.5, 0.0, 0.0,
     0.5, -0.5, 1.0, 0.0,
     0.5,  0.5, 1.0, 1.0,
    -0.5,  0.5, 0.0, 1.0,
  ]);

  // *** index buffer data *** //
  const indices = new Uint32Array([
    0, 1, 2,
    2, 3, 0,
  ]);

  // *** create buffers *** //
  const vao    = new VertexArray( gl );
  const layout = new VertexBufferLayout( gl );
  const vbo    = new VertexBuffer( gl, positions );
  const ibo    = new IndexBuffer( gl, indices );

  // *** fill buffers *** //
  layout.pushFloat( 2 );
  layout.pushFloat( 2 );

  vao.bind();
  vao.addBuffer( vbo, layout );

  // *** compile shaders and create program *** //
  const shader = new Shader( gl, vsSource, fsSource );
  shader.bind();

  // *** create texture *** //
  const texture = new Texture( gl, leaves );
  texture.bind();
  shader.setUniform1i( "u_Texture", 0 );

  // *** render loop *** //
  const renderer = new Renderer( gl );

  const render = () => {
    requestAnimationFrame( render );

    renderer.clear();

    vao.bind();
    ibo.bind();
    shader.bind();

    renderer.draw( vao, ibo );
  };

  requestAnimationFrame( render );
};

window.addEventListener( "load", main );
