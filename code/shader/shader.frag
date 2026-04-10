precision mediump float;

// settings from app.js
uniform vec2 resolution;
uniform float time;
uniform float value;

void main()
{
    // pixel coordinate [0..1]
    vec2 pixel = gl_FragCoord.xy / resolution;

    // color components
    float red = pixel.x;
    float green = pixel.y;
    float blue = 0.5 + 0.5 * sin(time);
    float alpha = 1.0;
    
    // output result
	gl_FragColor = vec4(red, green, blue, alpha);
}