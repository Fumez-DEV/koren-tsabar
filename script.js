document.addEventListener("DOMContentLoaded", () => {
  // === Smooth Scroll for Anchor Links ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
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
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
        }
      });
    }, { threshold });

    document.querySelectorAll(selector).forEach(el => observer.observe(el));
  }

  revealOnIntersect("#challenge", "visible", 0.4);
  revealOnIntersect("#audience li");

  // === Final CTA Observer & Title Change ===
  const finalCta = document.querySelector("#final-cta");
  const pulseBtn = finalCta?.querySelector(".pulse-cta");
  if (finalCta && pulseBtn) {
    const titleObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          finalCta.classList.add("visible");
          pulseBtn.classList.add("pulse-cta");
          document.title = "⏱️ אל תפספס את ההזדמנות!";
        } else {
          const resetTitle = () => document.title = "מכושר לקרבי – קורן צבר";
          'requestIdleCallback' in window ? requestIdleCallback(resetTitle) : setTimeout(resetTitle, 500);
        }
      });
    }, { threshold: 0.6 });

    titleObserver.observe(finalCta);
  }

  // === FAQ Accordion ===
  document.querySelectorAll(".faq-item").forEach(item => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      document.querySelectorAll(".faq-item").forEach(i => {
        if (i !== item) i.classList.remove("active");
      });
      item.classList.toggle("active");
    });
  });

  // === Testimonials Carousel (Images + Videos) ===
  const slides = document.querySelectorAll(".testimonial.image-slide");
  const dotsContainer = document.querySelector(".testimonial-dots");

  if (dotsContainer.children.length === 0) {
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.addEventListener("click", () => showSlide(i));
      dotsContainer.appendChild(dot);
    });
  }

  const dots = dotsContainer.querySelectorAll("button");
  let currentIndex = 0;
  if (dots.length > 0) dots[0].classList.add("active");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    // Pause all videos when switching
    document.querySelectorAll("#testimonials video").forEach(video => {
      video.pause();
      video.currentTime = 0;
    });

    currentIndex = index;
  }

  // === Form Validation ===
  const form = document.querySelector('form[name="challenge-form"]');
  if (form) {
    form.addEventListener("submit", e => {
      const { name, phone, age, status } = form;
      const phoneRegex = /^[0-9]{9,10}$/;

      if (!name.value.trim() || !phone.value.trim() || !age.value || !status.value) {
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

  // === Auto-play video in #video section on scroll ===
  const videoSection = document.querySelector("#video");
  const embeddedVideo = videoSection?.querySelector("video");
  if (videoSection && embeddedVideo) {
    const videoObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && embeddedVideo.paused) {
          embeddedVideo.play().catch(() => { /* Auto-play blocked by browser */ });
        }
      });
    }, { threshold: 0.6 });

    videoObserver.observe(videoSection);
  }
});
