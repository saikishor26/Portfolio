const ham1 = document.getElementById("ham1");
const navMenu = document.querySelector(".nav-menu");

ham1.addEventListener("click", function () {
  ham1.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    ham1.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

const typewriterText = document.getElementById("typewriter-text");
const texts = [
  "Full-Stack Developer",
  "MERN Stack Developer",
  "Problem Solver",
  "AI Enthusiast",
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typewriter() {
  const currentText = texts[textIndex];

  if (isDeleting) {
    typewriterText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typeSpeed = 500;
  }

  setTimeout(typewriter, typeSpeed);
}

typewriter();

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const navHeight = document.querySelector(".navbar").offsetHeight;
      const targetPosition = target.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(10, 14, 26, 0.98)";
  } else {
    navbar.style.background = "rgba(10, 14, 26, 0.95)";
  }
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll("section").forEach((section) => {
  section.classList.add("fade-in");
  observer.observe(section);
});

document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("sliderTrack");
  const cards = document.querySelectorAll(".certification-card");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.getElementById("sliderDots");

  let currentSlide = 0;
  const totalSlides = cards.length;
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  const dots = document.querySelectorAll(".dot");

  function updateSlider() {
    const width = cards[0].offsetWidth;
    track.style.transform = `translateX(-${currentSlide * width}px)`;

    dots.forEach((dot, i) =>
      dot.classList.toggle("active", i === currentSlide)
    );
  }

  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  let autoSlide = setInterval(nextSlide, 4000);

  const slider = document.querySelector(".certifications-slider");
  slider.addEventListener("mouseenter", () => clearInterval(autoSlide));
  slider.addEventListener("mouseleave", () => {
    autoSlide = setInterval(nextSlide, 4000);
  });

  window.addEventListener("resize", updateSlider);
  updateSlider();
});

const form = document.getElementById("contactForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const res = await fetch("/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  form.reset();
  alert(result.message);
});


function showSuccessMessage(message) {
  const successDiv = document.createElement("div");
  successDiv.className = "success-message";
  successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;

  document.body.appendChild(successDiv);

  setTimeout(() => {
    successDiv.classList.add("show");
  }, 100);

  setTimeout(() => {
    successDiv.classList.remove("show");
    setTimeout(() => {
      if (document.body.contains(successDiv)) {
        document.body.removeChild(successDiv);
      }
    }, 300);
  }, 3000);
}

document.querySelectorAll(".skill-btn").forEach((skill) => {
  skill.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px) scale(1.05)";
  });

  skill.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });
});

window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const home1Background = document.querySelector(".home1-bg");
  if (home1Background) {
    home1Background.style.transform = `translateY(${scrolled * 0.5}px)`; 
  }
});

window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});


document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    ham1.classList.remove("active");
    navMenu.classList.remove("active");
  }
});

function toggleResume(button) {
  const wrapper = document.getElementById("resume-wrapper");
  const span = button.querySelector("span");
  const icon = button.querySelector("i");

  if (wrapper.style.display === "none") {
    wrapper.style.display = "block";
    span.textContent = "Hide Resume";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    wrapper.style.display = "none";
    span.textContent = "View Resume";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

document.addEventListener("click", function (event) {
  const wrapper = document.getElementById("resume-wrapper");
  const viewer = document.getElementById("resume-viewer");
  const button = document.getElementById("resume-toggle-btn");
  if (
    wrapper.style.display === "block" &&
    !viewer.contains(event.target) &&
    !button.contains(event.target)
  ) {
    wrapper.style.display = "none";

    const span = button.querySelector("span");
    const icon = button.querySelector("i");
    span.textContent = "View Resume";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
});

