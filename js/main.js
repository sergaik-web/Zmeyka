let butStart = document.getElementById('butStart'); //Ссылка на кнопку
let zmey = document.getElementById('zmeya');//Ссылка на голову змеи
let gorizont = 1; //горизонтальное расположение
let vertical = 1; //Вертикальное расположение
let key='ArrowRight';// нажатая клавиша

//нажитее на клавишу
document.addEventListener("keydown", function (e) {
       key = e.key;
       console.log(key);
});

let getCord = () => {
        let cordV = Math.round(Math.random()*100/5);
        let cordG = Math.round(Math.random()*100/5);
        return [cordV, cordG];
};

//создаём еду для змеи
let createEat = () => {
    let coord = getCord();
    console.log(coord);
    let crElem = document.createElement('div');
    crElem.style.gridColumn = coord[1];
    crElem.style.gridRow = coord[0];
    crElem.style.backgroundColor = 'red';
    document.getElementById('game-display').append(crElem);
};
createEat();

//Нажатие на кнопку
butStart.addEventListener("click", function () {
    function moveZmey() {
        if (key === 'ArrowRight'){
            (gorizont >= 20) ? gorizont = 1 : gorizont++;
            zmey.style.gridColumn = gorizont;
        } else if (key === 'ArrowLeft'){
            (gorizont <= 1) ? gorizont = 20 : gorizont--;
            zmey.style.gridColumn = gorizont;
        } else if (key === 'ArrowUp'){
            (vertical <= 1) ? vertical = 20 : vertical--;
            zmey.style.gridRow = vertical;
        } else if (key === 'ArrowDown'){
            (vertical >= 20) ? vertical = 1 : vertical++;
            zmey.style.gridRow = vertical;
        }
    }
    let time = setInterval(moveZmey,200);
})