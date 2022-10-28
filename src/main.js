import fsSource           from "./FragmentShaderSource.js";
import vsSource           from "./VertexShaderSource.js";
import IndexBuffer        from "./IndexBuffer.js";
import Renderer           from "./Renderer.js";
import Shader             from "./Shader.js";
import Texture            from "./Texture.js";
import VertexArray        from "./VertexArray.js";
import VertexBuffer       from "./VertexBuffer.js";
import VertexBufferLayout from "./VertexBufferLayout.js";

const main = () => {
  const canvas = document.querySelector( "canvas" );
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
    -0.5, -0.5,
     0.5, -0.5,
     0.5,  0.5,
    -0.5,  0.5,
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

  vao.bind();
  vao.addBuffer( vbo, layout );

  // *** compile shaders and create program *** //
  const shader = new Shader( gl, vsSource, fsSource );

  // *** create texture *** //
  const texture = new Texture( gl, "../res/leaves.jpg" );
  texture.bind();

  // *** render loop *** //
  const renderer = new Renderer( gl );

  let red        = 0.0;
  let increment  = 0.02;

  const render = () => {
    requestAnimationFrame( render );

    renderer.clear();

    shader.bind();
    shader.setUniform4f( "u_Color", red, 0.3, 0.8, 1.0 );

    renderer.draw( vao, ibo, shader );

    if      ( red > 1.0 ) increment = -0.02;
    else if ( red < 0.0 ) increment =  0.02;

    red += increment;
  };

  requestAnimationFrame( render );
};

window.addEventListener( "load", main );
