const HEIGHT = 500
const WIDTH = 500

// async sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

window.onload = async function() {
    let canvas = document.getElementById("canvas")
    let ctx = canvas.getContext('2d')

    bars = []
    
    // create bars
    for(let i = 0; i < 100; i++) {
        let r = Math.floor(Math.random() * 400 + 1)
        bars.push(new Bar(i, r))
    }

    for(let i = 0; i < bars.length; i++) {
        for(let j = 0; j < bars.length - i - 1; j++) {
            if(bars[j].height > bars[j+1].height) {
                let temp = bars[j+1].height
                bars[j+1].height = bars[j].height
                bars[j].height = temp
            }
            await sleep(10)
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            bars.forEach(bar => {
                bar.draw(ctx)
            });
        }
    }
}

function Bar(pos, val) {
    this.height = val
    this.pos = pos

    this.draw = function(ctx) {
        ctx.fillStyle = 'rgb(200,0,0)'
        ctx.fillRect(this.pos*10,HEIGHT-this.height,10,this.height)
    }
}