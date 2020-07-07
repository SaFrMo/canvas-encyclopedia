export function setupCanvas(className) {
    const canvas = document.querySelector(`.${className.replace(/^\./, '')}`)
    const ctx = canvas ? canvas.getContext('2d') : null
    return { canvas, ctx }
}

// callback receives deltaTime as argument
let lastTick = Date.now() - 100

export function update(callback) {
    function runUpdate() {
        callback(Date.now() - lastTick)
        lastTick = Date.now()
        requestAnimationFrame(runUpdate)
    }

    runUpdate()
}

export class Vector2 {
    constructor(opts = {}) {
        this.x = opts.x === undefined ? Math.random() : opts.x
        this.y = opts.y === undefined ? Math.random() : opts.y
    }

    canvas(cv) {
        return { x: this.x * cv.width, y: this.y * cv.height }
    }
}

export function circle({ ctx, point, radius }) {
    ctx.moveTo(point.x, point.y)
    ctx.arc(point.x, point.y, radius || 5, 0, 2 * Math.PI)
    ctx.fill()
}
