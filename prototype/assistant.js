(() => {
  const STORAGE_KEY = 'petshop-assistant-prototype-v1';
  const MAX_MESSAGES = 14;

  const catalog = [
    { id: 'royal-canin-sterilised', title: 'Royal Canin Sterilised 37 для стерилизованных кошек, 4 кг', pet: 'cat', category: 'dry_food', price: 5268, rating: '5,0', reviews: 557, image: 'gallery-royal-01.jpg', tags: 'кошка кот стерилизован сухой корм контроль веса royal canin' },
    { id: 'savita-rabbit', title: 'Savita Sterilised корм с кроликом и овощами, 400 г', pet: 'cat', category: 'dry_food', price: 519, rating: '4,8', reviews: 291, image: 'product-rabbit.jpg', tags: 'кошка кот стерилизован сухой корм кролик недорогой' },
    { id: 'savita-salmon', title: 'Сухой корм для стерилизованных кошек с лососем, 3 кг', pet: 'cat', category: 'dry_food', price: 3959, rating: '5,0', reviews: 536, image: 'product-salmon.png', tags: 'кошка стерилизован сухой корм лосось шерсть кожа' },
    { id: 'adult-dog-food', title: 'Полнорационный сухой корм для взрослых собак, 3 кг', pet: 'dog', category: 'dry_food', price: 1749, rating: '4,8', reviews: 418, image: 'product-dog.png', tags: 'собака пес взрослый сухой корм ежедневный рацион' },
    { id: 'van-cat-litter', title: 'Van Cat комкующийся наполнитель без пыли, 5 кг', pet: 'cat', category: 'litter', price: 579, rating: '4,9', reviews: 1230, image: 'product-litter.png', tags: 'кошка кот наполнитель комкующийся без пыли запах' },
    { id: 'ceramic-bowl', title: 'Керамическая миска с нескользящим дном', pet: 'any', category: 'bowl', price: 459, rating: '4,9', reviews: 642, image: 'product-rabbit.jpg', tags: 'миска керамика кормление нескользящий' },
    { id: 'feeding-mat', title: 'Коврик под миски с защитой от воды', pet: 'any', category: 'mat', price: 329, rating: '4,8', reviews: 381, image: 'product-turkey.png', tags: 'коврик миска кормление защита пола вода' },
    { id: 'wet-salmon-pouch', title: 'Влажный корм с лососем, пауч 85 г', pet: 'cat', category: 'wet_food', price: 89, rating: '5,0', reviews: 1102, image: 'product-salmon.png', tags: 'кошка кот влажный корм пауч лосось' },
    { id: 'catnip-ball', title: 'Мячик с кошачьей мятой для активной игры', pet: 'cat', category: 'toy', price: 299, rating: '4,9', reviews: 740, image: 'product-turkey.png', tags: 'кошка кот игрушка мяч кошачья мята активность' },
    { id: 'high-cat-tray', title: 'Высокий лоток с защитным бортиком', pet: 'cat', category: 'tray', price: 899, rating: '4,9', reviews: 865, image: 'product-litter.png', tags: 'кошка кот лоток туалет высокий борт наполнитель' },
    { id: 'litter-scoop', title: 'Совок для наполнителя с крупной сеткой', pet: 'cat', category: 'scoop', price: 189, rating: '4,8', reviews: 512, image: 'product-litter.png', tags: 'кошка совок лоток наполнитель уборка' },
    { id: 'litter-honeycomb-mat', title: 'Двухслойный коврик под кошачий лоток', pet: 'cat', category: 'litter_mat', price: 459, rating: '4,9', reviews: 692, image: 'product-litter.png', tags: 'кошка коврик лоток наполнитель чистота' }
  ];

  const productById = Object.fromEntries(catalog.map((product) => [product.id, product]));
  const defaultQuick = ['Корм для кошки', 'Корм для собаки', 'Набор к наполнителю'];
  const state = loadState();
  let answerTimer;

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && Array.isArray(saved.messages)) {
        return {
          messages: saved.messages.slice(-MAX_MESSAGES),
          pet: saved.pet === 'dog' ? 'dog' : saved.pet === 'cat' ? 'cat' : null,
          lastIntent: saved.lastIntent || null
        };
      }
    } catch (_) {
      // A blocked or malformed localStorage must not break the prototype.
    }
    return { messages: [], pet: null, lastIntent: null };
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) {
      // The assistant still works for the current page when storage is unavailable.
    }
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (symbol) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    })[symbol]);
  }

  function normalize(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/ё/g, 'е')
      .replace(/[^a-zа-я0-9\s]/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function rubles(value) {
    return `${Number(value).toLocaleString('ru-RU')} ₽`;
  }

  function reviewLabel(value) {
    const lastTwo = value % 100;
    const last = value % 10;
    if (lastTwo >= 11 && lastTwo <= 19) return `${value} отзывов`;
    if (last === 1) return `${value} отзыв`;
    if (last >= 2 && last <= 4) return `${value} отзыва`;
    return `${value} отзывов`;
  }

  function mount() {
    const launcher = document.createElement('button');
    launcher.className = 'petshop-assistant-launcher';
    launcher.type = 'button';
    launcher.setAttribute('aria-label', 'Открыть помощника Petshop');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.innerHTML = `
      <span class="petshop-assistant-launcher__icon" aria-hidden="true">🐾</span>
      <span class="petshop-assistant-launcher__label">Помочь с выбором</span>
      <i class="petshop-assistant-launcher__pulse" aria-hidden="true"></i>`;

    const panel = document.createElement('section');
    panel.className = 'petshop-assistant';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'false');
    panel.setAttribute('aria-label', 'Помощник Petshop');
    panel.setAttribute('aria-hidden', 'true');
    panel.innerHTML = `
      <header class="petshop-assistant__header">
        <span class="petshop-assistant__avatar" aria-hidden="true">🐾</span>
        <div class="petshop-assistant__heading">
          <strong>Помощник Petshop</strong>
          <span>Подбирает товары мгновенно · демо</span>
        </div>
        <button class="petshop-assistant__header-action" type="button" title="Начать заново" aria-label="Очистить диалог" data-pa-reset>↻</button>
        <button class="petshop-assistant__header-action" type="button" aria-label="Закрыть помощника" data-pa-close>×</button>
      </header>
      <div class="petshop-assistant__messages" aria-live="polite" data-pa-messages></div>
      <footer class="petshop-assistant__composer">
        <form class="petshop-assistant__form" data-pa-form>
          <input name="message" type="text" maxlength="280" autocomplete="off" aria-label="Сообщение помощнику" placeholder="Например, корм коту до 2 000 ₽">
          <button class="petshop-assistant__send" type="submit" aria-label="Отправить">➜</button>
        </form>
        <p class="petshop-assistant__privacy">Демо работает в браузере и никуда не отправляет ваши сообщения</p>
      </footer>`;

    document.body.append(launcher, panel);
    const messages = panel.querySelector('[data-pa-messages]');
    const form = panel.querySelector('[data-pa-form]');
    const input = form.elements.message;

    if (!state.messages.length) {
      state.messages.push({
        role: 'assistant',
        text: 'Здравствуйте! Помогу подобрать корм, наполнитель или полезные дополнения. Для кого выбираем?',
        products: [],
        quick: defaultQuick
      });
      saveState();
    }
    render(messages);

    function setOpen(open) {
      panel.classList.toggle('is-open', open);
      panel.setAttribute('aria-hidden', String(!open));
      launcher.setAttribute('aria-expanded', String(open));
      launcher.hidden = open;
      if (open) {
        requestAnimationFrame(() => input.focus());
        scrollMessages(messages);
      } else {
        launcher.focus();
      }
    }

    launcher.addEventListener('click', () => setOpen(true));
    panel.querySelector('[data-pa-close]').addEventListener('click', () => setOpen(false));
    panel.querySelector('[data-pa-reset]').addEventListener('click', () => {
      clearTimeout(answerTimer);
      state.messages = [{
        role: 'assistant',
        text: 'Начнём заново. Для кого и что хотите подобрать?',
        products: [],
        quick: defaultQuick
      }];
      state.pet = null;
      state.lastIntent = null;
      saveState();
      render(messages);
      input.focus();
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const value = input.value.trim();
      if (!value) return;
      input.value = '';
      send(value, messages);
    });

    messages.addEventListener('click', (event) => {
      const quick = event.target.closest('[data-pa-quick]');
      if (quick) {
        send(quick.dataset.paQuick, messages);
        return;
      }
      const add = event.target.closest('[data-pa-add]');
      if (add && !add.classList.contains('is-added')) {
        add.classList.add('is-added');
        add.textContent = 'Добавлено';
        add.disabled = true;
        if (typeof window.changeCart === 'function') window.changeCart(1);
        if (typeof window.showToast === 'function') window.showToast('Товар добавлен в корзину');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && panel.classList.contains('is-open')) setOpen(false);
    });
  }

  function send(text, container) {
    clearTimeout(answerTimer);
    state.messages.push({ role: 'user', text, products: [], quick: [] });
    state.messages = state.messages.slice(-MAX_MESSAGES);
    saveState();
    render(container, true);
    answerTimer = setTimeout(() => {
      state.messages.push({ role: 'assistant', ...replyFor(text) });
      state.messages = state.messages.slice(-MAX_MESSAGES);
      saveState();
      render(container);
    }, 420);
  }

  function detectPet(text) {
    if (/(собак|собач|пес|псу|щен|дог)/.test(text)) return 'dog';
    if (/(кош|кот|кис|котен)/.test(text)) return 'cat';
    return null;
  }

  function detectBudget(text) {
    const match = text.match(/(?:до|бюджет|не дороже|максимум)\s*(\d[\d\s]{1,8})/);
    if (!match) return null;
    const value = Number(match[1].replace(/\s/g, ''));
    return Number.isFinite(value) && value > 0 ? value : null;
  }

  function topProducts({ pet, categories, budget, limit = 4 }) {
    return catalog
      .filter((product) => !pet || product.pet === pet || product.pet === 'any')
      .filter((product) => !categories?.length || categories.includes(product.category))
      .filter((product) => !budget || product.price <= budget)
      .sort((a, b) => Number(b.rating.replace(',', '.')) - Number(a.rating.replace(',', '.')) || a.price - b.price)
      .slice(0, limit)
      .map((product) => product.id);
  }

  function replyFor(rawText) {
    const text = normalize(rawText);
    const detectedPet = detectPet(text);
    if (detectedPet) state.pet = detectedPet;
    const pet = detectedPet || state.pet;
    const budget = detectBudget(text);

    if (/(привет|здравств|добрый день|добрый вечер)/.test(text)) {
      return { text: 'Здравствуйте! Что подбираем и для какого питомца?', products: [], quick: defaultQuick };
    }

    if (/(кров|судорог|задыха|тяжело дыш|отрав|не ест|рвет|рвот|лекар|таблет|диагноз|лечение)/.test(text)) {
      return {
        text: 'С такими симптомами безопаснее обратиться к ветеринарному врачу. Я не ставлю диагнозы и не подбираю лекарства. Если состояние острое — лучше связаться с ближайшей круглосуточной клиникой прямо сейчас.',
        products: [],
        quick: ['Найти товары для ухода', 'Подобрать обычный корм']
      };
    }

    const wantsLitter = /(наполнител|лоток|совок|туалет)/.test(text);
    const wantsWet = /(влажн|пауч|консерв)/.test(text);
    const wantsFood = /(корм|питани|рацион|есть)/.test(text);
    const wantsToy = /(игруш|мяч|игр)/.test(text);
    const wantsBundle = /(набор|вместе|дополн|комплект)/.test(text);

    if ((wantsFood || wantsWet) && !pet) {
      state.lastIntent = wantsBundle ? 'food_bundle' : wantsWet ? 'wet_food' : 'dry_food';
      return { text: 'Уточните, пожалуйста: корм нужен кошке или собаке?', products: [], quick: ['Для кошки', 'Для собаки'] };
    }

    if (wantsLitter || (wantsBundle && state.lastIntent === 'litter')) {
      state.pet = 'cat';
      state.lastIntent = 'litter';
      const base = topProducts({ pet: 'cat', categories: ['litter'], budget, limit: 1 });
      const bundleOrder = ['high-cat-tray', 'litter-scoop', 'catnip-ball'];
      const additions = bundleOrder.filter((id) => !budget || productById[id].price <= budget);
      const products = [...base, ...additions];
      return {
        text: budget && !base.length
          ? `В демонстрационном каталоге нет наполнителя до ${rubles(budget)}. Покажу полезные дополнения к лотку.`
          : 'Собрал удобный комплект: наполнитель, высокий лоток, совок и игрушку для кошки.',
        products,
        quick: ['Только наполнитель', 'Показать игрушку кошке']
      };
    }

    if (wantsToy) {
      state.lastIntent = 'toy';
      const products = topProducts({ pet: pet || 'cat', categories: ['toy'], budget });
      return products.length
        ? { text: 'Вот компактная игрушка с высоким рейтингом. Она подойдёт для самостоятельной активности кошки.', products, quick: ['Добавить товары для ухода'] }
        : { text: 'В демо-каталоге пока есть игрушка только для кошки. Для собак расширим выбор на следующем этапе.', products: [], quick: ['Показать корм для собаки'] };
    }

    if (wantsBundle || state.lastIntent === 'food_bundle') {
      const bundlePet = pet || 'cat';
      state.lastIntent = 'food_bundle';
      const products = topProducts({ pet: bundlePet, categories: ['bowl', 'mat', 'wet_food', 'toy'], budget, limit: 4 });
      return {
        text: bundlePet === 'cat'
          ? 'К сухому корму рекомендую миску, защитный коврик, влажный рацион и игрушку. Можно добавить только нужное.'
          : 'К сухому корму рекомендую устойчивую миску и коврик под неё. Собачьи игрушки добавим в полный каталог.',
        products,
        quick: ['Показать корм', 'Набор к наполнителю']
      };
    }

    if (wantsFood || wantsWet || state.lastIntent === 'dry_food' || state.lastIntent === 'wet_food') {
      const category = wantsWet || state.lastIntent === 'wet_food' ? 'wet_food' : 'dry_food';
      state.lastIntent = category;
      const products = topProducts({ pet, categories: [category], budget });
      if (!products.length) {
        return {
          text: `В демонстрационном каталоге подходящего варианта${budget ? ` до ${rubles(budget)}` : ''} пока нет. Попробуйте увеличить бюджет или выбрать другую категорию.`,
          products: [],
          quick: pet === 'dog' ? ['Корм собаке без бюджета'] : ['Корм кошке без бюджета', 'Влажный корм кошке']
        };
      }
      const petName = pet === 'dog' ? 'собаки' : 'кошки';
      return {
        text: `Подобрал ${products.length === 1 ? 'лучший вариант' : 'варианты'} для ${petName}${budget ? ` в бюджете до ${rubles(budget)}` : ''}. Смотрите рейтинг и размер упаковки.`,
        products,
        quick: pet === 'cat' ? ['Собрать набор к корму', 'Показать наполнитель'] : ['Показать товары для кошки']
      };
    }

    if (pet) {
      const products = topProducts({ pet, budget, limit: 4 });
      return {
        text: `Вот популярные товары для ${pet === 'dog' ? 'собаки' : 'кошки'}${budget ? ` до ${rubles(budget)}` : ''}. Что хотите уточнить: корм, уход или аксессуары?`,
        products,
        quick: pet === 'dog' ? ['Сухой корм для собаки'] : ['Сухой корм для кошки', 'Набор к наполнителю']
      };
    }

    return {
      text: 'Пока я лучше всего умею подбирать корм, наполнитель и дополнения к покупке. Напишите, например: «сухой корм кошке до 2 000 ₽».',
      products: [],
      quick: defaultQuick
    };
  }

  function render(container, typing = false) {
    const history = state.messages.map((message) => {
      const productIds = Array.isArray(message.products) ? message.products.filter((id) => productById[id]) : [];
      const quick = Array.isArray(message.quick) ? message.quick : [];
      return `
        <div class="petshop-assistant__message petshop-assistant__message--${message.role}">${escapeHtml(message.text)}</div>
        ${productIds.length ? productList(productIds) : ''}
        ${quick.length ? `<div class="petshop-assistant__quick">${quick.map((label) => `<button type="button" data-pa-quick="${escapeHtml(label)}">${escapeHtml(label)}</button>`).join('')}</div>` : ''}`;
    }).join('');
    container.innerHTML = `<div class="petshop-assistant__day">Сегодня</div>${history}${typing ? '<div class="petshop-assistant__message petshop-assistant__message--assistant"><span class="petshop-assistant__typing" aria-label="Помощник печатает"><i></i><i></i><i></i></span></div>' : ''}`;
    scrollMessages(container);
  }

  function productList(ids) {
    return `<div class="petshop-assistant__products" aria-label="Рекомендованные товары">${ids.map((id) => {
      const product = productById[id];
      return `
        <article class="petshop-assistant-product">
          <a href="catalog.html?product=${encodeURIComponent(product.id)}" aria-label="Посмотреть ${escapeHtml(product.title)}"><img class="petshop-assistant-product__image" src="assets/${encodeURIComponent(product.image)}" alt=""></a>
          <a class="petshop-assistant-product__title" href="catalog.html?product=${encodeURIComponent(product.id)}">${escapeHtml(product.title)}</a>
          <div class="petshop-assistant-product__meta"><b>★ ${product.rating}</b><span>${reviewLabel(product.reviews)}</span></div>
          <div class="petshop-assistant-product__bottom"><span class="petshop-assistant-product__price">${rubles(product.price)}</span><button class="petshop-assistant-product__add" type="button" data-pa-add="${escapeHtml(product.id)}">В корзину</button></div>
        </article>`;
    }).join('')}</div>`;
  }

  function scrollMessages(container) {
    requestAnimationFrame(() => { container.scrollTop = container.scrollHeight; });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();
