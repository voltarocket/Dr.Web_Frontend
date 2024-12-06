
// Функция для вычисления ширины полосы прокрутки
function getScrollbarWidth() {
  const scrollDiv = document.createElement('div');
  scrollDiv.style.width = '100px';
  scrollDiv.style.height = '100px';
  scrollDiv.style.overflow = 'scroll';
  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-9999px';
  document.body.appendChild(scrollDiv);

  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);

  return scrollbarWidth;
}

// Загрузка модального окна
fetch('modal.html')
  .then(response => response.text())
  .then(data => {
    // Вставляем содержимое модального окна в контейнер
    document.getElementById('modalContainer').innerHTML = data;

    // Элементы
    const modal = document.getElementById('modal');
    const openModalButton = document.getElementById('openModal');

    // Получаем ширину полосы прокрутки
    const scrollbarWidth = getScrollbarWidth();

    // Открытие модального окна
    openModalButton.addEventListener('click', () => {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Отключить прокрутку страницы
      document.body.style.paddingRight = `${scrollbarWidth}px`; // Компенсация полосы прокрутки
    });

    // Закрытие модального окна при клике на фон
    modal.addEventListener('click', (event) => {
      // Проверяем, что клик произошёл именно на модальном фоне
      if (event.target.id === 'modal') {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Включить прокрутку
        document.body.style.paddingRight = ''; // Убрать отступ
      }
    });
  })
  .catch(error => console.error('Ошибка загрузки модального окна:', error));