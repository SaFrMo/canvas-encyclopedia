import { setupCanvas, update, Vector2, circle } from './utils'

class BezierLine {
    constructor(opts = {}) {
        opts = {
            start: new Vector2({ x: 0.1, y: 0.1 }),
            cp1: new Vector2({ y: 0.01 }),
            cp2: new Vector2({ y: 0 }),
            end: new Vector2({ x: 0.9, y: 0.9 }),
            canvas: null,
            ctx: null,
            ...opts
        }

        Object.keys(opts).forEach(opt => (this[opt] = opts[opt]))
    }

    draw() {
        const start = this.start.canvas(this.canvas)
        const cp1 = this.cp1.canvas(this.canvas)
        const cp2 = this.cp2.canvas(this.canvas)
        const end = this.end.canvas(this.canvas)

        // line
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0)'
        this.ctx.beginPath()
        this.ctx.moveTo(start.x, start.y)
        this.ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y)
        this.ctx.stroke()

        // start
        // this.ctx.fillStyle = 'black'

        // start and end circles
        // circle({ ctx: this.ctx, point: start })
        // circle({ ctx: this.ctx, point: end })
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
