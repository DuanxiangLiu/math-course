class QuizComponent {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = options;
        this.answered = false;
    }
    
    init() {
        if (!this.container) return;
        
        const options = this.container.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.addEventListener('click', (e) => this.handleAnswer(e.target));
        });
    }
    
    handleAnswer(selectedOption) {
        if (this.answered) return;
        this.answered = true;
        
        const isCorrect = selectedOption.dataset.correct === 'true';
        const allOptions = this.container.querySelectorAll('.quiz-option');
        
        allOptions.forEach(option => {
            option.disabled = true;
            
            if (option.dataset.correct === 'true') {
                option.classList.add('correct');
            } else if (option === selectedOption) {
                option.classList.add('incorrect');
            }
        });
        
        if (isCorrect) {
            showNotification('🎉 回答正确！太棒了！', 'success');
        } else {
            showNotification('💡 再接再厉，继续努力！', 'info');
        }
        
        const explanation = this.container.querySelector('.explanation');
        if (explanation) {
            explanation.style.display = 'block';
        }
        
        if (this.options.onAnswer) {
            this.options.onAnswer(isCorrect);
        }
    }
    
    reset() {
        this.answered = false;
        const options = this.container.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.disabled = false;
            option.classList.remove('correct', 'incorrect');
        });
        
        const explanation = this.container.querySelector('.explanation');
        if (explanation) {
            explanation.style.display = 'none';
        }
    }
}

window.QuizComponent = QuizComponent;

function initAllQuizzes() {
    const quizzes = document.querySelectorAll('.quiz');
    quizzes.forEach((quiz, index) => {
        quiz.id = quiz.id || `quiz-${index}`;
        const component = new QuizComponent(quiz.id);
        component.init();
    });
}

document.addEventListener('DOMContentLoaded', initAllQuizzes);
