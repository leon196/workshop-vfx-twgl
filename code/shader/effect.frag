precision mediump float;

// common
uniform sampler2D image, atlas;
uniform vec2 resolution;
uniform float time;

// settings
uniform float value;

vec3 hash33(vec3 p3)
{
    // Dave Hoskins
    // https://www.shadertoy.com/view/4djSRW
	p3 = fract(p3 * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yxz+33.33);
    return fract((p3.xxy + p3.yxx)*p3.zyx);
}

float remap(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main()
{
    vec2 uv = gl_FragCoord.xy / resolution;
	vec2 ratio = vec2(resolution.x/resolution.y,1);
    vec2 p = 2.*(uv-.5)*ratio;
    float pixelate = value*100.;
    vec2 uv_pixelate = floor(uv*pixelate)/pixelate;
    vec3 color = texture2D(image, uv_pixelate).rgb;
    float gray = (color.r+color.g+color.b)/3.;
    vec2 grid = vec2(16,18);
    float index = floor(gray*grid.x*grid.y);
    vec2 cell = vec2(mod(index, grid.x), floor(index/grid.x));
    vec2 uv_cell = (fract(uv*pixelate) + cell)/grid;
    color *= texture2D(atlas, uv_cell).rgb;
	gl_FragColor = vec4(color,1);
}