document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.getElementById('header');

    mobileMenuBtn.addEventListener('click', () => {
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.remove('hidden');
            // Small delay to allow display:block to apply before animating opacity/transform
            setTimeout(() => {
                mobileMenu.classList.add('open');
            }, 10);
        } else {
            mobileMenu.classList.remove('open');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300); // matches duration-300
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
        });
    });

    // 2. Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-md');
        } else {
            header.classList.remove('shadow-md');
        }
    });

    // 3. Transformation Slider
    const sliderInput = document.getElementById('slider-input');
    const sliderHandle = document.getElementById('slider-handle');
    const beforeImage = document.getElementById('before-image');

    if (sliderInput && sliderHandle && beforeImage) {
        sliderInput.addEventListener('input', (e) => {
            const val = e.target.value;
            sliderHandle.style.left = `${val}%`;
            beforeImage.style.clipPath = `polygon(0 0, ${val}% 0, ${val}% 100%, 0 100%)`;
        });
    }

    // 4. Calculators Tab Switching
    const tabBmi = document.getElementById('tab-bmi');
    const tabCalories = document.getElementById('tab-calories');
    const formBmi = document.getElementById('form-bmi');
    const formCalories = document.getElementById('form-calories');

    if(tabBmi && tabCalories) {
        tabBmi.addEventListener('click', () => {
            tabBmi.classList.add('bg-brand-red', 'text-white');
            tabBmi.classList.remove('text-gray-400', 'hover:text-white');
            
            tabCalories.classList.remove('bg-brand-red', 'text-white');
            tabCalories.classList.add('text-gray-400', 'hover:text-white');

            formCalories.classList.add('hidden');
            formCalories.classList.remove('active');
            
            formBmi.classList.remove('hidden');
            setTimeout(() => formBmi.classList.add('active'), 50);
        });

        tabCalories.addEventListener('click', () => {
            tabCalories.classList.add('bg-brand-red', 'text-white');
            tabCalories.classList.remove('text-gray-400', 'hover:text-white');
            
            tabBmi.classList.remove('bg-brand-red', 'text-white');
            tabBmi.classList.add('text-gray-400', 'hover:text-white');

            formBmi.classList.add('hidden');
            formBmi.classList.remove('active');
            
            formCalories.classList.remove('hidden');
            setTimeout(() => formCalories.classList.add('active'), 50);
        });
    }

    // 5. BMI Calculation Logic
    const formBmiEl = document.getElementById('form-bmi');
    if(formBmiEl) {
        formBmiEl.addEventListener('submit', (e) => {
            e.preventDefault();
            const height = parseFloat(document.getElementById('bmi-height').value) / 100;
            const weight = parseFloat(document.getElementById('bmi-weight').value);
            const resultBox = document.getElementById('bmi-result-box');
            const resultEl = document.getElementById('bmi-result');

            if(height > 0 && weight > 0) {
                const bmi = (weight / (height * height)).toFixed(1);
                resultEl.textContent = bmi;
                resultBox.classList.remove('hidden');
            }
        });
    }

    // 6. Calories Calculation Logic
    const formCaloriesEl = document.getElementById('form-calories');
    if(formCaloriesEl) {
        formCaloriesEl.addEventListener('submit', (e) => {
            e.preventDefault();
            const height = parseFloat(document.getElementById('cal-height').value);
            const weight = parseFloat(document.getElementById('cal-weight').value);
            const age = parseInt(document.getElementById('cal-age').value);
            const gender = document.getElementById('cal-gender').value;
            const activity = parseFloat(document.getElementById('cal-activity').value);
            
            const resultBox = document.getElementById('cal-result-box');
            const resultEl = document.getElementById('cal-result');

            if(height > 0 && weight > 0 && age > 0) {
                let bmr = 0;
                if (gender === "male") {
                    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
                } else {
                    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
                }
                
                const calories = Math.round(bmr * activity);
                resultEl.innerHTML = `${calories} <span class="text-xl">kcal/day</span>`;
                resultBox.classList.remove('hidden');
            }
        });
    }

    // 7. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once animated in
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements that need animating
    const animatedElements = document.querySelectorAll(`
        .reveal-up, 
        .slide-in-left, 
        .slide-in-right, 
        .text-reveal, 
        .text-reveal-delay, 
        [class^="card-swoop-"]
    `);

    animatedElements.forEach(el => observer.observe(el));
});
