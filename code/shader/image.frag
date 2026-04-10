precision mediump float;

// settings from app.js
uniform sampler2D image;
uniform vec2 resolution;
uniform float time;
uniform float value;

void main()
{
    // pixel coordinate [0..1]
    vec2 uv = gl_FragCoord.xy / resolution;
    
    // sample image color
    vec3 color = texture2D(image, uv).rgb;
    
    // output result
	gl_FragColor = vec4(color,1);
}