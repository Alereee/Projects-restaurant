$(function(){

    // Обработчик события клика на стрелках, которые переключают разделы «О нас» и «Ценности». 
    // Он удалит и добавит классы values и about для элемента с id '#gallery'.
    $('.leftArrow').on('click', function() {
        $('#gallery').removeClass('values').addClass('about');
    });
    $('.rightArrow').on('click', function() {
        $('#gallery').removeClass('about').addClass('values');
    });

    // Добавьте обработчик события клика на левой стрелке, которая переключает отзывы.
    $('#leftReviewArrow').on('click', function(event) {

  // Проверьте наличия класса 'inactive' у целевого элемента события
        if ($(event.target).hasClass('inactive')) {
            return; // Выполнение будет прервано, если класс 'inactive' присутствует
        }
        
        // Получите контейнер отзывов
        const reviewsContainer = document.getElementById('reviews');

        // Вычислите смещение
        const offset = reviewsContainer.querySelector('.reviewContainer').offsetWidth;

        // Сместите контейнер отзывов влево на ширину отзыва плюс 30 пикселей
        reviewsContainer.scrollLeft -= offset + 30;

        // Удалите класс 'inactive' у элемента с id '#rightReviewArrow'
        $('#rightReviewArrow').removeClass('inactive');
    });

    // Добавьте обработчик события клика на правой стрелке, которая переключает отзывы.
    $('#rightReviewArrow').on('click', function(event) {
        if ($(event.target).hasClass('inactive')) {
            return; 
        }
        const reviewsContainer = document.getElementById('reviews');
        const offset = reviewsContainer.querySelector('.reviewContainer').offsetWidth;

        // Сместите контейнер отзывов вправо на ширину отзыва плюс 30 пикселей
        reviewsContainer.scrollLeft += offset + 30;
        $('#leftReviewArrow').removeClass('inactive');
    });

    // Добавьте обработчик события клика на кнопке 'Показать больше', который будет показывать и скрывать все отзывы.
    $('#showMore').on('click', function() {
        $('#reviews .reviewContainer').show();
        $('#showMore').hide();
    })

    // Добавьте обработчик события клика на кнопке 'Акция'
    $('#open-special-offer, .mobilePromo').on('click', function() {
        $('#special-offer').show();
    });
    $('#special-offer .close').on('click', function() {
        $('#special-offer').hide();
    });
});