document.addEventListener('DOMContentLoaded', function() {
    initNumberSlider();
    initQuiz();
    initChapterNav();
});

function initNumberSlider() {
    const slider = document.getElementById('number-slider');
    const marker = document.getElementById('marker');
    const valueDisplay = document.getElementById('slider-value');
    
    if (!slider || !marker || !valueDisplay) return;
    
    slider.addEventListener('input', function() {
        const value = parseFloat(this.value);
        const min = parseFloat(this.min);
        const max = parseFloat(this.max);
        const percentage = ((value - min) / (max - min)) * 100;
        
        marker.style.left = percentage + '%';
        marker.textContent = value;
        valueDisplay.textContent = '当前数值：' + value;
        
        if (value > 0) {
            marker.style.color = '#22c55e';
        } else if (value < 0) {
            marker.style.color = '#ef4444';
        } else {
            marker.style.color = '#f59e0b';
        }
    });
}

function initQuiz() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            const isCorrect = this.dataset.correct === 'true';
            const quiz = this.closest('.quiz');
            const allOptions = quiz.querySelectorAll('.quiz-option');
            
            allOptions.forEach(opt => {
                opt.disabled = true;
                opt.style.cursor = 'default';
            });
            
            if (isCorrect) {
                this.classList.add('correct');
                showNotification('🎉 回答正确！太棒了！');
            } else {
                this.classList.add('wrong');
                allOptions.forEach(opt => {
                    if (opt.dataset.correct === 'true') {
                        opt.classList.add('correct');
                    }
                });
                showNotification('💡 再想想看，正确答案已经标出了哦！');
            }
        });
    });
}

function initChapterNav() {
    const navItems = document.querySelectorAll('.chapter-nav-item');
    const sections = document.querySelectorAll('.content-section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            const link = item.querySelector('a');
            if (link && link.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}
