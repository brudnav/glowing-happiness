const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext("2d")
canvas.width = 300;
canvas.height = 400;

ctx.lineWidth = 6


const gradient1 = ctx.createLinearGradient(0,0,canvas.width, canvas.height)
gradient1.addColorStop("0.2", "crimson")
gradient1.addColorStop("0.8", "black")

ctx.strokeStyle = gradient1;



class Line {
    constructor(canvas){
        this.canvas = canvas
        this.x = Math.random() * this.canvas.width
        this.y = Math.random() * this.canvas.height
        this.history = [{x:this.x, y: this.y}]
        this.maxLength = Math.floor(Math.random() * 150 + 10)
        this.speedX = Math.random() - 0.5
        this.speedY = 7;
        this.lifeSpan = this.maxLength * 2;
        this.timer = 0;

        this.hue = Math.floor(Math.random() * 360)
        this.lineWidth = Math.floor(Math.random() * 10 + 1)
    }

    draw(ctx){
       // ctx.strokeStyle = `hsl(${this.hue},100%,50%)`
        ctx.lineWidth = this.lineWidth
        ctx.beginPath()
        ctx.moveTo(this.history[0].x,this.history[0].y)

        for(let i = 0; i < this.history.length; i++){
            ctx.lineTo(this.history[i].x,this.history[i].y)
        }
        ctx.stroke()

    }

    update(){

        ++this.timer;
        if(this.timer < this.lifeSpan){
            this.x += this.speedX + Math.random() * 20 - 10
            this.y += this.speedY + Math.random() * 20 - 10
            this.history.push({x:this.x, y: this.y})

            if(this.history.length > this.maxLength){
            this.history.shift()
        }
        }else if(this.history.length <= 1){
            this.reset()
        }
        else{
            this.history.shift()
        }
  
    }

    reset(){
        this.x = Math.random() * this.canvas.width
        this.y = Math.random() * this.canvas.height
        this.history = [{x:this.x, y: this.y}]
        this.timer = 0;
    }
}

let linesArray = [];
let numberOfLines = 23;
for (let i = 0; i < numberOfLines; i++) {
    linesArray.push(new Line(canvas))
    
}


function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height)
    linesArray.forEach(line => {
        line.draw(ctx)
        line.update()
    })

    requestAnimationFrame(animate)
}

animate()
