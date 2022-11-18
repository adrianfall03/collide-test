var canvas = document.querySelector('canvas');
canvas.style.background='black';
canvas.width = 800;
canvas.height = 800;
const width = canvas.width;
const height = canvas.height;
var ctx = canvas.getContext('2d');


class Circle{
    constructor(x,y,r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = 'green';
    }
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI *2, false);
        if (this.color == 'yellow'){
            context.fillStyle='hsl( 77, 48%, 75%)';
           
        }else{
            context.fillStyle='hsl(170, 100%, 50%)';
        }
       
        context.fill();
        context.closePath();       
    }
    update(){
    }
    checkCollide(other){
        if(Math.sqrt(Math.pow(this.x-other.x,2)+Math.pow(this.y-other.y,2)) <= this.r+other.r){
            other.vx = -other.vx*Math.random()*2+0.5;
            other.vy = -other.vy*Math.random()*2+0.5;
            this.color= 'yellow';
        }
    }
}
class Player extends Circle{
    constructor(x,y,r){
        super(x,y,r);
        this.vx =10;
        this.vy =10;
    };
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI *2, false);
        context.fillStyle='hsl(288, 47%, 53%)';
        context.fill();
        context.closePath();  
    }
    update(){
        this.x += this.vx/60;
        this.y += this.vy/60;
    }
    checkCollide(){
        if(this.x<this.r||this.x>width-this.r){
            this.vx = -this.vx;
        }
        if(this.y<this.r||this.y>height-this.r){
            this.vy = -this.vy;
        }
    }
}

class GameBoard{
    constructor(circleNumber){
        this.startTime;
         this.init(circleNumber);
    }
    init(circleNumber){
        this.player =  new Player(Allset.random(800,0),Allset.random(800,0),Allset.random(40,20));
        this.circles=[];
        for (let i = 0; i < circleNumber; i++) {
            let x = Allset.random(800,0);
            let y = Allset.random(800,0);
            let r =Allset.random(20,10);
            this.circles.push(new Circle(x,y,r)); 
            window.requestAnimationFrame(this.process.bind(this));
        } 
    }
    process(now){
        if(!this.startTime){
            this.startTime = now;
        }
            var seconds = (now - this.startTime)/60;
            this.startTime = now;
        //clear
        ctx.clearRect(0,0,width,height);
        //
        this.player.update();
        this.player.checkCollide();
        this.circles.forEach((circle) => {
                circle.update();
                circle.checkCollide(this.player);
                circle.draw(ctx);
                circle.color='green';
        });

        this.player.draw(ctx);
        // console.log(this.circles);
        window.requestAnimationFrame(this.process.bind(this));
    }
}

class Allset{
    static random(max,min){
       return  Math.floor(Math.random()*(max-min+1)+min); 
    }
}

new GameBoard(Allset.random(30,15));