// === Smooth Anchor Scroll ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// === Intersection Observer Utilities ===
function revealOnIntersect(selector, className = 'visible', threshold = 0.5) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add(className);
    });
  }, { threshold });

  document.querySelectorAll(selector).forEach(el => observer.observe(el));
}

// === Challenge Section Reveal ===
document.addEventListener("DOMContentLoaded", () => {
  revealOnIntersect("#challenge", "visible", 0.4);
  revealOnIntersect("#audience li");
});

// === Final CTA Reveal + Tab Title Switch ===
document.addEventListener("DOMContentLoaded", () => {
  const finalCta = document.querySelector("#final-cta");
  const button = finalCta.querySelector(".pulse-cta");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        finalCta.classList.add("visible");
        button.classList.add("pulse-cta");
        document.title = "⏱️ אל תפספס את ההזדמנות!";
      } else {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => document.title = "מכושר לקרבי – קורן צבר");
        } else {
          setTimeout(() => document.title = "מכושר לקרבי – קורן צבר", 500);
        }
      }
    });
  }, { threshold: 0.6 });

  observer.observe(finalCta);
});

// === FAQ Toggle ===
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".faq-item");
  items.forEach(item => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      items.forEach(i => i !== item && i.classList.remove("active"));
      item.classList.toggle("active");
    });
  });
});

// === Testimonial Slider ===
document.addEventListener("DOMContentLoaded", () => {
  const testimonials = document.querySelectorAll(".testimonial");
  const container = document.getElementById("testimonials");

  const dotWrapper = document.createElement("div");
  dotWrapper.className = "testimonial-dots";
  container.appendChild(dotWrapper);

  testimonials.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.setAttribute("data-index", index);
    dot.addEventListener("click", () => {
      show(index);
      clearInterval(autoPlay);
    });
    dotWrapper.appendChild(dot);
  });

  const dots = dotWrapper.querySelectorAll("button");
  let current = 0;

  function show(index) {
    testimonials.forEach(t => t.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));
    testimonials[index].classList.add("active");
    dots[index].classList.add("active");
    current = index;
  }

  const autoPlay = setInterval(() => show((current + 1) % testimonials.length), 6000);
  show(0);
});

// === Form Validation ===
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('form[name="challenge-form"]');
  form.addEventListener("submit", e => {
    const { name, phone, age, status } = form;

    if (!name.value.trim() || !phone.value.trim() || !age.value || !status.value) {
      alert("אנא מלא את כל השדות לפני ההרשמה.");
      e.preventDefault();
      return;
    }

    const phoneRegex = /^[0-9]{9,10}$/;
    if (!phoneRegex.test(phone.value)) {
      alert("מספר טלפון לא תקין.");
      e.preventDefault();
    }
  });
});

// === Countdown Shadowbox ===
document.addEventListener("DOMContentLoaded", () => {
  const countdownBox = document.getElementById("countdown-box");
  const countdownSpan = document.getElementById("countdown");
  const closeBtn = document.getElementById("close-countdown");

  function getTimeRemaining(endDate) {
    const t = Date.parse(endDate) - Date.now();
    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const hours = Math.floor((t / 1000 / 60 / 60) % 24);
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    return { total: t, days, hours, minutes, seconds };
  }

  function updateCountdown(endDate) {
    const { total, days, hours, minutes, seconds } = getTimeRemaining(endDate);
    countdownSpan.innerHTML = `${days} ימים, ${hours} שעות, ${minutes} דקות, ${seconds} שניות`;
    if (total <= 0) {
      clearInterval(interval);
      countdownSpan.innerHTML = "הסתיים!";
    }
  }

  const endTime = new Date();
  endTime.setDate(endTime.getDate() + 2);
  const interval = setInterval(() => updateCountdown(endTime), 1000);

  // Show box when user scrolls near bottom
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        if (window.scrollY > scrollable - 100) {
          countdownBox.classList.add("visible");
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // Close button
  closeBtn?.addEventListener("click", () => {
    countdownBox.classList.remove("visible");
  });
});
