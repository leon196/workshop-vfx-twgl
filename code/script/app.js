import * as twgl from "./twgl-full.module.js"
import * as gui from "./gui.js"
import { shaders } from "./files.js"
import { quad } from "./mesh.js"
import { create_cube, draw_cube } from "./3d.js"
var dom = (selector) => { return document.querySelector(selector) }

// main container
const context = {}

// settings
const settings = {
    value: 0.5,
}

// start
function start()
{
    // create HTML elements from settings
    gui.build_list(settings, dom("#gui_settings"))

    // create WebGL context
    context.gl = dom("#canvas_main").getContext("webgl", { 
        preserveDrawingBuffer: true })

    // create mesh buffer
    context.buffer = twgl.createBufferInfoFromArrays(context.gl, quad)
    
    // create shader
    context.program = twgl.createProgramInfo(context.gl, [
        shaders["quad.vert"],
        shaders["color.frag"]])
    
    // settings for shaders
    context.uniforms = {
        time: 0.0,
        resolution: [1920, 1080],

        // create image
        image: twgl.createTexture(context.gl, {
            src: "./content/image/photo.jpg",
            flipY: true,
        }),

        // another image
        atlas: twgl.createTexture(context.gl, {
            src: "./content/image/adlfont_16x18.png",
            minMag: context.gl.NEAREST,
            flipY: true,
        }),
    }

    // example with cube
    // create_cube(context)

    requestAnimationFrame(update)
}

// main loop
function update(time)
{
    // rename things to explicit their roles
    const webgl = context.gl
    const canvas = webgl.canvas
    const shader = context.program
    const shader_settings = context.uniforms
    const mesh_buffer = context.buffer

    // store time elapsed
    context.time = time/1000.0

    // resize canvas and viewport
    twgl.resizeCanvasToDisplaySize(canvas)
    webgl.viewport(0, 0, canvas.width, canvas.height)

    // prepare to use shader
    webgl.useProgram(shader.program)

    // store settings to shader
    shader_settings.time = context.time
    shader_settings.resolution = [canvas.width, canvas.height]
    Object.keys(settings).forEach(key => 
        shader_settings[key] = settings[key])

    // bind mesh buffer and shaders data
    twgl.setBuffersAndAttributes(webgl, shader, mesh_buffer)
    twgl.setUniforms(shader, shader_settings)

    // draw
    twgl.drawBufferInfo(webgl, mesh_buffer)
    // draw_cube(context)

    // repeat
    requestAnimationFrame(update)
}

start()