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
