/*******************************************************************************
*  vertex shader                                                               *
*******************************************************************************/
const vertexShaderSource =
`#version 300 es

in vec4 a_Position;

void main() {
  gl_Position = a_Position;
}
`;


/*******************************************************************************
*  fragment shader                                                             *
*******************************************************************************/
const fragmentShaderSource =
`#version 300 es

precision highp float;

out vec4 outColor;

void main() {
  outColor = vec4( 1, 0, 0.5, 1 );
}
`;


/*******************************************************************************
*  compile shader                                                              *
*******************************************************************************/
const createShader = ( gl, type, source ) => {
  const shader = gl.createShader( type );

  gl.shaderSource( shader, source );
  gl.compileShader( shader );

  const success = gl.getShaderParameter( shader, gl.COMPILE_STATUS );

  if ( success ) return shader;

  console.error( gl.getShaderInfoLog( shader ) );
  gl.deleteShader( shader );
}


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

  const vertexShader = createShader(
    gl,
    gl.VERTEX_SHADER,
    vertexShaderSource
  );
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );
  const program = createProgram(
    gl,
    vertexShader,
    fragmentShader
  );

  const positionAttributeLocation = gl.getAttribLocation(
    program,
    "a_Position"
  );

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, positionBuffer );

  const positions = new Float32Array([
    0.0, 0.0,
    0.0, 0.5,
    0.7, 0.0,
  ]);

  gl.bufferData( gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW );

  const vertexArrayObject = gl.createVertexArray();
  gl.bindVertexArray( vertexArrayObject );
  gl.enableVertexAttribArray( positionAttributeLocation );

  {
    const size      = 2;
    const type      = gl.FLOAT;
    const normalize = false;
    const stride    = 0;
    const offset    = 0;

    gl.vertexAttribPointer(
      positionAttributeLocation,
      size,
      type,
      normalize,
      stride,
      offset
    );
  }

  gl.viewport( 0, 0, gl.canvas.width, gl.canvas.height );
  gl.clearColor( 0, 0, 0, 1.0 )  ;
  gl.clear( gl.COLOR_BUFFER_BIT );
  gl.useProgram( program );

  {
    const primitiveType = gl.TRIANGLES;
    const offset        = 0;
    const count         = 3;

    gl.drawArrays( primitiveType, offset, count );
  }
};

window.addEventListener( "load", main );
