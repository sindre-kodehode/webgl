export default
`#version 300 es

precision highp float;

out vec4 outColor;

uniform vec4 u_Color;

void main() {
  outColor = u_Color;
}`;
