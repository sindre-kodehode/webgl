import fsSource           from "./FragmentShaderSource.js";
import vsSource           from "./VertexShaderSource.js";
import FragmentShader     from "./FragmentShader.js";
import IndexBuffer        from "./IndexBuffer.js";
import Program            from "./Program.js";
import VertexArray        from "./VertexArray.js";
import VertexBuffer       from "./VertexBuffer.js";
import VertexBufferLayout from "./VertexBufferLayout.js";
import VertexShader       from "./VertexShader.js";

const main = () => {
  const canvas = document.querySelector( "canvas" );
  const gl     = canvas.getContext( "webgl2" );

  if ( !gl ) {
    console.error( "Unable to Initialize WebGL" )
    return;
  }

  // *** initialize viewport *** //
  gl.viewport( 0, 0, gl.canvas.width, gl.canvas.height );

  // *** compile shaders and create program *** //
  const vs      = new VertexShader( gl, vsSource );
  const fs      = new FragmentShader( gl, fsSource );
  const program = new Program( gl, vs, fs );

  // *** buffer data *** //
  const positions = new Float32Array([
    -0.5, -0.5,
     0.5, -0.5,
     0.5,  0.5,
    -0.5,  0.5,
  ]);

  const indices = new Uint32Array([
    0, 1, 2,
    2, 3, 0,
  ]);

  // *** create and bind buffers *** //
  const va     = new VertexArray( gl );
  const layout = new VertexBufferLayout( gl );
  const vb     = new VertexBuffer( gl, positions );

  layout.pushFloat( 2 );
  va.addBuffer( vb, layout );

  const ib = new IndexBuffer( gl, indices );

  // *** uniform locations *** //
  const colorLocation = gl.getUniformLocation( program.programId, "u_Color" );

  // *** render loop *** //
  let red       = 0.0;
  let increment = 0.02;

  const render = () => {
    requestAnimationFrame( render );

    // *** draw scene *** //
    gl.clearColor( 0, 0, 0, 1.0 )  ;
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    va.bind();
    ib.bind();

    gl.uniform4fv(
      colorLocation,
      new Float32Array([ red, 0.3, 0.8, 1.0 ])
    );

    {
      const primitiveType = gl.TRIANGLES;
      const offset        = 0;
      const count         = 6;
      const indexType     = gl.UNSIGNED_INT;

      gl.drawElements( primitiveType, count, indexType, offset);
    }
    
    if ( red > 1.0 ) {
      increment = -0.02;
    }
    else if ( red < 0.0 ) {
      increment = 0.02;
    }

    red += increment;
  };

  requestAnimationFrame( render );
};

window.addEventListener( "load", main );
