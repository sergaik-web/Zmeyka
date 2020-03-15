

let butStart = document.getElementById('butStart'); //Ссылка на кнопку
let zmey = document.getElementById('zmeya');//Ссылка на голову змеи
let gorizont = 1; //горизонтальное расположение
let vertical = 1; //Вертикальное расположение
let key='ArrowRight';// нажатая клавиша
let historyCord = [];
let time;
zmey.style.gridColumn = gorizont;
zmey.style.gridRow = vertical;

//нажатие на клавишу
document.addEventListener("keydown", function (e) {
       key = e.key;
});

//Функция передвижения змеи
let moveZmey = () => {
    historyCord = [vertical, gorizont];

    if (document.querySelectorAll('.hvost').length>1) {
        moveHvost();
    }

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

    if (checkGameOver()) {
        clearInterval(time);
    }


    // Проверка сьели ли еду и выхов соответствующей функции
    if (document.getElementById('eat').style.gridRow === String (vertical + ' / auto') &&  document.getElementById('eat').style.gridColumn === String (gorizont + ' / auto')) {
        eating(document.getElementById('eat'));
    }
};

//Движения хвоста за головой змеи
let moveHvost = () => {
    let massElem = document.querySelectorAll('.hvost');
    for (let i=massElem.length-1; i>0; i--) {
        massElem[i].style.gridRow = massElem[i-1].style.gridRow;
        massElem[i].style.gridColumn = massElem[i-1].style.gridColumn;
    }
};

// Сьедаем еду
let eating = (elem) => {
    elem.id = '';
    elem.className = 'hvost';
    elem.style.backgroundColor = 'darkolivegreen';
    createEat();
};


//Получаем координаты
let getCord = () => {
        let cordV = Math.round(Math.random()*100/5.2)+1;
        let cordG = Math.round(Math.random()*100/5.2)+1;
        return [cordV, cordG];
};

//создаём еду для змеи
let createEat = () => {
    let coord = getCord();
    let crElem = document.createElement('div');
    crElem.style.gridColumn = coord[1];
    crElem.style.gridRow = coord[0];
    crElem.style.backgroundColor = 'red';
    crElem.id = 'eat';
    document.getElementById('game-display').append(crElem);
};
createEat();

//Нажатие на кнопку
butStart.addEventListener("click", function () {
    time=setInterval(moveZmey,200);
});

//Проверка пересечения тела с головой
let checkGameOver = () => {
    let massElem = document.querySelectorAll('.hvost');
    let massData = [];
    massElem.forEach(e => massData.push([e.style.gridRow, e.style.gridColumn]));
    for (let i=1; i<massData.length; i++) {
        console.log(massData[i]);
    }
};

let gameOver = () => {
    clearInterval(time);
};