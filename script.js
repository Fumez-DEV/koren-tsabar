document.addEventListener("DOMContentLoaded", () => {
  // === Smooth Anchor Scroll ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // === Intersection Observer Reveal ===
  const revealOnIntersect = (selector, className = 'visible', threshold = 0.5) => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
        }
      });
    }, { threshold });
    document.querySelectorAll(selector).forEach(el => observer.observe(el));
  };

  revealOnIntersect("#challenge", "visible", 0.4);
  revealOnIntersect("#audience li");

  // === Final CTA Title Switch ===
  const finalCta = document.querySelector("#final-cta");
  const pulseBtn = finalCta?.querySelector(".pulse-cta");
  if (finalCta && pulseBtn) {
    const titleObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        document.title = entry.isIntersecting
          ? "⏱️ אל תפספס את ההזדמנות!"
          : "מכושר לקרבי – קורן צבר";
      });
    }, { threshold: 0.6 });
    titleObserver.observe(finalCta);
  }

  // === FAQ Accordion ===
  document.querySelectorAll(".faq-item").forEach(item => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      document.querySelectorAll(".faq-item").forEach(i => i !== item && i.classList.remove("active"));
      item.classList.toggle("active");
    });
  });

  // === Testimonials Carousel (Images + Videos) ===
  const slides = document.querySelectorAll(".testimonial.image-slide");
  const dotsContainer = document.querySelector(".testimonial-dots");
  let currentIndex = 0;

  if (slides.length && dotsContainer && !dotsContainer.children.length) {
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.addEventListener("click", () => showSlide(i));
      dotsContainer.appendChild(dot);
    });
  }

  const dots = dotsContainer?.querySelectorAll("button") || [];
  if (dots[0]) dots[0].classList.add("active");

  const showSlide = (index) => {
    slides.forEach((s, i) => s.classList.toggle("active", i === index));
    dots.forEach((d, i) => d.classList.toggle("active", i === index));

    document.querySelectorAll("#testimonials video").forEach(video => {
      video.pause();
      video.currentTime = 0;
    });

    currentIndex = index;
  };

  // === Form Validation
  const form = document.querySelector('form[name="challenge-form"]');
  if (form) {
    form.addEventListener("submit", e => {
      const { name, phone, age, status } = form;
      const phoneRegex = /^[0-9]{9,10}$/;

      if (!name.value.trim() || !phone.value.trim() || !age.value || (status && !status.value)) {
        alert("אנא מלא את כל השדות לפני ההרשמה.");
        e.preventDefault();
        return;
      }

      if (!phoneRegex.test(phone.value)) {
        alert("מספר טלפון לא תקין.");
        e.preventDefault();
      }
    });
  }

// === Formspree AJAX + Success Message ===
const fsForm = document.getElementById("challenge-form");
const successMsg = document.getElementById("success-message");

if (fsForm && successMsg) {
  fsForm.addEventListener("submit", async e => {
    e.preventDefault();

    const formData = new FormData(fsForm);
    const endpoint = "https://formspree.io/f/mldnwndk";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData
      });

      if (response.ok) {
        fsForm.reset();
        successMsg.style.display = "block";

        // Auto-hide after 6 seconds
        setTimeout(() => {
          successMsg.style.display = "none";
        }, 6000);
      } else {
        alert("אירעה שגיאה בעת השליחה. נסה שוב.");
      }
    } catch (err) {
      alert("שגיאת רשת. נסה שוב מאוחר יותר.");
    }
  });
}


  // === Auto-play video in #video section on scroll
  const videoSection = document.querySelector("#video");
  const embeddedVideo = videoSection?.querySelector("video");

  if (videoSection && embeddedVideo) {
    const videoObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && embeddedVideo.paused) {
          embeddedVideo.play().catch(() => {}); // Autoplay fallback
        }
      });
    }, { threshold: 0.6 });

    videoObserver.observe(videoSection);
  }
});
