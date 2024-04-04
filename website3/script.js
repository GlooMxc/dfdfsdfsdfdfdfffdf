document.addEventListener('DOMContentLoaded', function() {
    // Функция для создания кнопки "Сохранить"
    function createSaveButton() {
        var saveButton = document.createElement('button');
        saveButton.classList.add('save-btn');
        saveButton.textContent = 'Сохранить';
        saveButton.addEventListener('click', function() {
            // Находим родительский .mobile
            var mobile = this.closest('.mobile');
            // Находим все загоревшиеся кнопки внутри .mobile
            var litLamps = mobile.querySelectorAll('.lamp-on');
            // Создаем контейнер для группы 2
            var group2Container = document.createElement('div');
            group2Container.classList.add('group2');
            // Перемещаем загоревшиеся кнопки в контейнер группы 2
            litLamps.forEach(function(lamp) {
                group2Container.appendChild(lamp.cloneNode(true));
                lamp.classList.remove('lamp-on'); // Выключаем лампу после сохранения
            });
            // Создаем новый div для настроек
            var settingsDiv = document.createElement('div');
            settingsDiv.classList.add('settings');
            // Клонируем div с классом settings, чтобы создать новый блок настроек
            var originalSettings = mobile.querySelector('.settings');
            settingsDiv.appendChild(originalSettings.cloneNode(true));
            // Создаем новый блок для группы 2 внутри настроек
            var group2Settings = document.createElement('div');
            group2Settings.classList.add('group2');
            // Перемещаем загоревшиеся кнопки в блок настроек группы 2
            litLamps.forEach(function(lamp) {
                group2Settings.appendChild(lamp.cloneNode(true));
            });
            // Добавляем блок настроек группы 2 в новый блок настроек
            settingsDiv.appendChild(group2Settings);
            // Добавляем новый блок настроек в .mobile__content
            mobile.querySelector('.mobile__content').appendChild(settingsDiv);
        });
        return saveButton;
    }

    // Функция для создания кнопки "Назад"
    function createBackButton() {
        var backButton = document.createElement('button');
        backButton.classList.add('back-btn');
        backButton.addEventListener('click', function() {
            // Удаляем последний .mobile из тела документа
            var mobiles = document.querySelectorAll('.mobile');
            if (mobiles.length > 0) {
                var lastMobile = mobiles[mobiles.length - 1];
                document.body.removeChild(lastMobile);
            }
        });
        return backButton;
    }

    // Функция для создания .mobile
    function createMobile() {
        var newMobile = document.createElement('div');
        newMobile.classList.add('mobile');

        // Копируем содержимое .mobile__top из первого .mobile
        var topContent = document.querySelector('.mobile__top').cloneNode(true);
        newMobile.appendChild(topContent);

        // Создаем .mobile__content
        var content = document.createElement('div');
        content.classList.add('mobile__content');

        // Добавляем 14 div с названиями ламп в указанном порядке
        var lamps = [];
        for (var i = 1; i <= 14; i++) {
            lamps.push('Лампа ' + i);
        }

        var rows = 7; // Количество строк
        var cols = 2; // Количество столбцов

        for (var row = 0; row < rows; row++) {
            var rowDiv = document.createElement('div');
            rowDiv.classList.add('lamp-row');
            for (var col = 0; col < cols; col++) {
                var index = row * cols + col;
                if (index < lamps.length) {
                    var lampDiv = document.createElement('div');
                    lampDiv.textContent = lamps[index];
                    // Добавляем обработчик события на каждую лампу
                    lampDiv.addEventListener('click', function() {
                        // Включаем или выключаем лампу
                        this.classList.toggle('lamp-on');
                    });
                    rowDiv.appendChild(lampDiv);
                }
            }
            content.appendChild(rowDiv);
        }

        newMobile.appendChild(content);

        // Создаем .mobile__bottom с кнопками "Назад" и "Сохранить"
        var bottom = document.createElement('div');
        bottom.classList.add('mobile__bottom');
        var backButton = createBackButton(); // Создаем кнопку "Назад"
        var saveButton = createSaveButton(); // Создаем кнопку "Сохранить"
        saveButton.disabled = true; // Начально деактивируем кнопку "Сохранить"

        // Обёртка для кнопок "Назад" и "Сохранить"
        var buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('button-wrapper');
        buttonWrapper.appendChild(backButton);
        buttonWrapper.appendChild(saveButton); // Добавляем кнопку "Сохранить"

        bottom.appendChild(buttonWrapper); // Добавляем обёртку с кнопками

        newMobile.appendChild(bottom);

        return newMobile;
    }

    // Находим кнопку с классом groupadd
    var addButton = document.querySelector('.option[data-type="groupadd"]');
    
    // Добавляем обработчик события клика
    addButton.addEventListener('click', function() {
        // Создаем новый элемент .mobile
        var newMobile = createMobile();

        // Добавляем новый .mobile в тело документа
        document.body.appendChild(newMobile);
    });

    // Находим все кнопки
    var buttons = document.querySelectorAll('.option');

    // Для каждой кнопки добавляем обработчик события
    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Находим слайдер внутри кнопки
            var slider = button.querySelector('.slider');
            // Если слайдер не найден, выходим из функции
            if (!slider) return;
            
            // Тогглим состояние чекбокса
            var checkbox = button.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;
            
            // Добавляем класс для изменения стилей слайдера
            slider.classList.toggle('checked');
        });
    });
});
