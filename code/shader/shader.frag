precision mediump float;

// settings from app.js
uniform sampler2D image;
uniform vec2 resolution, mouse;
uniform float time, value;

#define repeat(p,r) (mod(p,r)-r/2.)

mat2 rot(float a) { float c=cos(a),s=sin(a); return mat2(c,-s,s,c); }

float gyroid (vec3 p) { return dot(sin(p),cos(p.yzx)); }

float fbm (vec3 p)
{
    float result = 0., a = .5;
    for (int i = 0; i < 4; ++i) {
        result += gyroid(p/a)*a;
        a /= 1.8;
    }
    return result;
}

float map(vec3 p)
{
    float d = 100.;

    // more shapes at https://iquilezles.org/articles/distfunctions/

    d = length(p)-0.5;
    // d += fbm(p*3.) * 0.2;
    // d *= 0.5;

    return d;
}

void main()
{
    // pixel coordinate [0..1]
    vec2 uv = gl_FragCoord.xy / resolution;

    // position [-1..1]
    float aspect = resolution.x/resolution.y;
    vec2 p = (uv-0.5) * vec2(aspect, 1);
    
    vec3 pos = vec3(0,0,-3);
    vec3 ray = normalize(vec3(p, 1));
    float total = 0.0;
    float shade = 0.0;

    const float count = 30.0;
    for (float i = 0.; i < count; ++i) {
        float dist = map(pos);
        if (dist < 0.001 || total > 50.) {
            shade = 1.0 -  i/count;
            break;
        }
        pos += ray * dist;
        total += dist;
    }

    vec3 color = vec3(0);
    if (total < 50.) {
        color = vec3(shade);
    }
    
    // output result
	gl_FragColor = vec4(color, 1.0);
}