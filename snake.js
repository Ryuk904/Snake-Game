function init(){
    canvas = document.getElementById('mycanvas');
    W = canvas.width = 1000;
    H = canvas.height = 1000;

    game_over = false
    score = 0;

    //Creating a image object for food
    food_img = new Image();
    food_img.src = "Assets/apple.png"

    trophy = new Image();
    trophy.src = "Assets/trophy.png"

    pen = canvas.getContext('2d')
    cs = cellsize = 66;
    food=getRandomFood(); 


    snake = {
        color: "blue",
        init_len: 5,
        cells: [],  //an empty array
        direction: "right",

        createSnake:function(){
            for(var i=this.init_len ; i>0;i--)
            {
                this.cells.push({x:i , y:0})
            }
        },

        drawSnake:function(){
            

            
            for(var i=0; i<this.cells.length ;i++){
                pen.fillStyle= this.color;
                pen.fillRect(this.cells[i].x*cs , this.cells[i].y*cs , cs-2 , cs-2);
            }
        },

        updateSnake:function(){
            
            
            //now we will add a new element at the start of the array
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            // snake will eat the food when its head meet with the food
            if(headX == food.x && headY==food.y)
            {
                score++;
                food=getRandomFood();
            }
            else{
            this.cells.pop(); //pop removes the last element from the array

            }

            var nextX, nextY;
            if(this.direction=="right"){
                nextX= headX+1;
                nextY = headY;
            }
            else if(this.direction=="left"){
                nextX= headX-1;
                nextY = headY;
            }
            else if(this.direction=="down"){
                nextX= headX;
                nextY = headY+1;
            }
            else {
                nextX= headX;
                nextY = headY-1;
            }
            
            //Inserts new elements at the start of an array
            this.cells.unshift({x:nextX,y:nextY});

            //to prevent snake from going out of the canvas
            var last_x = Math.round(W/cs);
            var last_y = Math.round(H/cs);
            if(this.cells[0].x<0 || this.cells[0].x>last_x || this.cells[0].y<0 || this.cells[0].y>last_y)
            {
                game_over=true;
            }
        }
    };
    snake.createSnake();

    document.addEventListener('keydown', keyPressed);
    function keyPressed(e){
        if(e.key == "ArrowRight")
        {
            snake.direction = "right";
        }
        else if(e.key == "ArrowLeft")
        {
            snake.direction = "left";
        }
        else if(e.key == "ArrowDown")
        {
            snake.direction = "down";
        }
        else
        {
            snake.direction = "up";
        }
        console.log(snake.direction);
    }
    
}


function draw(){
    //clear the old frame
    pen.clearRect(0,0,W,H);
    
    snake.drawSnake();
    //draw food
    pen.drawImage(food_img,food.x*cs,food.y*cs, cs ,cs);

    pen.drawImage(trophy,25,16,cs,cs)
    pen.fillStyle ="blue";
    pen.font ="40px Roboto"
    pen.fillText(score,50,50);

}

function update(){
    

    snake.updateSnake();
    
}
function getRandomFood(){
    //Math.random will give value between 0 to 1
    var foodX = Math.round(Math.random()*(W-cs)/cs);
    var foodY = Math.round(Math.random()*(W-cs)/cs);
    var food = {
        x:foodX,
        y:foodY,
        color:"red",
    }
    return food;
}

function gameloop(){
    
    
    if(game_over==true)
    {
     clearInterval(f);
     alert("game over");
     return;
    }
    draw();
    update();
}
init();
f = setInterval(gameloop,300);
