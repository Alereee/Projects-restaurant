$(function(){
    
    // Создайте объект параметров для наблюдателя кнопок
    const buttonObserverOptions = {
        root: null,
        rootMargin: "0px",
        threshold: [0, 1],
    };

    // Инициализируйте переменную для хранения состояния видимости кнопок
    let buttonIsShown = {};

    // Создайте наблюдатель для кнопок
    const observerButtons = new IntersectionObserver(function(entries, observer) {
            // Проверьте ширину экрана и прервите выполнение, если она меньше или равна 750 пикселей
            if (document.documentElement.clientWidth <= 750) return;

            // Обработайте каждую запись
            entries.forEach((entry) => {
                let btn = entry.target;

                // Сохраните состояние кнопки
                buttonIsShown[btn.dataset.observeid] = entry.isIntersecting;
            });

            // Проверьте, есть ли на экране хотя бы одна кнопка, и скройте или покажите кнопку «Акция»
            if (Object.values(buttonIsShown).some(x => x)) {
                $('#open-special-offer').hide();
            } else {
                $('#open-special-offer').show();
            }
        },
        buttonObserverOptions
    );

    // Переберите все кнопки .bigButton, преобразуйте их в массив и присвойте каждой кнопке уникальный идентификатор
    $('.bigButton').toArray().forEach( (btn, btnIdx) => {
        btn.dataset.observeid = btnIdx;
        observerButtons.observe(btn);
    });
});

// Создайте обработчик события для onReviewsCreated, это позволит отслеживать момент, когда все карточки с отзывами загрузились
$(document).on('onReviewsCreated', function(){
    // Получите контейнер отзывов и первый и последний отзывы
    const container = document.getElementById('reviews');
    const firstReview = container.firstElementChild;
    const lastReview = container.lastElementChild;
    
    // Создайте объект параметров для наблюдателя
    const options = {
        root: container,
        rootMargin: "0px",
        threshold: 0.9,
    };
    
    // Создайте функцию обратного вызова для наблюдателя
    const callbackCreator = function(arrowSelector) {
        return (entries, observer) => {
            entries.forEach((entry) => {

                // Если отзыв полностью на экране, добавьте класс 'inactive' к соответствующей стрелке
                if (entry.isIntersecting) {
                    $(arrowSelector).addClass('inactive');
                }
            });
        };
    }

    // Создайте наблюдатель для последнего отзыва
    const observerLastReview = new IntersectionObserver(callbackCreator('#rightReviewArrow'), options);
    observerLastReview.observe(lastReview);

    // Создайте наблюдатель для первого отзыва
    const observerFirstReview = new IntersectionObserver(callbackCreator('#leftReviewArrow'), options);
    observerFirstReview.observe(firstReview);

});
