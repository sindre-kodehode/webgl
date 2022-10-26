import { vsSource, fsSource } from "./shaders.js";
import { VertexShader, FragmentShader } from "./Shader.js";

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
  gl.clearColor( 0, 0, 0, 1.0 )  ;
  gl.clear( gl.COLOR_BUFFER_BIT );

  // *** compile shaders and create program *** //
  const vertexShader   = new VertexShader( gl, vsSource );
  const fragmentShader = new FragmentShader( gl, fsSource );

  const program = createProgram(
    gl,
    vertexShader.compile(),
    fragmentShader.compile()
  );

  gl.useProgram( program );

  // *** position buffer *** //
  const positions = new Float32Array([
    -0.5, -0.5,
     0.5, -0.5,
     0.5,  0.5,
    -0.5,  0.5,
  ]);

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, positionBuffer );
  gl.bufferData( gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW );

  // *** vertex array object *** //
  const vertexArray = gl.createVertexArray();
  gl.bindVertexArray( vertexArray );
  gl.enableVertexAttribArray( 0 );

  {
    const size      = 2;
    const type      = gl.FLOAT;
    const normalize = false;
    const stride    = 0;
    const offset    = 0;

    gl.vertexAttribPointer(
      0,
      size,
      type,
      normalize,
      stride,
      offset
    );
  }

  // *** index buffer object *** //
  const indices = new Uint32Array([
    0, 1, 2,
    2, 3, 0,
  ]);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indexBuffer );
  gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW );

  // *** draw scene *** //
  {
    const primitiveType = gl.TRIANGLES;
    const offset        = 0;
    const count         = 6;
    const indexType     = gl.UNSIGNED_INT;

    gl.drawElements( primitiveType, count, indexType, offset);
  }
};

window.addEventListener( "load", main );
