import { setupCanvas, update } from './utils'

export default function() {
    const { canvas, ctx } = setupCanvas('.linear-gradient')
    const gradient = ctx.createLinearGradient(20, 0, 220, 0)

    // Add three color stops
    gradient.addColorStop(0, 'green')
    gradient.addColorStop(0.1, 'cyan')
    gradient.addColorStop(1, 'green')

    // Set the fill style and draw a rectangle
    ctx.fillStyle = gradient
    ctx.fillRect(20, 20, 250, 100)
}
