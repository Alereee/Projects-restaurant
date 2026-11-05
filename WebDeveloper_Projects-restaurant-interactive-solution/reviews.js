$(function(){
    
    // Массив с данными отзывов
    const reviewsData = [
        {
            photo: "./assets/reviews/reviewIgor.png",
            name: "Игорь Ковалев",
            rating: 5,
            text: "Провели здесь день рождения - атмосфера просто великолепная. Персонал веселый и отзывчивый, кухня порадовала. Особенно понравились закуски к пиву! Обязательно будем возвращаться, чтобы попробовать все блюда из меню.",
        },        
        {
            photo: "./assets/reviews/reviewMarina.png",
            name: "Марина Соколова",
            rating: 4,
            text: "Посетили семейный ресторан с подругами на девичнике, и это был наш лучший выбор! У нас был волшебный вечер - вкусная еда, отличные коктейли и веселая атмосфера. Обязательно вернемся сюда с мужьями! Очень рекомендую для дружеских посиделок и праздников.",
        },        
        {
            photo: "./assets/reviews/reviewAleksandr.png",
            name: "Александр Петров",
            rating: 5,
            text: "Этот ресторан - настоящая находка! Проводил здесь деловой ужин с партнерами, и все остались в восторге. Обслуживание на высшем уровне, персонал внимателен к каждой детали. Кухня порадовала своим разнообразием. Отличное место для деловых встреч и ужинов в уютной обстановке. Рекомендую!",
        },        
        {
            photo: "./assets/reviews/reviewNatalya.png",
            name: "Наталья Иванова",
            rating: 5,
            text: "Посетили семейный ресторан вместе с мужем и детьми - отличное место для семейного ужина! Обстановка очень уютная, а обслуживание выше всяких похвал. Наши дети в восторге от детского меню, которое оказалось не только вкусным, но и заботливо подготовленным с учетом детских предпочтений. Будем рекомендовать всем друзьям и обязательно вернемся.",
        },
    ];

    // Цикл, который заполняет шаблон карточки данными из массива
    for (let reviewInfo of reviewsData) {

        // Создайте копии шаблона отзыва
        let reviewCard = document.getElementById('reviewTemplate').content.cloneNode(true);

        // Заполните копию данными отзыва
        reviewCard.querySelector('.reviewPhoto').setAttribute('src', reviewInfo.photo);
        reviewCard.querySelector('.reviewHeader').innerText = reviewInfo.name;
        reviewCard.querySelector('.reviewText').innerText = reviewInfo.text;
        
        // Добавьте звезды для рейтинга
        for (let index = 0; index < reviewInfo.rating; index += 1) {
            let star = document.createElement('img');
            star.setAttribute("src", "./assets/svg/star.svg");
            reviewCard.querySelector('.starRating').appendChild(star);
        }
        
        // Добавьте отзыв на страницу
        document.getElementById('reviews').appendChild(reviewCard);
    }

    // Событие, которое срабатывает, когда карточка с отзывом заполнена
    $(document).trigger('onReviewsCreated');
    
});
