const canvas = document.getElementById('worm');
const ctx = canvas.getContext('2d');

const pole = new Image();
pole.src = 'img/1.png';

const foodImg = new Image();
foodImg.src = 'img/food.png';

const snakeImg = new Image();
snakeImg.src = 'img/snak.png';

const finishSnakeImg = new Image();
finishSnakeImg.src = 'img/food.png';

const popap = document.getElementById('newElem');

const musik = document.getElementById('track');

let nameUser;

let nameStorage;



function gomusic() {
    musik.play();
}
const box = 50;
let caunt = 0;

function addUser () {
    nameUser = document.querySelector('input[name="userName"]').value;
    localStorage.setItem("name", nameUser)
}

function checkLocalStorage() {

    if (localStorage.getItem('name')) {
        nameStorage = localStorage.getItem('name')
        console.log(nameStorage)
    }
    
}

checkLocalStorage();

    function localResult() {
        for(let i=0; i<localStorage.length; i++) {
            let key = localStorage.key(i);
            console.log(`${key}: ${localStorage.getItem(key)}`);
          }
    }

    localResult()

let dir;

let food = {};


let snake = [];
snake[0] = {
    x: 6 * box,
    y: 5 * box
};

let objCaunts = [
    ];


function newFood (){
    food = {
        x: Math.floor(Math.random() * 12 + 1) * box,
        y: Math.floor(Math.random() * 10 + 1) * box
    };
    for (i=0; i<snake.length; i++) {
        if (snake[i].x == food.x && snake[i].y == food.y) {
            console.log('перетянул');
            newFood();
    };
}
};
newFood();


document.addEventListener("keydown", (e));

function e (event) {
    if(event.keyCode == 37 && dir !='right')
    dir = 'left';
    else if(event.keyCode == 38 && dir !='down')
    dir = 'up';
    else if(event.keyCode == 39 && dir !='left')
    dir = 'right';
    else if(event.keyCode == 40 && dir !='up')
    dir = 'down';
}

function eatSnakeSelf (head, body) {
    for (i=0; i<body.length; i++) {
        if (head.x == body[i].x && head.y == body[i].y) {
        popap.style.display = 'block';
    }
    }
}

function drawGame () {
    ctx.drawImage(pole, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y, box, box);

    for(let i=0; i<snake.length; i++) {
        ctx.drawImage( i == 0? snakeImg: finishSnakeImg, snake[i].x, snake[i].y, box, box);
    };


    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.fillText((nameUser?nameUser:nameStorage)+': '+caunt, box*2.2, box*0.9);


    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX == food.x && snakeY == food.y) {
        gomusic();
        caunt++;
        newFood();
    } else {
        snake.pop();
    }

    if (snakeX < box || snakeX > box * 12 || snakeY < box|| snakeY > box * 10) {
        popap.style.display = 'block';
        clearInterval(game)
        localStorage.setItem(nameUser, caunt)
    }

    

    if (dir=='left') snakeX -= box;
    if (dir=='right') snakeX += box;
    if (dir=='up') snakeY -= box;
    if (dir=='down') snakeY += box;

    let run = {
        x:snakeX,
        y:snakeY,
    };

    eatSnakeSelf (run, snake)

    snake.unshift(run);

}

let game = setInterval(drawGame, 200);


let newRepits = () => {
    snake = [];
    snake[0] = {
        x: 6 * box,
        y: 5 * box
    };
    dir = 0;
    caunt = 0;
    if (popap.style.display = 'block')
    popap.style.display = 'none';
    game = setInterval(drawGame, 200);
}