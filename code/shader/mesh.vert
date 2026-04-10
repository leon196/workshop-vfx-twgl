precision mediump float;

uniform mat4 model, view, projection;

attribute vec4 position;
attribute vec3 normal;
attribute vec2 texcoord;

varying vec3 v_position;
varying vec2 v_texcoord;
varying vec3 v_normal;

void main() {
  vec4 position = projection * view * model * position;
  v_position = position.xyz;
  v_texcoord = texcoord;
  v_normal = normal;
  gl_Position = position;
}
