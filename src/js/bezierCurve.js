import { setupCanvas, update, Vector2, circle } from './utils'

class BezierLine {
    constructor(opts = {}) {
        opts = {
            start: new Vector2({ x: 0.1, y: 0.5 }),
            cp1: new Vector2({ x: 0.3, y: 0.8 }),
            cp2: new Vector2({ x: 0.7, y: 0.2 }),
            end: new Vector2({ x: 0.9, y: 0.5 }),
            canvas: null,
            ctx: null,
            ...opts
        }

        Object.keys(opts).forEach(opt => (this[opt] = opts[opt]))
    }

    draw() {
        const n = Date.now() * 0.001
        this.cp1 = new Vector2({ x: 0.3, y: (Math.sin(n) + 1) / 2 })
        this.cp2 = new Vector2({ x: 0.7, y: (-Math.sin(n) + 1) / 2 })

        const start = this.start.canvas(this.canvas)
        const cp1 = this.cp1.canvas(this.canvas)
        const cp2 = this.cp2.canvas(this.canvas)
        const end = this.end.canvas(this.canvas)
        const points = [start, end, cp1, cp2]

        // line
        this.ctx.beginPath()
        this.ctx.moveTo(start.x, start.y)
        this.ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y)
        this.ctx.strokeStyle = '#000'
        this.ctx.fillStyle = 'transparent'
        this.ctx.stroke()

        points.forEach((point, i) => {
            this.ctx.beginPath()
            // start/end points are black, control points are red
            this.ctx.fillStyle = i < 2 ? '#000' : '#f00'
            circle({ ctx: this.ctx, point })
        })
    }
}

export default function() {
    const { canvas, ctx } = setupCanvas('.bezier-curve')

    const line = new BezierLine({ canvas, ctx })

    // kick update
    update(delta => {
        // clear
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // draw
        line.draw()
    })
}
