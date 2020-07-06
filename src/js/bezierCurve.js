import { setupCanvas, update, Vector2, circle } from './utils'

class BezierLine {
    constructor(opts = {}) {
        opts = {
            start: new Vector2(),
            cp1: new Vector2({ y: 0.01 }),
            cp2: new Vector2({ y: 0 }),
            end: new Vector2(),
            canvas: null,
            ctx: null,
            ...opts
        }

        Object.keys(opts).forEach(opt => (this[opt] = opts[opt]))
    }

    draw() {
        // start
        this.ctx.fillStyle = '#fff'
        const start = {
            x: this.start.x * this.canvas.width,
            y: this.start.y * this.canvas.height
        }
        circle({ ctx: this.ctx, point: start })

        const end = {
            x: this.end.x * this.canvas.width,
            y: this.end.y * this.canvas.height
        }
        circle({ ctx: this.ctx, point: end })

        // control 1
        // control 2
        // end
        // line
    }
}

export default function() {
    const { canvas, ctx } = setupCanvas('.bezier-curve')

    const line = new BezierLine({ canvas, ctx })

    // kick update
    update(delta => {
        // clear
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // draw
        line.draw()
    })
}
