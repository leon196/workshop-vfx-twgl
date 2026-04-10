precision mediump float;

// settings from app.js
uniform sampler2D image, atlas;
uniform vec2 resolution;
uniform float time;
uniform float value;

void main()
{
    // pixel coordinate [0..1]
    vec2 uv = gl_FragCoord.xy / resolution;

    // pixelate
    float pixelate = value*100.;
    vec2 uv_pixelate = floor(uv*pixelate)/pixelate;

    // sample image color
    vec3 color = texture2D(image, uv_pixelate).rgb;

    // grayscale
    float gray = (color.r+color.g+color.b)/3.;
    
    // atlas dimension
    vec2 grid = vec2(16,18);

    // index from grayscale
    float index = floor(gray*grid.x*grid.y);

    // cell grid coordinate from index
    vec2 cell = vec2(mod(index, grid.x), floor(index/grid.x));

    // pixel coordinate from grid
    vec2 uv_cell = (fract(uv*pixelate) + cell)/grid;

    // atlas 
    color *= texture2D(atlas, uv_cell).rgb;

	gl_FragColor = vec4(color,1);
}