// Создаем массив для хранения ID зеленых прямоугольников
let greenRectangleIds = [];

function addMobile() {
    const container = document.querySelector('.container');
    const mobile = document.createElement('div');
    mobile.classList.add('mobile');

    mobile.innerHTML = `
        <span class="close-btn" onclick="closeMobile(this)">✖</span>
        <div class="mobile__top">
            <img src="./img/top.svg">
        </div>
        <div class="mobile__content1">
            <div class="left-column"></div>
            <div class="right-column"></div>
        </div>
        <button class="save-btn" onclick="saveGroup()">Сохранить группу</button>
    `;
    
    container.appendChild(mobile);
    for (let i = 1; i <= 14; i++) {
        const rectangle = document.createElement('div');
        rectangle.classList.add('rectangle');
        rectangle.setAttribute('id', `rectangle-${i}`);
        rectangle.onclick = function() {
            if (this.style.backgroundColor === 'green') {
                this.style.backgroundColor = 'lightgray';
                // Удаление ID прямоугольника из массива при изменении цвета на серый
                const idIndex = greenRectangleIds.indexOf(i);
                if (idIndex !== -1) {
                    greenRectangleIds.splice(idIndex, 1);
                }
            } else {
                this.style.backgroundColor = 'green';
                // Добавление ID прямоугольника в массив при изменении цвета на зеленый
                if (!greenRectangleIds.includes(i)) {
                    greenRectangleIds.push(i);
                }
            }
        };

        if (i <= 7) {
            document.querySelector('.left-column').appendChild(rectangle);
        } else {
            document.querySelector('.right-column').appendChild(rectangle);
        }
    }
}

function closeMobile(el) {
    const container = document.querySelector('.container');
    container.removeChild(el.parentNode);
}

let savedGroupCounter = 1;

function saveGroup() {
    const savedGroups = document.querySelector('.savedgroups');
    const groupDiv = document.createElement('div');
    groupDiv.classList.add('savedgroup');
    groupDiv.id = `savedgroup-${savedGroupCounter}`; // Уникальный ID для savedgroup
    savedGroupCounter++;

    const span = document.createElement('span');
    greenRectangleIds.forEach((id, index) => {
        if (index > 0) {
            span.textContent += ' ';
        }
        span.textContent += id;
    });

    if (span.textContent.trim() !== '') {
        groupDiv.appendChild(span);
        savedGroups.appendChild(groupDiv);
    }

    const label = document.createElement('label');
    label.classList.add('switchs');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.style.width = '0px'; // Установка размеров 0x0 px
    input.style.height = '0px';
    const slider = document.createElement('span');
    slider.classList.add('slider', 'round');

    label.appendChild(input);
    label.appendChild(slider);
    groupDiv.appendChild(label);

    closeMobile(document.querySelector('.save-btn'));
    greenRectangleIds = [];
}

