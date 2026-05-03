 
    // 1. Dark/Light Mode Logic  
    const themeToggleBtn = document.getElementById('themeToggle');  
    const htmlElement = document.documentElement;  
    const icon = themeToggleBtn.querySelector('i');  

    // Check LocalStorage for saved theme  
    const savedTheme = localStorage.getItem('theme') || 'light';  
    htmlElement.setAttribute('data-theme', savedTheme);  
    updateIcon(savedTheme);  

    themeToggleBtn.addEventListener('click', () => {  
        const currentTheme = htmlElement.getAttribute('data-theme');  
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';  
          
        htmlElement.setAttribute('data-theme', newTheme);  
        localStorage.setItem('theme', newTheme);  
        updateIcon(newTheme);  
    });  

    function updateIcon(theme) {  
        if(theme === 'dark') {  
            icon.classList.remove('fa-moon');  
            icon.classList.add('fa-sun');  
        } else {  
            icon.classList.remove('fa-sun');  
            icon.classList.add('fa-moon');  
        }  
    }  

    // 2. Scroll Animation Logic (Intersection Observer)  
    // Ye cards ko tabhi animate karega jab wo screen par aayenge (High-level UX)  
    const cards = document.querySelectorAll('.card');  
      
    const observerOptions = {  
        threshold: 0.1, // Trigger when 10% of card is visible  
        rootMargin: "0px 0px -50px 0px"  
    };  

    const observer = new IntersectionObserver((entries) => {  
        entries.forEach((entry, index) => {  
            if (entry.isIntersecting) {  
                // Staggered delay logic so cards load ek ke baad ek  
                setTimeout(() => {  
                    entry.target.classList.add('show');  
                }, index * 100); // 100ms delay per card  
                observer.unobserve(entry.target); // Animate only once  
            }  
        });  
    }, observerOptions);  

    cards.forEach(card => {  
        observer.observe(card);  
    });  


function changeMedium(mediumClass, event) {
    // Step 1: Pata lagao ki click kis box (card) me hua hai
    let currentCard = event.currentTarget.closest('.card');

    // Step 2: SIRF USI BOX ke andar ki saari links-grid ko chupa do
    currentCard.querySelectorAll('.links-grid').forEach(function(element) {
        element.style.display = 'none';
    });

    // Step 3: SIRF USI BOX ke saare chips se 'active-chip' design hata do
    let allChipsInCard = currentCard.querySelectorAll('.chip');
    allChipsInCard.forEach(function(chip) {
        chip.classList.remove('active-chip');
    });

    // Step 4: SIRF USI BOX ke andar us specific medium (.grid-en, .grid-gu, etc.) ko dikhao 
    let targetGrids = currentCard.querySelectorAll('.grid-' + mediumClass);
    targetGrids.forEach(function(element) {
        element.style.display = 'grid'; 
    });

    // Step 5: Jis chip par click kiya hai, uspe 'active-chip' design laga do
    event.currentTarget.classList.add('active-chip');
}

