import * as twgl from "./twgl-full.module.js"
import { shaders } from "./files.js"
import { cube } from "./mesh.js"

export function create_cube(context)
{
    // create mesh buffer
    context.buffer = twgl.createBufferInfoFromArrays(context.gl, cube)
    
    // create shader
    context.program = twgl.createProgramInfo(context.gl, [
        shaders["mesh.vert"],
        shaders["mesh.frag"]])
}

export function draw_cube(context)
{
    const gl = context.gl
    const shader = context.program
    const shader_settings = context.uniforms
    const mesh_buffer = context.buffer
    const m4 = twgl.m4
    const time = context.time

    // enable depth test
    gl.enable(gl.DEPTH_TEST)
    gl.enable(gl.CULL_FACE)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    // perspective projection
    const fov = 30 * Math.PI / 180
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
    const zNear = 0.5
    const zFar = 10
    const projection = m4.perspective(fov, aspect, zNear, zFar)
    const eye = [1, 4, -6]
    const target = [0, 0, 0]
    const up = [0, 1, 0]

    // model, view and projection spaces
    // const model = m4.rotationY(time)
    const model = m4.identity()
    const camera = m4.lookAt(eye, target, up)
    const view = m4.inverse(camera)

    // shader settings
    shader_settings.model = model
    shader_settings.view = view
    shader_settings.projection = projection

    // bind mesh buffer and shaders data
    twgl.setBuffersAndAttributes(gl, shader, mesh_buffer)
    twgl.setUniforms(shader, shader_settings)

    // draw triangles
    gl.drawElements(gl.TRIANGLES, mesh_buffer.numElements, gl.UNSIGNED_SHORT, 0)
}