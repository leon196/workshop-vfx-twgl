
export const shaders = {}

var files = [
  // vertex shader
  "quad.vert",
  "mesh.vert",

  // pixel shader
  "color.frag",
  "shader.frag",
  "image.frag",
  "atlas.frag",
  "effect.frag",
  "mesh.frag",
]

// timestamp to ignore cache when reload
const ts = Date.now().toString()

// load file
const path = "./code/shader/"
for (const file in files) {
    await fetch(path+files[file]+"?ts="+ts)
    .then(t => t.text())
    .then(t => shaders[files[file]] = t)
}