document.addEventListener('DOMContentLoaded', function() {
    function createSaveButton() {
        var saveButton = document.createElement('button');
        saveButton.classList.add('save-btn');
        saveButton.textContent = 'Сохранить';
        saveButton.addEventListener('click', function() {
            var mobile = this.closest('.mobile');
            var litLamps = mobile.querySelectorAll('.lamp-on');
            var groupsContainer = document.querySelector('#groups .settings_tabs');
            if (litLamps.length > 0) {
                var groupContainer = document.createElement('div');
                groupContainer.classList.add('option');

                // Создаем иконку группы
                var groupIcon = document.createElement('i');
                groupIcon.classList.add('ic_paragraph-justify');
                groupContainer.appendChild(groupIcon);

                // Создаем крестик для удаления группы
                var deleteIcon = document.createElement('i');
                deleteIcon.classList.add('delete-icon');
                deleteIcon.textContent = '❌';
                deleteIcon.addEventListener('click', function() {
                    groupContainer.parentNode.removeChild(groupContainer);
                });
                groupContainer.appendChild(deleteIcon);

                // Создаем div для номеров ламп
                var lampsDiv = document.createElement('div');
                // Добавляем номера ламп в одну строку
                litLamps.forEach(function(lamp, index) {
                    if (index > 0) {
                        // Добавляем запятую или пробел между номерами ламп, кроме первого элемента
                        lampsDiv.textContent += ', ';
                    }
                    // Добавляем номер лампы
                    lampsDiv.textContent += lamp.textContent.replace('Лампа ', '');
                    lamp.classList.remove('lamp-on');
                });
                groupContainer.appendChild(lampsDiv);

                groupsContainer.appendChild(groupContainer);
            }
            mobile.parentNode.removeChild(mobile);
        });
        return saveButton;
    }

    function createBackButton() {
        var backButton = document.createElement('button');
        backButton.classList.add('back-btn');
        backButton.addEventListener('click', function() {
            var mobiles = document.querySelectorAll('.mobile');
            if (mobiles.length > 0) {
                var lastMobile = mobiles[mobiles.length - 1];
                document.body.removeChild(lastMobile);
            }
        });
        return backButton;
    }

    function createMobile() {
        var newMobile = document.createElement('div');
        newMobile.classList.add('mobile');

        var topContent = document.querySelector('.mobile__top').cloneNode(true);
        newMobile.appendChild(topContent);

        var content = document.createElement('div');
        content.classList.add('mobile__content');

        var lamps = [];
        for (var i = 1; i <= 14; i++) {
            lamps.push(i);
        }

        var rows = 7;
        var cols = 2;

        for (var row = 0; row < rows; row++) {
            var rowDiv = document.createElement('div');
            rowDiv.classList.add('lamp-row');
            for (var col = 0; col < cols; col++) {
                var index = row * cols + col;
                if (index < lamps.length) {
                    var lampDiv = document.createElement('div');
                    lampDiv.textContent = 'Лампа ' + lamps[index];
                    lampDiv.addEventListener('click', function() {
                        this.classList.toggle('lamp-on');
                    });
                    rowDiv.appendChild(lampDiv);
                }
            }
            content.appendChild(rowDiv);
        }

        newMobile.appendChild(content);

        var bottom = document.createElement('div');
        bottom.classList.add('mobile__bottom');
        var backButton = createBackButton();
        var saveButton = createSaveButton();

        var buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('button-wrapper');
        buttonWrapper.appendChild(backButton);
        buttonWrapper.appendChild(saveButton);

        bottom.appendChild(buttonWrapper);

        newMobile.appendChild(bottom);

        return newMobile;
    }

    var addButton = document.querySelector('.option[data-type="lightsadd"]');
    addButton.addEventListener('click', function() {
        var newMobile = createMobile();
        document.body.appendChild(newMobile);
    });

    var buttons = document.querySelectorAll('.option');
    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            var slider = button.querySelector('.slider');
            if (!slider) return;
            var checkbox = button.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;
            slider.classList.toggle('checked');
        });
    });
});
