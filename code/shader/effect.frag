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
    // pixel coordinates
    vec2 uv = gl_FragCoord.xy / resolution;
    
    // sample image color
    vec3 color = texture2D(image, uv).rgb;
    
	gl_FragColor = vec4(color,1);
}