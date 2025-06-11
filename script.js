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

// Testimonials Carousel Script
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll('.testimonial.image-slide');
  const dotsContainer = document.querySelector('.testimonial-dots');

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.addEventListener('click', () => {
      slides.forEach(s => s.classList.remove('active'));
      dotsContainer.querySelectorAll('button').forEach(d => d.classList.remove('active'));
      slides[index].classList.add('active');
      dot.classList.add('active');
    });
    if (index === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  });
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
