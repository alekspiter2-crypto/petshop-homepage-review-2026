const cartItemsRoot = document.querySelector('[data-cart-items]');
const cartSummaryRoot = document.querySelector('[data-cart-summary]');
const cartHeading = document.querySelector('[data-cart-heading]');

function formatPrice(value) {
  return `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;
}

function renderCart() {
  if (!cartItemsRoot || !window.PetshopCart) return;
  const items = window.PetshopCart.read();
  const itemCount = window.PetshopCart.count(items);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartHeading.textContent = itemCount ? `${itemCount} ${itemCount === 1 ? 'товар' : itemCount < 5 ? 'товара' : 'товаров'} в заказе` : 'Корзина пока пуста';

  if (!items.length) {
    cartItemsRoot.innerHTML = `<div class="cart-empty"><span>🛒</span><h2>В корзине ничего нет</h2><p>Добавьте корм, наполнитель или другие товары из подборки.</p><a href="index.html#catalog">Перейти к товарам</a></div>`;
    cartSummaryRoot.hidden = true;
    return;
  }

  cartSummaryRoot.hidden = false;
  cartItemsRoot.innerHTML = items.map((item) => `
    <article class="cart-item" data-cart-item="${item.id}">
      <img src="assets/${item.image}" alt="${item.title}">
      <div class="cart-item__copy"><h2>${item.title}</h2><p>Доставим сегодня с 18:00</p><button type="button" data-cart-remove="${item.id}">Удалить</button></div>
      <div class="cart-item__quantity" aria-label="Количество товара">
        <button type="button" aria-label="Уменьшить количество" data-cart-step="-1" data-cart-id="${item.id}">−</button>
        <b aria-live="polite">${item.quantity}</b>
        <button type="button" aria-label="Увеличить количество" data-cart-step="1" data-cart-id="${item.id}">+</button>
      </div>
      <strong>${formatPrice(item.price * item.quantity)}</strong>
    </article>`).join('');

  cartSummaryRoot.innerHTML = `
    <h2>Ваш заказ</h2>
    <dl><div><dt>Товары (${itemCount})</dt><dd>${formatPrice(subtotal)}</dd></div><div><dt>Доставка</dt><dd class="is-free">Бесплатно</dd></div></dl>
    <div class="cart-summary__total"><span>Итого</span><strong>${formatPrice(subtotal)}</strong></div>
    <a class="cart-summary__checkout" href="checkout.html">Перейти к оформлению</a>
    <p>На следующем шаге можно выбрать адрес и время доставки.</p>`;

  const focusId = new URLSearchParams(window.location.search).get('focus');
  if (focusId) requestAnimationFrame(() => document.querySelector(`[data-cart-item="${CSS.escape(focusId)}"]`)?.scrollIntoView({ block: 'center' }));
}

document.addEventListener('click', (event) => {
  const stepButton = event.target.closest('[data-cart-step]');
  if (stepButton) {
    const item = window.PetshopCart.read().find((entry) => entry.id === stepButton.dataset.cartId);
    if (item) window.PetshopCart.setQuantity(item.id, item.quantity + Number(stepButton.dataset.cartStep));
    renderCart();
    return;
  }
  const removeButton = event.target.closest('[data-cart-remove]');
  if (removeButton) {
    window.PetshopCart.remove(removeButton.dataset.cartRemove);
    renderCart();
    return;
  }
});

window.addEventListener('petshop-cart-change', renderCart);
renderCart();
