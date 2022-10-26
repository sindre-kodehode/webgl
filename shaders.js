/*******************************************************************************
*  vertex shader                                                               *
*******************************************************************************/
export const vsSource =
`#version 300 es

in vec4 a_Position;

void main() {
  gl_Position = a_Position;
}`;


/*******************************************************************************
*  fragment shader                                                             *
*******************************************************************************/
export const fsSource =
`#version 300 es

precision highp float;

out vec4 outColor;

void main() {
  outColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
