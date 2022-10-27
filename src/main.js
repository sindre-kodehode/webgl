import vsSource       from "./VertexShaderSource.js";
import fsSource       from "./FragmentShaderSource.js";
import VertexShader   from "./VertexShader.js";
import FragmentShader from "./FragmentShader.js";
import VertexBuffer   from "./VertexBuffer.js";
import IndexBuffer    from "./IndexBuffer.js";

/*******************************************************************************
*  create program                                                              *
*******************************************************************************/
const createProgram = ( gl, vertexShader, fragmentShader ) => {
  const program = gl.createProgram();

  gl.attachShader( program, vertexShader   );
  gl.attachShader( program, fragmentShader );
  gl.linkProgram( program );

  const success = gl.getProgramParameter( program, gl.LINK_STATUS );

  if ( success ) return program;

  console.error( gl.getProgramInfoLog( program ) );
  gl.deleteProgram( program );
};

/*******************************************************************************
*  main                                                                        *
*******************************************************************************/
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
  const vs = new VertexShader(   gl, vsSource );
  const fs = new FragmentShader( gl, fsSource );

  const program = createProgram( gl, vs.shaderId, fs.shaderId );
  gl.useProgram( program );

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

  // *** attribute locations *** //
  const positionLocation = gl.getAttribLocation( program, "a_Position" );

  // *** uniform locations *** //
  const colorLocation = gl.getUniformLocation( program, "u_Color" );

  // *** create and bind buffers *** //
  const vertexArray = gl.createVertexArray();
  gl.bindVertexArray( vertexArray );
  gl.enableVertexAttribArray( positionLocation );

  const ib = new IndexBuffer(  gl, indices   );
  const vb = new VertexBuffer( gl, positions );

  // *** specify vertex buffer *** //
  {
    const size      = 2;
    const type      = gl.FLOAT;
    const normalize = false;
    const stride    = 0;
    const offset    = 0;

    gl.vertexAttribPointer(
      positionLocation,
      size,
      type,
      normalize,
      stride,
      offset
    );
  }

  // *** render loop *** //
  let then      = 0;
  let red       = 0.0;
  let increment = 0.02;

  const render = now => {
    requestAnimationFrame( render );

    now *= 0.001;
    const deltaTime = now - then;
    then = now;

    // *** draw scene *** //
    gl.clearColor( 0, 0, 0, 1.0 )  ;
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

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
