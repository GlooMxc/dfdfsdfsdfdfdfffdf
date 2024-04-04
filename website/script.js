function ToggleMobile() {
    // Создаем новый элемент div для mobile
    var newMobileDiv = document.createElement('div');
    newMobileDiv.classList.add('mobile');

    // Получаем содержимое .mobile__top из оригинала
    var mobileTopContent = document.querySelector('.mobile__top').innerHTML;

    // Создаем дочерний элемент для .mobile с классом .mobile__top
    var mobileTopDiv = document.createElement('div');
    mobileTopDiv.classList.add('mobile__top');
    // Копируем содержимое .mobile__top из оригинала
    mobileTopDiv.innerHTML = mobileTopContent;

    // Создаем элемент для кнопки возврата (крестика)
    var closeButton = document.createElement('div');
    closeButton.classList.add('close_button');
    closeButton.innerHTML = '×'; // Используем символ "×"
    closeButton.onclick = function() {
        CloseMobile(newMobileDiv);
    };

    // Добавляем кнопку возврата вниз посередине .mobile__top
    mobileTopDiv.appendChild(closeButton);

    // Добавляем элемент mobile__top внутрь элемента mobile
    newMobileDiv.appendChild(mobileTopDiv);

    // Создаем элемент .mobile__content
    var mobileContentDiv = document.createElement('div');
    mobileContentDiv.classList.add('mobile__content');

    // Добавляем .mobile__content внутрь .mobile
    newMobileDiv.appendChild(mobileContentDiv);

    // Создаем кнопки ламп
    for (var i = 1; i <= 14; i++) {
        var lampButton = document.createElement('button');
        lampButton.classList.add('lamp');
        lampButton.innerHTML = 'Lamp ' + i;
        mobileContentDiv.appendChild(lampButton);
    }

    // Добавляем новый элемент на страницу
    document.body.appendChild(newMobileDiv);
}

function CloseMobile(mobileElement) {
    if (mobileElement) {
        mobileElement.remove();
    }
}
