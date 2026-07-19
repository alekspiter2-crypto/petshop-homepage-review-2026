const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

const toast = $('[data-toast-box]');
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2400);
}

function galleryFiles(slug, count, jpgIndexes = []) {
  return Array.from({ length: count }, (_, index) => {
    const number = index + 1;
    const extension = jpgIndexes.includes(number) ? 'jpg' : 'png';
    return `gallery/${slug}/${String(number).padStart(2, '0')}.${extension}`;
  });
}

const productGalleries = {
  savita: galleryFiles('savita', 13, [13]),
  organix: galleryFiles('organix', 15, [1]),
  vancat: galleryFiles('vancat', 8),
  florida: galleryFiles('florida', 15),
  taormina: galleryFiles('taormina', 14),
  gokitchen: galleryFiles('gokitchen', 15)
};

const products = [
  { gallery: 'savita', image: 'product-renal.png', badge: '−12%', badgeClass: 'orange', price: '1 099 ₽', oldPrice: '1 249 ₽', title: 'Savita Renal сухой корм для здоровья почек', rating: '4,9', reviews: '842 отзыва', delivery: 'Завтра' },
  { gallery: 'organix', image: 'product-rabbit.jpg', badge: 'Хит', badgeClass: 'pink', price: '519 ₽', oldPrice: '590 ₽', title: 'Organix Sterilised корм с кроликом, фруктами и овощами', rating: '4,8', reviews: '291 отзыв', delivery: 'Сегодня' },
  { gallery: 'vancat', image: 'product-litter.png', badge: 'Новинка', badgeClass: 'purple', price: '579 ₽', oldPrice: '644 ₽', title: 'Van Cat Marseille Soap комкующийся наполнитель без пыли', rating: '4,9', reviews: '1 230 отзывов', delivery: 'Завтра' },
  { gallery: 'florida', image: 'product-salmon.png', badge: 'Цена дня', badgeClass: 'green', price: '3 959 ₽', oldPrice: '4 399 ₽', title: 'Florida Sterilised 34 корм с лососем и черникой', rating: '5,0', reviews: '536 отзывов', delivery: 'Сегодня' },
  { gallery: 'taormina', image: 'product-turkey.png', badge: '−10%', badgeClass: 'orange', price: '2 924 ₽', oldPrice: '3 249 ₽', title: 'Taormina Southern Forest корм со свежей индейкой', rating: '4,9', reviews: '702 отзыва', delivery: 'Завтра' },
  { gallery: 'gokitchen', image: 'product-dog.png', badge: 'Только у нас', badgeClass: 'blue', price: '1 749 ₽', oldPrice: '1 990 ₽', title: 'GO’KITCHEN Sensitivities корм с индейкой и овощами', rating: '4,8', reviews: '418 отзывов', delivery: 'Сегодня' },
  { gallery: 'organix', image: 'product-rabbit.jpg', badge: '−18%', badgeClass: 'orange', price: '459 ₽', oldPrice: '559 ₽', title: 'Organix Sterilised корм с кроликом, фруктами и овощами', rating: '4,9', reviews: '615 отзывов', delivery: 'Сегодня' },
  { gallery: 'vancat', image: 'product-litter.png', badge: 'Выбор хозяев', badgeClass: 'pink', price: '899 ₽', oldPrice: '1 050 ₽', title: 'Van Cat Marseille Soap комкующийся наполнитель без пыли', rating: '4,8', reviews: '934 отзыва', delivery: 'Завтра' },
  { gallery: 'gokitchen', image: 'product-dog.png', badge: '−15%', badgeClass: 'green', price: '1 469 ₽', oldPrice: '1 729 ₽', title: 'GO’KITCHEN Sensitivities корм с индейкой и овощами', rating: '4,7', reviews: '382 отзыва', delivery: 'Сегодня' },
  { gallery: 'florida', image: 'product-salmon.png', badge: 'Хит', badgeClass: 'pink', price: '3 499 ₽', oldPrice: '3 990 ₽', title: 'Florida Sterilised 34 корм с лососем и черникой', rating: '5,0', reviews: '1 102 отзыва', delivery: 'Сегодня' },
  { gallery: 'taormina', image: 'product-turkey.png', badge: 'Petshop рекомендует', badgeClass: 'blue', price: '2 699 ₽', oldPrice: '2 999 ₽', title: 'Taormina Southern Forest корм со свежей индейкой', rating: '4,9', reviews: '528 отзывов', delivery: 'Завтра' },
  { gallery: 'savita', image: 'product-renal.png', badge: 'Ветаптека', badgeClass: 'purple', price: '1 249 ₽', oldPrice: '1 399 ₽', title: 'Savita Renal сухой корм для здоровья почек', rating: '4,8', reviews: '246 отзывов', delivery: 'Сегодня' },
  { gallery: 'gokitchen', image: 'product-dog.png', badge: '−20%', badgeClass: 'orange', price: '1 399 ₽', oldPrice: '1 749 ₽', title: 'GO’KITCHEN Sensitivities корм с индейкой и овощами', rating: '4,9', reviews: '744 отзыва', delivery: 'Сегодня' },
  { gallery: 'organix', image: 'product-rabbit.jpg', badge: 'Новинка', badgeClass: 'purple', price: '639 ₽', oldPrice: '710 ₽', title: 'Organix Sterilised корм с кроликом, фруктами и овощами', rating: '4,7', reviews: '189 отзывов', delivery: 'Завтра' },
  { gallery: 'vancat', image: 'product-litter.png', badge: '−11%', badgeClass: 'orange', price: '729 ₽', oldPrice: '819 ₽', title: 'Van Cat Marseille Soap комкующийся наполнитель без пыли', rating: '4,9', reviews: '815 отзывов', delivery: 'Сегодня' },
  { gallery: 'florida', image: 'product-salmon.png', badge: 'Цена дня', badgeClass: 'green', price: '3 749 ₽', oldPrice: '4 249 ₽', title: 'Florida Sterilised 34 корм с лососем и черникой', rating: '5,0', reviews: '623 отзыва', delivery: 'Сегодня' },
  { gallery: 'taormina', image: 'product-turkey.png', badge: 'Хит', badgeClass: 'pink', price: '2 849 ₽', oldPrice: '3 199 ₽', title: 'Taormina Southern Forest корм со свежей индейкой', rating: '4,9', reviews: '911 отзывов', delivery: 'Завтра' },
  { gallery: 'savita', image: 'product-renal.png', badge: 'Только у нас', badgeClass: 'blue', price: '1 159 ₽', oldPrice: '1 299 ₽', title: 'Savita Renal сухой корм для здоровья почек', rating: '4,8', reviews: '307 отзывов', delivery: 'Сегодня' }
];

const promos = [
  { tone: 'purple', icon: '↻', eyebrow: 'Автозаказ Petshop', title: 'До −30% на любимые товары', text: 'Настройте один раз — доставим по расписанию', image: 'product-turkey.png', action: 'Настроить', toast: 'Настройка автозаказа открыта' },
  { tone: 'orange', icon: '%', eyebrow: 'Только до воскресенья', title: '−20% на влажный корм', text: 'Выгодные наборы для кошек и собак', image: 'product-rabbit.jpg', action: 'Выбрать', toast: 'Открыли товары со скидкой' },
  { tone: 'blue', icon: '⚡', eyebrow: 'Petshop экспресс', title: 'Доставка сегодня', text: 'Выберите удобный интервал при оформлении', image: 'product-dog.png', action: 'Подробнее', toast: 'Условия быстрой доставки открыты' },
  { tone: 'green', icon: '✚', eyebrow: 'Забота каждый день', title: 'Ветаптека до −15%', text: 'Здоровье и уход с быстрой доставкой', image: 'product-renal.png', action: 'Смотреть', toast: 'Открыли подборку ветаптеки' }
];

function productCard(product) {
  const images = productGalleries[product.gallery] || [`${product.image}`];
  const imageMarkup = images.map((image, index) => `
          <img class="preview-image${index === 0 ? ' is-active' : ''}" src="assets/${image}" alt="${index === 0 ? product.title : ''}" ${index === 0 ? '' : 'loading="lazy" '}decoding="async" data-preview-image="${index}">`).join('');
  const zoneMarkup = images.map((_, index) => `<span class="preview-zone" data-preview-zone="${index}"></span>`).join('');
  const dotMarkup = images.map((_, index) => `<i${index === 0 ? ' class="is-active"' : ''} data-preview-dot="${index}"></i>`).join('');
  return `
    <article class="product-card">
      <div class="product-card__visual" data-card-preview>
        <span class="badge badge--${product.badgeClass}">${product.badge}</span>
        <button class="favorite" type="button" aria-label="Добавить в избранное" aria-pressed="false" data-favorite><svg><use href="#i-heart"/></svg></button>
        <div class="preview-images">
          ${imageMarkup}
        </div>
        <div class="preview-zones" aria-hidden="true">
          ${zoneMarkup}
        </div>
        <button class="preview-arrow preview-arrow--prev" type="button" aria-label="Предыдущее фото" data-preview-step="-1">‹</button>
        <button class="preview-arrow preview-arrow--next" type="button" aria-label="Следующее фото" data-preview-step="1">›</button>
        <span class="preview-counter" aria-live="polite"><b data-preview-current>1</b> / ${images.length}</span>
        <div class="preview-dots" aria-hidden="true">
          ${dotMarkup}
        </div>
      </div>
      <div class="price-row"><strong>${product.price}</strong><del>${product.oldPrice}</del></div>
      <h3>${product.title}</h3>
      <div class="rating" aria-label="Рейтинг ${product.rating}, ${product.reviews}">
        <span class="rating__star">★</span><b>${product.rating}</b><span>· ${product.reviews}</span>
      </div>
      <div class="delivery"><i></i>${product.delivery}</div>
      <button class="add-cart" type="button" aria-label="Добавить товар в корзину" aria-pressed="false" data-add-cart data-product-id="${product.gallery}"><svg><use href="#i-cart"/></svg><span>В корзину</span></button>
    </article>
  `;
}

function productRow(offset) {
  return Array.from({ length: 6 }, (_, index) => products[(offset + index) % products.length])
    .map(productCard)
    .join('');
}

function promoStrip(promo, isFirst) {
  return `
    <aside class="promo-strip promo-strip--${promo.tone}"${isFirst ? ' id="auto"' : ''}>
      <span class="promo-strip__icon">${promo.icon}</span>
      <div class="promo-strip__copy">
        <span class="promo-strip__eyebrow">${promo.eyebrow}</span>
        <h3>${promo.title}</h3>
        <p>${promo.text}</p>
      </div>
      <button type="button" data-toast="${promo.toast}">${promo.action}</button>
      <img src="assets/${promo.image}" alt="">
    </aside>
  `;
}

function feedBatch(index) {
  const start = index * 12;
  const promo = promos[index % promos.length];
  return `
    <section class="feed-batch" aria-label="Подборка товаров">
      <div class="product-grid">${productRow(start)}</div>
      ${promoStrip(promo, index === 0)}
      <div class="product-grid">${productRow(start + 6)}</div>
    </section>
  `;
}

const feed = $('[data-product-feed]');
const feedSentinel = $('[data-feed-sentinel]');
const feedTitle = $('[data-feed-title]');
const feedSubtitle = $('[data-feed-subtitle]');
const initialSearch = new URLSearchParams(window.location.search).get('search')?.trim() || '';
let activeFilter = 'all';
let searchQuery = initialSearch;
let batchIndex = 0;
let feedLoading = false;

function uniqueProducts() {
  return products.filter((product, index) => products.findIndex((item) => item.gallery === product.gallery) === index);
}

function currentProducts() {
  const query = searchQuery.toLocaleLowerCase('ru');
  return uniqueProducts().filter((product) => {
    const matchesQuery = !query || `${product.title} ${product.gallery}`.toLocaleLowerCase('ru').includes(query);
    const matchesFilter = activeFilter === 'all'
      || (activeFilter === 'sale' && (product.badge.includes('−') || product.badge === 'Цена дня'))
      || (activeFilter === 'cats' && product.gallery !== 'gokitchen')
      || (activeFilter === 'dogs' && product.gallery === 'gokitchen');
    return matchesQuery && matchesFilter;
  });
}

function syncProductButtons() {
  if (!window.PetshopCart) return;
  const ids = new Set(window.PetshopCart.read().map((item) => item.id));
  $$('[data-add-cart]').forEach((button) => {
    const added = ids.has(button.dataset.productId);
    button.classList.toggle('is-added', added);
    button.setAttribute('aria-pressed', String(added));
    button.setAttribute('aria-label', added ? 'Перейти в корзину' : 'Добавить товар в корзину');
  });
}

function renderFeed() {
  if (!feed) return;
  feed.innerHTML = '';
  batchIndex = 0;
  const isFiltered = activeFilter !== 'all' || Boolean(searchQuery);
  if (!isFiltered) {
    feedSentinel.hidden = false;
    appendFeedBatch();
    appendFeedBatch();
    if (feedTitle) feedTitle.textContent = 'Для вас';
    if (feedSubtitle) feedSubtitle.textContent = 'Товары для Барсика, выгодные цены и быстрая доставка';
  } else {
    const matches = currentProducts();
    feedSentinel.hidden = true;
    feed.innerHTML = matches.length
      ? `<section class="feed-batch" aria-label="Результаты"><div class="product-grid">${matches.map(productCard).join('')}</div></section>`
      : `<div class="feed-empty"><span>🐾</span><h3>Ничего не нашли</h3><p>Попробуйте другое название или сбросьте фильтр.</p><button type="button" data-reset-feed>Показать все товары</button></div>`;
    if (feedTitle) feedTitle.textContent = searchQuery ? `Поиск: ${searchQuery}` : $('[data-product-filter].is-active')?.textContent || 'Товары';
    if (feedSubtitle) feedSubtitle.textContent = matches.length ? `Найдено товаров: ${matches.length}` : 'Измените запрос или фильтр';
  }
  syncProductButtons();
}

function appendFeedBatch() {
  if (!feed) return;
  feed.insertAdjacentHTML('beforeend', feedBatch(batchIndex));
  batchIndex += 1;
  syncProductButtons();
}

renderFeed();

if (feed && feedSentinel && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting) || feedLoading) return;
    feedLoading = true;
    feedSentinel.lastChild.textContent = ' Загружаем продолжение';
    setTimeout(() => {
      if (activeFilter === 'all' && !searchQuery) appendFeedBatch();
      feedLoading = false;
      feedSentinel.lastChild.textContent = ' Подбираем ещё товары';
    }, 260);
  }, { rootMargin: '700px 0px' });
  observer.observe(feedSentinel);
}

function performSearch(form) {
  const query = $('input', form)?.value.trim();
    if (!query) {
      showToast('Напишите, что нужно найти');
      return;
    }
    if (!feed) {
      window.location.href = `index.html?search=${encodeURIComponent(query)}#catalog`;
      return;
    }
    searchQuery = query;
    $$('[data-search-form] input').forEach((input) => { input.value = query; });
    renderFeed();
    $('#catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    showToast(`Показали результаты по запросу «${query}»`);
}

$$('[data-search-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    performSearch(form);
  });
  $('input', form)?.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    performSearch(form);
  });
});

if (initialSearch) {
  $$('[data-search-form] input').forEach((input) => { input.value = initialSearch; });
  requestAnimationFrame(() => $('#catalog')?.scrollIntoView({ block: 'start' }));
}

document.addEventListener('click', (event) => {
  const previewStep = event.target.closest('[data-preview-step]');
  if (previewStep) {
    const visual = previewStep.closest('[data-card-preview]');
    const total = $$('[data-preview-image]', visual).length;
    const current = Number(visual.dataset.previewIndex || 0);
    setCardPreview(visual, (current + Number(previewStep.dataset.previewStep) + total) % total);
    return;
  }

  const previewZone = event.target.closest('[data-preview-zone]');
  if (previewZone) {
    setCardPreview(previewZone.closest('[data-card-preview]'), Number(previewZone.dataset.previewZone));
    return;
  }

  const addButton = event.target.closest('[data-add-cart]');
  if (addButton) {
    if (addButton.classList.contains('is-added')) {
      window.location.href = `cart.html?focus=${encodeURIComponent(addButton.dataset.productId)}`;
      return;
    }
    const product = products.find((item) => item.gallery === addButton.dataset.productId);
    if (!product || !window.PetshopCart) return;
    window.PetshopCart.add({
      id: product.gallery,
      title: product.title,
      price: Number(product.price.replace(/\D/g, '')),
      image: productGalleries[product.gallery][0]
    });
    syncProductButtons();
    showToast('Товар добавлен в корзину');
    return;
  }

  const favoriteButton = event.target.closest('[data-favorite]');
  if (favoriteButton) {
    const active = favoriteButton.classList.toggle('is-active');
    favoriteButton.setAttribute('aria-pressed', String(active));
    favoriteButton.setAttribute('aria-label', active ? 'Убрать из избранного' : 'Добавить в избранное');
    showToast(active ? 'Добавили в избранное' : 'Убрали из избранного');
    return;
  }

  const repeatButton = event.target.closest('[data-repeat-order]');
  if (repeatButton) {
    ['savita', 'organix', 'vancat'].forEach((id) => {
      const product = products.find((item) => item.gallery === id);
      window.PetshopCart?.add({ id, title: product.title, price: Number(product.price.replace(/\D/g, '')), image: productGalleries[id][0] });
    });
    syncProductButtons();
    showToast('Прошлый заказ добавлен в корзину');
    return;
  }

  const resetFeed = event.target.closest('[data-reset-feed]');
  if (resetFeed) {
    searchQuery = '';
    activeFilter = 'all';
    $$('[data-search-form] input').forEach((input) => { input.value = ''; });
    $$('[data-product-filter]').forEach((button) => button.classList.toggle('is-active', button.dataset.productFilter === 'all'));
    renderFeed();
    return;
  }

  const focusSearch = event.target.closest('[data-focus-search]');
  if (focusSearch) {
    event.preventDefault();
    const input = $('.search--mobile input') || $('[data-search-form] input');
    input?.focus();
    input?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const toastElement = event.target.closest('[data-toast]');
  if (toastElement) {
    if (toastElement.matches('a[href="#"]')) event.preventDefault();
    showToast(toastElement.dataset.toast);
  }
});

function setCardPreview(visual, index) {
  if (!visual) return;
  visual.dataset.previewIndex = String(index);
  $$('[data-preview-image]', visual).forEach((image) => {
    image.classList.toggle('is-active', Number(image.dataset.previewImage) === index);
  });
  $$('[data-preview-dot]', visual).forEach((dot) => {
    dot.classList.toggle('is-active', Number(dot.dataset.previewDot) === index);
  });
  const counter = $('[data-preview-current]', visual);
  if (counter) counter.textContent = String(index + 1);
}

let previewSwipe;
document.addEventListener('pointerdown', (event) => {
  if (event.pointerType === 'mouse') return;
  const visual = event.target.closest('[data-card-preview]');
  if (visual) previewSwipe = { visual, x: event.clientX };
});

document.addEventListener('pointerup', (event) => {
  if (!previewSwipe || event.pointerType === 'mouse') return;
  const { visual, x } = previewSwipe;
  previewSwipe = null;
  const distance = event.clientX - x;
  if (Math.abs(distance) < 36) return;
  const total = $$('[data-preview-image]', visual).length;
  const current = Number(visual.dataset.previewIndex || 0);
  setCardPreview(visual, (current + (distance < 0 ? 1 : -1) + total) % total);
});

document.addEventListener('pointerover', (event) => {
  const zone = event.target.closest('[data-preview-zone]');
  if (zone) setCardPreview(zone.closest('[data-card-preview]'), Number(zone.dataset.previewZone));
});

document.addEventListener('pointerout', (event) => {
  const visual = event.target.closest('[data-card-preview]');
  if (event.pointerType === 'mouse' && visual && !visual.contains(event.relatedTarget)) setCardPreview(visual, 0);
});

$('[data-scroll-catalog]')?.addEventListener('click', () => {
  $('#catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

$$('[data-product-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    $$('[data-product-filter]').forEach((item) => item.classList.toggle('is-active', item === button));
    activeFilter = button.dataset.productFilter;
    renderFeed();
  });
});

const drawer = $('[data-mobile-drawer]');
const menuButton = $('[data-menu-open]');
const drawerPageRoots = $$('.topbar, .site-header, main, .footer, .mobile-bottom-nav');
let focusBeforeDrawer;

function setDrawer(open) {
  if (!drawer) return;
  if (open) focusBeforeDrawer = document.activeElement;
  drawer?.classList.toggle('is-open', open);
  drawer?.setAttribute('aria-hidden', String(!open));
  menuButton?.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('drawer-open', open);
  drawerPageRoots.forEach((element) => { element.inert = open; });
  if (open) $('[data-menu-close]', drawer)?.focus({ preventScroll: true });
  else if (focusBeforeDrawer instanceof HTMLElement) focusBeforeDrawer.focus();
}

menuButton?.addEventListener('click', () => setDrawer(true));
$('[data-menu-close]')?.addEventListener('click', () => setDrawer(false));
drawer?.addEventListener('click', (event) => {
  if (event.target === drawer) setDrawer(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && drawer?.classList.contains('is-open')) {
    setDrawer(false);
    return;
  }
  if (event.key !== 'Tab' || !drawer?.classList.contains('is-open')) return;
  const focusable = $$('a[href], button:not([disabled])', drawer).filter((element) => !element.hidden);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (!drawer.contains(document.activeElement)) {
    event.preventDefault();
    (event.shiftKey ? last : first).focus();
  } else if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});
$$('.mobile-drawer a').forEach((link) => link.addEventListener('click', () => setDrawer(false)));
