let WIDTH = window.innerWidth
let HEIGHT = Math.floor(window.innerHeight / 2)

window.onload = function () {
    let bs = new Sort('bubbleSortCanvas')
    bs.bubbleSort()

    let is = new Sort('insertionSortCanvas')
    is.insertionSort()
}

class Sort {
    constructor(canvasID) {
        this.canvas = document.getElementById(canvasID)
        this.ctx = this.canvas.getContext('2d')
        this.bars = []

        this.ctx.canvas.width = WIDTH
        this.ctx.canvas.height = HEIGHT

        this.initBars()
    }

    async bubbleSort() {
        for (let i = 0; i < this.bars.length; i++) {
            for (let j = 0; j < this.bars.length - i - 1; j++) {
                if (this.bars[j].height > this.bars[j + 1].height) {
                    let temp = this.bars[j + 1].height
                    this.bars[j + 1].height = this.bars[j].height
                    this.bars[j].height = temp
                }
                await sleep(1)
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.bars.forEach((b, index) => {
                    if (index == j || index == j + 1) {
                        b.highlight(this.ctx)
                    } else {
                        b.draw(this.ctx)
                    }
                });
            }
        }
        this.initBars()
        this.bubbleSort()
    }

    async insertionSort() {
        for (let i = 1; i < this.bars.length; i++) {
            let k = this.bars[i].height

            // shift elements greater than k
            let j = i - 1
            while (j >= 0 && k < this.bars[j].height) {
                this.bars[j + 1].height = this.bars[j].height
                j -= 1
                
                await sleep(5)
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.bars.forEach(b => {
                    b.draw(this.ctx)
                });
            }
            this.bars[j + 1].height = k

        }
        this.initBars()
        this.insertionSort()
    }

    // split the array into halves and recursively merge them 
    async mergeSort() {
        //TODO: make dis shit
    }

    initBars() {
        this.bars = []
        // create bars
        for (let i = 0; i < 100; i++) {
            let r = Math.floor(Math.random() * HEIGHT + 1)
            this.bars.push(new Bar(i, r))
        }

        // draw bars
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.bars.forEach(b => {
            b.draw(this.ctx)
        });
    }

}

class Bar {
    constructor(pos, val) {
        this.height = val
        this.pos = pos
        this.w = Math.floor(WIDTH / 100)
    }
    draw(ctx) {
        ctx.fillStyle = 'rgb(200,0,0)'
        ctx.fillRect(this.pos * this.w, HEIGHT - this.height, this.w, this.height)
    }

    highlight(ctx) {
        ctx.fillStyle = 'rgb(255,255,100)'
        ctx.fillRect(this.pos * this.w, HEIGHT - this.height, this.w, this.height)
    }
}

// async sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
