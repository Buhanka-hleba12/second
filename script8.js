document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const openModalBtn = document.getElementById('open-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const form = document.getElementById('contact-form');
    const formFields = ['fullname', 'email', 'phone', 'organization', 'message', 'consent'];

    // Открытие модального окна
    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        history.pushState({ modalOpen: true }, '', '#form');
    });

    // Закрытие модального окна
    closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('popstate', () => {
        if (!location.hash.includes('form')) closeModal();
    });

    function closeModal() {
        modal.style.display = 'none';
        history.pushState({}, '', '/');
    }

    // Сохранение данных в LocalStorage
    form.addEventListener('input', () => {
        const formData = {};
        formFields.forEach(field => {
            if (field === 'consent') {
                formData[field] = form.elements[field].checked;
            } else {
                formData[field] = form.elements[field].value;
            }
        });
        localStorage.setItem('contactFormData', JSON.stringify(formData));
    });

    // Восстановление данных из LocalStorage
    function loadFormData() {
        const savedData = localStorage.getItem('contactFormData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            formFields.forEach(field => {
                if (field === 'consent') {
                    form.elements[field].checked = formData[field] || false;
                } else {
                    form.elements[field].value = formData[field] || '';
                }
            });
        }
    }

    // Отправка формы
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Отмена перезагрузки страницы
        const formData = new FormData(form);

        try {
            const response = await fetch('https://formcarry.com/s/your-form-id', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Форма успешно отправлена!');
                form.reset(); // Очистка формы
                localStorage.removeItem('contactFormData'); // Очистка LocalStorage
                closeModal();
            } else {
                alert('Ошибка при отправке формы. Попробуйте снова.');
            }
        } catch (error) {
            alert('Сетевая ошибка: ' + error.message);
        }
    });

    // Восстановление данных при загрузке страницы
    loadFormData();
});