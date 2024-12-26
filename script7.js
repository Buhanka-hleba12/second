document.addEventListener('DOMContentLoaded', () => {
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const leftArrow = document.querySelector('.arrow.left');
    const rightArrow = document.querySelector('.arrow.right');
    const pager = document.querySelector('.pager');

    let slidesToShow = window.innerWidth <= 600 ? 1 : 3; // Определяем количество слайдов для отображения
    let currentPage = 0;
    let totalPages;

    // Функция инициализации
    const initializeSlider = () => {
        slidesToShow = window.innerWidth <= 600 ? 1 : 3;
        totalPages = Math.ceil(slides.length / slidesToShow);
        createPager();
        updateSlider();
    };

    // Создание пейджера
    const createPager = () => {
        pager.innerHTML = ''; // Очистка пейджера
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.classList.add('pager-dot');
            if (i === 0) dot.classList.add('active');
            pager.appendChild(dot);
        }
        const dots = document.querySelectorAll('.pager-dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentPage = index;
                updateSlider();
            });
        });
    };

    // Функция обновления слайдера
    const updateSlider = () => {
        const slideWidth = slides[0].clientWidth;
        sliderTrack.style.transform = `translateX(-${currentPage * slideWidth * slidesToShow}px)`;

        // Обновление активного индикатора
        const dots = document.querySelectorAll('.pager-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPage);
        });
    };

    // Навигация
    rightArrow.addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            updateSlider();
        }
    });

    leftArrow.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updateSlider();
        }
    });

    // Слушатель изменения размера окна
    window.addEventListener('resize', () => {
        currentPage = 0; // Возврат на первую страницу
        initializeSlider();
    });

    // Инициализация слайдера
    initializeSlider();
});