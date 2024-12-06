// Функция для расчёта ширины полосы прокрутки
function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

// Переменные
const modalContainer = document.getElementById('modalContainer');
const openModalButton = document.getElementById('openModal');

// Загрузка модального окна из отдельного файла
fetch('modal.html')
  .then(response => response.text())
  .then(data => {
    modalContainer.innerHTML = data;

    // После загрузки модального окна получаем элементы
    const modal = document.getElementById("modal");
    const closeModalButton = document.getElementById("closeModal");

    // Открытие модального окна
    openModalButton.addEventListener("click", () => {
      modal.style.display = "flex";

      // Блокируем прокрутку и добавляем отступ
      const scrollbarWidth = getScrollbarWidth();
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    });

    // Закрытие модального окна
    closeModalButton.addEventListener("click", () => {
      modal.style.display = "none";

      // Включаем прокрутку и убираем отступ
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    });

    // Закрытие при клике на фон
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }
    });
  })
  .catch(error => console.error('Ошибка загрузки модального окна:', error));