export function setupCanvas(className) {
    const canvas = document.querySelector(`.${className.replace(/^\./, '')}`)
    const ctx = canvas ? canvas.getContext('2d') : null
    return { canvas, ctx }
}

export function update(callback) {
    function runUpdate() {
        callback()
        requestAnimationFrame(runUpdate)
    }

    runUpdate()
}
