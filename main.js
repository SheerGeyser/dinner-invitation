// Hearts background + dynamic date/time
(function () {
  const container = document.getElementById("hearts-container");

  function createHeartParticle() {
    if (!container) return;
    const heart = document.createElement("span");
    heart.className = "heart-particle";
    heart.textContent = "❤";

    const viewportWidth = window.innerWidth || 375;
    const x = Math.random() * viewportWidth;
    // стартуем почти с самого низа экрана
    const baseY = window.innerHeight - 10;
    const randomOffset = Math.random() * 10 - 5;
    const y = baseY + randomOffset;

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.fontSize = `${12 + Math.random() * 6}px`;
    heart.style.opacity = "0";

    container.appendChild(heart);

    const removeAfter = 2800;
    window.setTimeout(() => {
      if (heart.parentNode === container) {
        container.removeChild(heart);
      }
    }, removeAfter);
  }

  // Continuous flow of hearts across the whole page
  function startHeartStream() {
    if (container) {
      // более активная стартовая пачка
      for (let i = 0; i < 10; i += 1) {
        setTimeout(() => createHeartParticle(), i * 180);
      }

      // далее более плотный поток
      const baseInterval = 380; // мс
      setInterval(() => {
        // иногда по 2–3 сердечка за раз для живости
        const count = Math.random() < 0.45 ? 3 : 2;
        for (let i = 0; i < count; i += 1) {
          setTimeout(() => createHeartParticle(), i * 90);
        }
      }, baseInterval);
    }

    // динамическая дата и фиксированное время
    const dateEl = document.getElementById("invite-date");
    const timeEl = document.getElementById("invite-time");

    if (dateEl) {
      const today = new Date();
      const raw = today.toLocaleDateString("ru-RU", {
        weekday: "short",
        day: "numeric",
        month: "long",
      });
      const formatted =
        raw.charAt(0).toUpperCase() + raw.slice(1); // "Пт, 5 декабря"
      dateEl.textContent = formatted;
    }

    if (timeEl) {
      timeEl.textContent = "21:30";
    }
  }

  if (document.readyState === "complete") {
    startHeartStream();
  } else {
    window.addEventListener("load", startHeartStream);
  }
})();

