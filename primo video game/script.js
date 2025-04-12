function startGame() {
    myGameArea.start();
    myGameArea.draw(snake);
}
 
var snake = {
  x: 10,
  y: 120
};



var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20); //ogni 20 ms chiamo il metodo updateGameA
    },

    draw: function(component) {
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height); //prima di disegnare il nuovo quadrato, lo cancella quello vecchio
        this.context.fillStyle = "red"; //imposta il colore del prossimo quadrato
        this.context.fillRect(component.x, component.y, 20, 20);//Viene creato il nuovo quadrato con le coordinate modificate dalla funzione moveup ecc.
                     
      
    }, 

}
function moveup() {
    snake.y -= 30;// cambia il component di draw()
  
  }
  
function movedown() {
    snake.y += 30;
  }
  
function moveleft() {
    snake.x -= 30;
  }
  
function moveright() {
    snake.x += 30;
  }

function updateGameArea() {
    
    myGameArea.draw(snake);
}
