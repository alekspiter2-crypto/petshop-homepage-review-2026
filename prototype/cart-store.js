(function () {
  const STORAGE_KEY = 'petshop-prototype-cart-v1';
  const defaults = [
    { id: 'organix', title: 'Organix Sterilised корм с кроликом, фруктами и овощами', price: 519, image: 'gallery/organix/01.jpg', quantity: 1 },
    { id: 'vancat', title: 'Van Cat Marseille Soap комкующийся наполнитель без пыли', price: 579, image: 'gallery/vancat/01.png', quantity: 1 }
  ];

  function read() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(saved) ? saved : defaults.map((item) => ({ ...item }));
    } catch (_) {
      return defaults.map((item) => ({ ...item }));
    }
  }

  function write(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    syncCounters(items);
    window.dispatchEvent(new CustomEvent('petshop-cart-change', { detail: items }));
    return items;
  }

  function count(items = read()) {
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  function syncCounters(items = read()) {
    const value = count(items);
    document.querySelectorAll('[data-cart-count]').forEach((counter) => {
      counter.textContent = String(value);
      counter.hidden = value === 0;
    });
  }

  function add(product, quantity = 1) {
    const items = read();
    const existing = items.find((item) => item.id === product.id);
    if (existing) existing.quantity += quantity;
    else items.push({ ...product, quantity });
    return write(items);
  }

  function setQuantity(id, quantity) {
    const items = read();
    const item = items.find((entry) => entry.id === id);
    if (!item) return items;
    if (quantity <= 0) return write(items.filter((entry) => entry.id !== id));
    item.quantity = quantity;
    return write(items);
  }

  function remove(id) {
    return write(read().filter((item) => item.id !== id));
  }

  window.PetshopCart = { read, write, count, add, setQuantity, remove, syncCounters };
  syncCounters();
})();
