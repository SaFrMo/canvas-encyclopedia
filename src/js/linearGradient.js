import { setupCanvas, update } from './utils'

class Trail {
    constructor(opts = {}) {
        opts = {
            pos: { x: Math.random(), y: Math.random() },
            size: { x: Math.random(), y: 0.01 },
            speed: { x: Math.random(), y: 0 },
            host: null,
            ...opts
        }

        Object.keys(opts).forEach(opt => (this[opt] = opts[opt]))

        this.refreshHost(opts.host)
    }

    refreshHost(canvas) {
        this.canvas = canvas ? canvas : null
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null
    }

    update(delta) {
        // move trail
        this.pos.x += this.speed.x * (delta / 1000)
        // reset at far right
        if (this.pos.x >= 1) {
            //  Y, speed, width, and position
            this.pos.y = Math.random()
            this.speed.x = Math.random()
            this.size.x = Math.random()
            this.pos.x = -this.size.x
        }

        // cancel if no host canvas
        if (!this.host || !this.ctx) {
            return
        }

        // prep location
        const left = this.pos.x * this.canvas.width
        const top = this.pos.y * this.canvas.height
        const width = this.size.x * this.canvas.width
        const height = this.size.y * this.canvas.height
        const dimensions = [left, top, width, height]
        const points = [left, top, left + width, top + height]

        // prep gradient
        const gradient = this.ctx.createLinearGradient(...points)
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
        gradient.addColorStop(1, 'rgba(180, 180, 180, 1)')

        // draw gradient
        this.ctx.fillStyle = gradient
        this.ctx.fillRect(...dimensions)
    }
}

export default function() {
    const { canvas, ctx } = setupCanvas('.linear-gradient')

    // create some trails
    const trails = Array(100)
        .fill(null)
        .map(() => new Trail({ host: canvas }))

    // kick update
    update(delta => {
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        trails.forEach(trail => trail.update(delta))
    })
}
