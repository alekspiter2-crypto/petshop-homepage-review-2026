(() => {
  const STORAGE_KEY = 'petshop-assistant-prototype-v2';
  const MAX_MESSAGES = 14;

  const catalog = [
    { id: 'royal-canin-sterilised', title: 'Royal Canin Sterilised 37 для стерилизованных кошек, 4 кг', pet: 'cat', category: 'dry_food', age: 'adult', sterilized: true, price: 5268, rating: '5,0', reviews: 557, image: 'gallery-royal-01.jpg', note: 'Премиальный рацион · контроль веса', tags: 'кошка кот стерилизован сухой корм контроль веса royal canin' },
    { id: 'organix-rabbit-small', title: 'Organix Sterilised с кроликом, 400 г', pet: 'cat', category: 'dry_food', age: 'adult', sterilized: true, price: 519, rating: '4,8', reviews: 291, image: 'product-rabbit.jpg', note: 'Небольшая упаковка · можно попробовать', tags: 'кошка кот стерилизован сухой корм кролик недорогой' },
    { id: 'savita-turkey', title: 'Savita Sterilised со свежей индейкой, 1,5 кг', pet: 'cat', category: 'dry_food', age: 'adult', sterilized: true, price: 1290, rating: '4,9', reviews: 684, image: 'product-turkey.png', note: 'Выгодный ежедневный рацион', tags: 'кошка кот стерилизован сухой корм индейка контроль веса' },
    { id: 'florida-salmon', title: 'Florida Sterilised с лососем и черникой, 1,5 кг', pet: 'cat', category: 'dry_food', age: 'adult', sterilized: true, price: 1690, rating: '5,0', reviews: 536, image: 'product-salmon.png', note: 'Лосось · поддержка кожи и шерсти', tags: 'кошка стерилизован сухой корм лосось шерсть кожа' },
    { id: 'gokitchen-sensitive-cat', title: 'GO’KITCHEN Sensitive с индейкой, 1,5 кг', pet: 'cat', category: 'dry_food', age: 'adult', sterilized: null, sensitive: true, price: 1890, rating: '4,8', reviews: 418, image: 'product-dog.png', note: 'Для чувствительного пищеварения', tags: 'кошка сухой корм индейка чувствительное пищеварение' },
    { id: 'taormina-grainfree-cat', title: 'Taormina беззерновой корм с индейкой, 3 кг', pet: 'cat', category: 'dry_food', age: 'adult', sterilized: null, sensitive: true, price: 2924, rating: '4,9', reviews: 702, image: 'product-turkey.png', note: 'Беззерновой состав · большая упаковка', tags: 'кошка сухой корм индейка беззерновой чувствительный' },
    { id: 'savita-kitten', title: 'Savita Kitten с курицей для котят, 700 г', pet: 'cat', category: 'dry_food', age: 'young', sterilized: false, price: 749, rating: '4,9', reviews: 438, image: 'product-rabbit.jpg', note: 'Для роста котят до 12 месяцев', tags: 'кошка котенок сухой корм курица рост' },
    { id: 'savita-senior-cat', title: 'Savita Senior для кошек старше 7 лет, 1,5 кг', pet: 'cat', category: 'dry_food', age: 'senior', sterilized: null, price: 1590, rating: '4,9', reviews: 367, image: 'product-renal.png', note: 'Для кошек старше 7 лет', tags: 'кошка пожилая старше 7 лет сухой корм' },
    { id: 'adult-dog-food', title: 'GO’KITCHEN корм для взрослых собак, 3 кг', pet: 'dog', category: 'dry_food', age: 'adult', sterilized: null, price: 1749, rating: '4,8', reviews: 418, image: 'product-dog.png', note: 'Повседневный сбалансированный рацион', tags: 'собака пес взрослый сухой корм ежедневный рацион' },
    { id: 'florida-small-dog', title: 'Florida для взрослых собак малых пород, 1 кг', pet: 'dog', category: 'dry_food', age: 'adult', sterilized: null, price: 999, rating: '4,9', reviews: 395, image: 'product-salmon.png', note: 'Мелкие гранулы · для малых пород', tags: 'собака малая порода взрослый сухой корм' },
    { id: 'organix-adult-dog', title: 'Organix Adult с индейкой для собак, 2 кг', pet: 'dog', category: 'dry_food', age: 'adult', sterilized: null, price: 1490, rating: '4,8', reviews: 447, image: 'product-rabbit.jpg', note: 'Индейка · средняя упаковка', tags: 'собака взрослый сухой корм индейка' },
    { id: 'sensitive-dog-food', title: 'Savita Sensitive с ягнёнком для собак, 1,5 кг', pet: 'dog', category: 'dry_food', age: 'adult', sterilized: null, sensitive: true, price: 1399, rating: '4,9', reviews: 512, image: 'product-turkey.png', note: 'Ягнёнок · чувствительное пищеварение', tags: 'собака сухой корм ягненок чувствительное пищеварение' },
    { id: 'puppy-dog-food', title: 'Organix Puppy с курицей для щенков, 1 кг', pet: 'dog', category: 'dry_food', age: 'young', sterilized: null, price: 899, rating: '4,8', reviews: 326, image: 'product-dog.png', note: 'Для щенков до 12 месяцев', tags: 'собака щенок сухой корм курица рост' },
    { id: 'senior-dog-food', title: 'Savita Senior для собак старше 7 лет, 2 кг', pet: 'dog', category: 'dry_food', age: 'senior', sterilized: null, price: 1650, rating: '4,9', reviews: 284, image: 'product-renal.png', note: 'Для собак старше 7 лет', tags: 'собака пожилая старше 7 лет сухой корм' },
    { id: 'large-dog-food', title: 'Taormina для собак средних и крупных пород, 5 кг', pet: 'dog', category: 'dry_food', age: 'adult', sterilized: null, price: 2949, rating: '4,8', reviews: 604, image: 'product-dog.png', note: 'Большая упаковка · выгодная цена за кг', tags: 'собака средняя крупная порода сухой корм' },
    { id: 'van-cat-litter', title: 'Van Cat комкующийся наполнитель без пыли, 5 кг', pet: 'cat', category: 'litter', price: 579, rating: '4,9', reviews: 1230, image: 'product-litter.png', tags: 'кошка кот наполнитель комкующийся без пыли запах' },
    { id: 'ceramic-bowl', title: 'Керамическая миска с нескользящим дном', pet: 'any', category: 'bowl', price: 459, rating: '4,9', reviews: 642, image: 'product-rabbit.jpg', tags: 'миска керамика кормление нескользящий' },
    { id: 'feeding-mat', title: 'Коврик под миски с защитой от воды', pet: 'any', category: 'mat', price: 329, rating: '4,8', reviews: 381, image: 'product-turkey.png', tags: 'коврик миска кормление защита пола вода' },
    { id: 'wet-salmon-pouch', title: 'Florida влажный корм с лососем, пауч 85 г', pet: 'cat', category: 'wet_food', age: 'adult', sterilized: null, price: 89, rating: '5,0', reviews: 1102, image: 'product-salmon.png', note: 'Лосось · пауч на одну порцию', tags: 'кошка кот влажный корм пауч лосось' },
    { id: 'wet-rabbit-pouch', title: 'Organix влажный корм с кроликом, 85 г', pet: 'cat', category: 'wet_food', age: 'adult', sterilized: null, price: 79, rating: '4,9', reviews: 845, image: 'product-rabbit.jpg', note: 'Нежный кролик · без искусственных красителей', tags: 'кошка кот влажный корм пауч кролик' },
    { id: 'wet-kitten-pouch', title: 'Savita влажный корм для котят с курицей, 85 г', pet: 'cat', category: 'wet_food', age: 'young', sterilized: false, price: 85, rating: '4,9', reviews: 392, image: 'product-turkey.png', note: 'Мягкая текстура для котят', tags: 'кошка котенок влажный корм пауч курица' },
    { id: 'wet-dog-lamb', title: 'Savita влажный корм для собак с ягнёнком, 100 г', pet: 'dog', category: 'wet_food', age: 'adult', sterilized: null, price: 99, rating: '4,9', reviews: 476, image: 'product-dog.png', note: 'Ягнёнок · порционная упаковка', tags: 'собака влажный корм ягненок пауч' },
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
          lastIntent: saved.lastIntent || null,
          age: ['young', 'adult', 'senior'].includes(saved.age) ? saved.age : null,
          sterilized: typeof saved.sterilized === 'boolean' ? saved.sterilized : null,
          sensitive: Boolean(saved.sensitive),
          budget: Number.isFinite(saved.budget) ? saved.budget : null,
          noBudget: Boolean(saved.noBudget),
          profileComplete: Boolean(saved.profileComplete),
          pendingQuestion: saved.pendingQuestion || null
        };
      }
    } catch (_) {
      // A blocked or malformed localStorage must not break the prototype.
    }
    return {
      messages: [], pet: null, lastIntent: null, age: null, sterilized: null,
      sensitive: false, budget: null, noBudget: false, profileComplete: false,
      pendingQuestion: null
    };
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
      state.age = null;
      state.sterilized = null;
      state.sensitive = false;
      state.budget = null;
      state.noBudget = false;
      state.profileComplete = false;
      state.pendingQuestion = null;
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

  function detectAge(text) {
    if (/(котен|щен|до года|малыш)/.test(text)) return 'young';
    if (/(старше 7|пожил|возрастн|стареньк|сеньор)/.test(text)) return 'senior';
    if (/(взросл|от года|обычный рацион)/.test(text)) return 'adult';
    return null;
  }

  function detectSterilized(text) {
    if (/(не стерилиз|не кастрир)/.test(text)) return false;
    if (/(стерилиз|кастрир)/.test(text)) return true;
    return null;
  }

  function profileDescription(pet) {
    let petLabel = pet === 'dog' ? 'собака' : 'кошка';
    if (state.age === 'young') petLabel = pet === 'dog' ? 'щенок' : 'котёнок';
    if (state.age === 'adult') petLabel = pet === 'dog' ? 'взрослая собака' : 'взрослая кошка';
    if (state.age === 'senior') petLabel = pet === 'dog' ? 'собака старше 7 лет' : 'кошка старше 7 лет';
    if (pet === 'cat' && state.sterilized === true && state.age !== 'young') petLabel = `${petLabel}, стерилизована`;
    if (pet === 'cat' && state.sterilized === false && state.age !== 'young') petLabel = `${petLabel}, не стерилизована`;
    const details = [petLabel];
    if (state.sensitive) details.push('чувствительное пищеварение');
    if (state.budget) details.push(`до ${rubles(state.budget)}`);
    return details.join(', ');
  }

  function productScore(product, { age, sterilized, sensitive }) {
    let score = Number(product.rating.replace(',', '.'));
    if (age) {
      if (product.age === age) score += 5;
      else if (!product.age) score += 1;
      else score -= 5;
    }
    if (typeof sterilized === 'boolean') {
      if (product.sterilized === sterilized) score += 4;
      else if (product.sterilized == null) score += 1;
      else score -= 4;
    }
    if (sensitive && product.sensitive) score += 3;
    return score;
  }

  function topProducts({ pet, categories, budget, age, sterilized, sensitive, limit = 4 }) {
    return catalog
      .filter((product) => !pet || product.pet === pet || product.pet === 'any')
      .filter((product) => !categories?.length || categories.includes(product.category))
      .filter((product) => !budget || product.price <= budget)
      .sort((a, b) => productScore(b, { age, sterilized, sensitive }) - productScore(a, { age, sterilized, sensitive }) || a.price - b.price)
      .slice(0, limit)
      .map((product) => product.id);
  }

  function lastRecommendedProducts() {
    const recommendations = [...state.messages].reverse().filter((message) => message.role === 'assistant' && message.products?.length);
    const previous = recommendations.find((message) => message.products.length > 1) || recommendations[0];
    return (previous?.products || []).map((id) => productById[id]).filter(Boolean);
  }

  function replyFor(rawText) {
    const text = normalize(rawText);
    const detectedPet = detectPet(text);
    if (detectedPet && state.pet && detectedPet !== state.pet) {
      state.age = null;
      state.sterilized = null;
      state.sensitive = false;
      state.budget = null;
      state.noBudget = false;
      state.profileComplete = false;
      state.pendingQuestion = null;
    }
    if (detectedPet) state.pet = detectedPet;
    const pet = detectedPet || state.pet;
    const detectedAge = detectAge(text);
    const detectedSterilized = detectSterilized(text);
    const detectedBudget = detectBudget(text);
    if (detectedAge) state.age = detectedAge;
    if (typeof detectedSterilized === 'boolean') state.sterilized = detectedSterilized;
    if (detectedBudget) {
      state.budget = detectedBudget;
      state.noBudget = false;
    }
    if (/(бюджет не важен|без ограничений|цена не важна)/.test(text)) {
      state.budget = null;
      state.noBudget = true;
    }
    if (/(чувствительн|аллерги|пищеварен|беззернов)/.test(text)) state.sensitive = true;
    const budget = detectedBudget || state.budget;
    const skipQuestions = /(без уточн|показать сразу|неважно|не важно)/.test(text);

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

    if (/(спасибо|благодарю|понятно|отлично)/.test(text)) {
      return {
        text: 'Пожалуйста! Могу ещё сравнить показанные варианты, выбрать самый выгодный или собрать к корму небольшой комплект.',
        products: [],
        quick: ['Какой выбрать?', 'Показать самый недорогой', 'Собрать набор к корму']
      };
    }

    if (/(какой выбрать|что лучше|посоветуй один|выбери один)/.test(text)) {
      const [best] = lastRecommendedProducts();
      if (best) {
        const distinction = best.note ? best.note.toLowerCase() : 'высокий рейтинг и хорошее соотношение цены и качества';
        return {
          text: `Если нужен один вариант, я бы начал с «${best.title}». У него рейтинг ${best.rating}, а главное отличие — ${distinction}.`,
          products: [best.id],
          quick: ['Показать самый недорогой', 'Собрать набор к корму']
        };
      }
    }

    if (/(подешевле|самый недорог|самый дешев)/.test(text)) {
      const cheapest = lastRecommendedProducts().sort((a, b) => a.price - b.price)[0];
      if (cheapest) {
        const distinction = cheapest.note ? cheapest.note.toLowerCase() : 'хорошее соотношение цены и качества';
        return {
          text: `Самый доступный из показанных — «${cheapest.title}» за ${rubles(cheapest.price)}. Его главное отличие — ${distinction}.`,
          products: [cheapest.id],
          quick: ['Показать корм ещё раз', 'Собрать набор к корму']
        };
      }
    }

    const wantsLitter = /(наполнител|лоток|совок|туалет)/.test(text);
    const wantsWet = /(влажн|пауч|консерв)/.test(text);
    const wantsFood = /(корм|питани|рацион|есть)/.test(text);
    const wantsToy = /(игруш|мяч|игр)/.test(text);
    const wantsBundle = /(набор|вместе|дополн|комплект)/.test(text);

    if ((wantsFood || wantsWet) && !pet) {
      state.lastIntent = wantsBundle ? 'food_bundle' : wantsWet ? 'wet_food' : 'dry_food';
      state.pendingQuestion = 'pet';
      return { text: 'Конечно, помогу. Сначала уточню: корм выбираем кошке или собаке?', products: [], quick: ['Для кошки', 'Для собаки'] };
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

      if (!state.profileComplete && !skipQuestions && !state.age) {
        state.pendingQuestion = 'age';
        return pet === 'cat'
          ? {
              text: 'Хорошо. Уточню один момент, чтобы не показывать случайный корм: кошка взрослая, котёнок или старше 7 лет? Она стерилизована?',
              products: [],
              quick: ['Взрослая, стерилизована', 'Взрослая, не стерилизована', 'Котёнок', 'Старше 7 лет', 'Показать без уточнений']
            }
          : {
              text: 'Расскажите немного о питомце: это взрослая собака, щенок или собака старше 7 лет?',
              products: [],
              quick: ['Взрослая собака', 'Щенок', 'Старше 7 лет', 'Показать без уточнений']
            };
      }

      if (!state.profileComplete && !skipQuestions && !state.budget && !state.noBudget) {
        state.pendingQuestion = 'budget';
        return {
          text: `Понял: ${profileDescription(pet)}. И последний вопрос — какой бюджет на одну упаковку?`,
          products: [],
          quick: ['До 1 000 ₽', 'До 1 500 ₽', 'До 2 000 ₽', 'До 3 000 ₽', 'Бюджет не важен']
        };
      }

      state.profileComplete = true;
      state.pendingQuestion = null;
      const products = topProducts({
        pet,
        categories: [category],
        budget,
        age: state.age,
        sterilized: state.sterilized,
        sensitive: state.sensitive,
        limit: 4
      });
      if (!products.length) {
        return {
          text: `В демонстрационном каталоге подходящего варианта${budget ? ` до ${rubles(budget)}` : ''} пока нет. Попробуйте увеличить бюджет или выбрать другую категорию.`,
          products: [],
          quick: pet === 'dog' ? ['Корм собаке без бюджета'] : ['Корм кошке без бюджета', 'Влажный корм кошке']
        };
      }
      const petName = pet === 'dog' ? 'собаки' : 'кошки';
      return {
        text: products.length === 1
          ? `Понял: ${profileDescription(pet)}. Пока нашёл один точный вариант для ${petName}. Можно изменить бюджет или параметры — тогда выбор станет шире.`
          : `Понял: ${profileDescription(pet)}. Нашёл ${products.length} разных варианта: от доступной небольшой упаковки до более специализированного рациона. Ниже видно, чем они отличаются.`,
        products,
        quick: pet === 'cat' ? ['Собрать набор к корму', 'Показать наполнитель'] : ['Показать товары для кошки']
      };
    }

    if (pet) {
      const products = topProducts({ pet, budget, age: state.age, sterilized: state.sterilized, sensitive: state.sensitive, limit: 4 });
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
          ${product.note ? `<div class="petshop-assistant-product__hint">${escapeHtml(product.note)}</div>` : ''}
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
