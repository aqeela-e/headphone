document.addEventListener("DOMContentLoaded", function () {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    function playSound(frequency = 440, duration = 100, type = "sine", volume = 0.5) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = type; 
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01); 
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration / 1000); 

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();
        setTimeout(() => {
            oscillator.stop();
        }, duration);
    }

    let isScrolling = false;

    window.addEventListener("scroll", function () {
        if (!isScrolling) {
            playSound(380, 40, "sawtooth", 0.12); 
            setTimeout(() => playSound(320, 30, "sawtooth", 0.1), 50); 
        }

        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            playSound(280, 30, "triangle", 0.07); 
        }, 100);
    });

    document.querySelectorAll("button, a").forEach((element) => {
        element.addEventListener("click", function () {
            playSound(750, 40, "square", 0.15); 
            setTimeout(() => {
                playSound(520, 30, "square", 0.12); 
            }, 40);
        });
    });

    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");
    const menuBtnIcon = menuBtn.querySelector("i");

    menuBtn.addEventListener("click", function () {
        navLinks.classList.toggle("open");
        const isOpen = navLinks.classList.contains("open");
        menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
    });

    navLinks.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuBtnIcon.setAttribute("class", "ri-menu-line");
    });

    const scrollRevealOption = {
        distance: "50px",
        origin: "bottom",
        duration: 1000,
    };

    ScrollReveal().reveal(".header__image img", {
        ...scrollRevealOption,
        origin: "right",
    });
    ScrollReveal().reveal(".header__content h1", {
        ...scrollRevealOption,
        delay: 500,
    });
    ScrollReveal().reveal(".header__content p", {
        ...scrollRevealOption,
        delay: 1000,
    });
    ScrollReveal().reveal(".header__image__content", {
        duration: 1000,
        delay: 1500,
    });

    ScrollReveal().reveal(".product__image img", {
        ...scrollRevealOption,
        origin: "left",
    });
    ScrollReveal().reveal(".product__card", {
        ...scrollRevealOption,
        delay: 500,
        interval: 500,
    });

    const swiper = new Swiper(".swiper", {
        loop: true,
        effect: "coverflow",
        grabCursor: true,
        centerSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 0,
            depth: 250,
            modifier: 1,
            scale: 0.75,
            slideShadows: false,
            stretch: -100,
        },
        pagination: {
            el: ".swiper-pagination",
        },
        on: {
            slideChangeTransitionStart: function () {
                playSound(280, 50, "sawtooth", 0.15); 
                setTimeout(() => playSound(250, 40, "sawtooth", 0.12), 50); 
            },
            slideChangeTransitionEnd: function () {
                playSound(230, 30, "triangle", 0.08); 
            },
        },
    });
});
