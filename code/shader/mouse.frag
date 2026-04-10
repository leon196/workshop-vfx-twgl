precision mediump float;

// settings from app.js
uniform sampler2D image;
uniform vec2 resolution, mouse;
uniform float time, value;

void main()
{
    // pixel coordinate [0..1]
    vec2 uv = gl_FragCoord.xy / resolution;

    // position [-0.5..0.5]
    float aspect = resolution.x/resolution.y;
    vec2 p = (uv-0.5) * vec2(aspect, 1);

    // mouse coordinate
    vec2 m = (mouse/resolution-0.5) * vec2(aspect, 1);

    // color components
    float shape = length(p-m) - 0.1;
    float shade = smoothstep(0.01, 0.0, shape);
    vec3 color = vec3(shade);

    color = texture2D(image, uv).rgb;
    color = mix(color, 1.0-color, shade);
    
    // output result
	gl_FragColor = vec4(color, 1.0);
}