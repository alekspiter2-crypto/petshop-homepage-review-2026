const checkoutLayout = document.querySelector('[data-checkout-layout]');
const checkoutForm = document.querySelector('[data-checkout-form]');
const checkoutSummary = document.querySelector('[data-checkout-summary]');
const checkoutSuccess = document.querySelector('[data-checkout-success]');

function checkoutPrice(value) {
  return `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;
}

function renderCheckout() {
  const items = window.PetshopCart?.read() || [];
  if (!items.length) {
    checkoutLayout.innerHTML = `<div class="cart-empty"><span>🛒</span><h2>Сначала добавьте товары</h2><p>Оформить пустую корзину нельзя.</p><a href="index.html#catalog">Перейти к товарам</a></div>`;
    return;
  }
  const count = window.PetshopCart.count(items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  checkoutSummary.innerHTML = `<h2>Ваш заказ</h2><div class="checkout-summary__items">${items.map((item) => `<div><img src="assets/${item.image}" alt=""><span>${item.title}<small>${item.quantity} × ${checkoutPrice(item.price)}</small></span></div>`).join('')}</div><div class="cart-summary__total"><span>Итого (${count})</span><strong>${checkoutPrice(total)}</strong></div><p>Доставка бесплатно</p>`;
}

checkoutForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!checkoutForm.reportValidity()) return;
  window.PetshopCart.write([]);
  checkoutLayout.hidden = true;
  document.querySelector('.cart-heading').hidden = true;
  checkoutSuccess.hidden = false;
  checkoutSuccess.focus?.();
});

renderCheckout();
