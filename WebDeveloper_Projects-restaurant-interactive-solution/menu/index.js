// Создайте асинхронную функцию init()
async function init() {

    // Получите значение параметра 'cat' из URL，на котором находится пользователь. 
    // Перенаправьте по умолчанию пользователя на страницу с десертами.
    const category = new URL(document.location).searchParams.get('cat') ?? 'dessert';

    // Отключите кнопку с соответствующим значением 'data-cat'
    $(`#menu-categories button[data-cat="${category}"]`).attr('disabled', true);

    // Отправьте запрос на сервер, чтобы получить данные о категории меню
    const response = await fetch(`/menu/${category}.json`);

    // Проверьте, что запрос сработал успешно
    if (response.ok) {

        // Если ответ успешный, получите данные в формате JSON
        const data = await response.json();

        // Получите шаблон карточки меню
        const template = document.getElementById('menuItemCard');

        // Переберите каждый элемент массива
        for (itemInfo of data) {

            // Создайте копию шаблона
            let card = template.content.cloneNode(true);

            // Заполните карточку данными из массива
            card.querySelector('.menuItemPic').setAttribute('src', itemInfo['pic']);
            card.querySelector('.detailsButton').dataset.details = itemInfo['details'];
            card.querySelector('.detailsButton').dataset.kcal = itemInfo['kcal'];
            card.querySelector('.menuItemName').innerText = itemInfo['name'];
            card.querySelector('.menuItemPrice').innerText = itemInfo['price'];

            // Добавьте карточку меню на страницу
            document.getElementById('menu').appendChild(card);
        }
    } else {

        // Если ответ не успешный, перенаправьте пользователя на страницу меню
        document.location.href = "/menu";
    }

    // Добавьте обработчик события клика на кнопки с классом 'detailsButton'
    $('.detailsButton').on('click', function(event) {

        // Получите название, цену, калорийность и детали блюда, используя данные из кнопки, по которой кликнул пользователь
        const name = $(event.target).closest('.menuItem').find('.menuItemName').text();
        const price = $(event.target).closest('.menuItem').find('.menuItemPrice').text();
        const kcal = $(event.target).data('kcal');
        const details = $(event.target).data('details');
        
        // Обновите содержимое окна «Подробнее»
        $('#detailsTitle').text(name);
        $('#detailsKcal').text(`${kcal} ккал`);
        $('#detailsPrice').text(price);
        $('#detailsInfo').text(details);

        // Покажите окно «Подробнее»
        $('#detailsWindow').show();
    });

    // Добавьте обработчик события клика на кнопку закрытия всплывающего окна «Подробнее»
    $('#detailsClose').on('click', function(event) {

        // Скройте окно с дополнительной информацией
        $('#detailsWindow').hide();
    });
}

// Вызовите функцию init()
init();
