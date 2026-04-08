
import * as twgl from "./twgl-full.module.js"

var dom = (selector) => { return document.querySelector(selector) }

export function build_list(dict, node)
{
    // shader settings
    Object.keys(dict).forEach(key => {

        // load
        const stored = localStorage.getItem(key)
        if (stored != null) dict[key] = stored

        // style
        const container = document.createElement("div")
        container.setAttribute("class", "row")

        // label
        const label = document.createElement("label")
        label.setAttribute("for", key)
        label.innerHTML = key
        container.append(label)

        // input
        const input = document.createElement("input")
        input.setAttribute("id", key)
        input.setAttribute("name", key)
        input.setAttribute("min", 0.0)
        input.setAttribute("max", 1.0)
        input.setAttribute("step", 0.01)
        input.setAttribute("type", "range")
        input.setAttribute("value", dict[key])
        input.addEventListener("input", (event) => {
            dict[key] = event.target.value
            localStorage.setItem(key, dict[key])
        })
        
        container.append(input)
        node.append(container)
    })
}

export function build_options(dict, node)
{
    // shader settings
    Object.keys(dict).forEach(key => {

        // load
        const stored = localStorage.getItem(key)
        if (stored != null) dict[key] = stored > 0.5

        // style
        const container = document.createElement("div")
        container.setAttribute("class", "row")

        // label
        const label = document.createElement("label")
        label.setAttribute("for", key)
        label.innerHTML = key
        container.append(label)

        // input
        const input = document.createElement("input")
        input.setAttribute("id", key)
        input.setAttribute("name", key)
        input.setAttribute("type", "checkbox")
        input.addEventListener("input", (event) => {
            dict[key] = input.checked
            localStorage.setItem(key, input.checked ? 1.0 : 0.0)
        })
        
        input.checked = dict[key]
        container.append(input)
        node.append(container)
    })
}

export function build_image_upload(context, node)
{
    // upload image button
    node
}

export function set_visible(node, toggle)
{
    node.style.display = toggle ? "inherit" : "none"
}