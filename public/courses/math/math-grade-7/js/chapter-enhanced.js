document.addEventListener('DOMContentLoaded', function() {
    initEnhancedInteractions();
    initQuizEnhancements();
    initScrollAnimations();
    initParticleEffects();
    initProgressTracking();
});

function initEnhancedInteractions() {
    initThermometerDrag();
    initNumberLineEnhanced();
    initSignExplorer();
    initPowerCalculatorEnhanced();
}

function initThermometerDrag() {
    const thermometer = document.getElementById('thermometer');
    const thermometerFill = document.getElementById('thermometer-fill');
    
    if (!thermometer || !thermometerFill) return;
    
    let isDragging = false;
    let startY = 0;
    let currentTemp = 0;
    
    function updateThermometerVisual(temp) {
        const percentage = ((temp + 30) / 80) * 100;
        thermometerFill.style.height = percentage + '%';
        thermometerFill.style.transition = 'height 0.3s ease';
        
        if (temp > 0) {
            thermometerFill.style.background = 'linear-gradient(to top, #fbbf24, #ef4444)';
        } else if (temp < 0) {
            thermometerFill.style.background = 'linear-gradient(to top, #3b82f6, #60a5fa)';
        } else {
            thermometerFill.style.background = '#fbbf24';
        }
        
        const value = document.getElementById('temp-value');
        const label = document.getElementById('temp-label');
        
        if (value) {
            value.textContent = temp + '℃';
            value.style.transform = 'scale(1.1)';
            setTimeout(() => {
                value.style.transform = 'scale(1)';
            }, 200);
        }
        
        if (label) {
            if (temp > 0) {
                label.textContent = '零上 ' + temp + ' 度（正数）';
                label.style.color = '#ef4444';
            } else if (temp < 0) {
                label.textContent = '零下 ' + Math.abs(temp) + ' 度（负数）';
                label.style.color = '#3b82f6';
            } else {
                label.textContent = '零度（既不是正数也不是负数）';
                label.style.color = '#f59e0b';
            }
        }
    }
    
    thermometer.addEventListener('mousedown', function(e) {
        isDragging = true;
        startY = e.clientY;
        thermometer.style.cursor = 'ns-resize';
        e.preventDefault();
    });
    
    thermometer.addEventListener('touchstart', function(e) {
        isDragging = true;
        startY = e.touches[0].clientY;
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const rect = thermometer.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const percentage = 1 - (y / rect.height);
        currentTemp = Math.round(percentage * 80 - 30);
        currentTemp = Math.max(-30, Math.min(50, currentTemp));
        
        updateThermometerVisual(currentTemp);
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        
        const rect = thermometer.getBoundingClientRect();
        const y = e.touches[0].clientY - rect.top;
        const percentage = 1 - (y / rect.height);
        currentTemp = Math.round(percentage * 80 - 30);
        currentTemp = Math.max(-30, Math.min(50, currentTemp));
        
        updateThermometerVisual(currentTemp);
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
        if (thermometer) {
            thermometer.style.cursor = 'pointer';
        }
    });
    
    document.addEventListener('touchend', function() {
        isDragging = false;
    });
    
    window.changeTempEnhanced = function(delta) {
        currentTemp += delta;
        currentTemp = Math.max(-30, Math.min(50, currentTemp));
        updateThermometerVisual(currentTemp);
        
        const btn = event.target;
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 100);
    };
    
    window.setTempEnhanced = function(temp) {
        currentTemp = temp;
        updateThermometerVisual(currentTemp);
    };
}

function initNumberLineEnhanced() {
    const dragPoint = document.getElementById('drag-point');
    const numberLine = document.getElementById('number-line');
    
    if (!dragPoint || !numberLine) return;
    
    dragPoint.style.width = '50px';
    dragPoint.style.height = '50px';
    dragPoint.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    dragPoint.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
    
    let isDragging = false;
    let animationFrame = null;
    
    function updatePointPosition(percentage) {
        const value = Math.round((percentage / 100) * 20 - 10);
        
        dragPoint.style.left = percentage + '%';
        
        const pointLabel = document.getElementById('point-label');
        const currentValue = document.getElementById('current-value');
        const currentAbs = document.getElementById('current-abs');
        const positionInfo = document.getElementById('position-info');
        
        if (pointLabel) {
            pointLabel.textContent = value;
            pointLabel.style.transform = 'scale(1.1)';
            setTimeout(() => {
                pointLabel.style.transform = 'scale(1)';
            }, 100);
        }
        
        if (currentValue) {
            currentValue.textContent = value;
            animateValue(currentValue);
        }
        
        if (currentAbs) {
            currentAbs.textContent = Math.abs(value);
        }
        
        if (positionInfo) {
            if (value > 0) {
                positionInfo.textContent = '这个点在原点右边，表示正数 ' + value;
                positionInfo.style.color = '#22c55e';
            } else if (value < 0) {
                positionInfo.textContent = '这个点在原点左边，表示负数 ' + value;
                positionInfo.style.color = '#ef4444';
            } else {
                positionInfo.textContent = '这个点在原点上，既不是正数也不是负数';
                positionInfo.style.color = '#f59e0b';
            }
        }
        
        if (value > 0) {
            dragPoint.style.borderColor = '#22c55e';
            dragPoint.style.background = 'linear-gradient(135deg, #86efac, #22c55e)';
        } else if (value < 0) {
            dragPoint.style.borderColor = '#ef4444';
            dragPoint.style.background = 'linear-gradient(135deg, #fca5a5, #ef4444)';
        } else {
            dragPoint.style.borderColor = '#f59e0b';
            dragPoint.style.background = 'linear-gradient(135deg, #fcd34d, #f59e0b)';
        }
    }
    
    function animateValue(element) {
        element.style.transform = 'scale(1.2)';
        element.style.transition = 'transform 0.2s ease';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }
    
    dragPoint.addEventListener('mouseenter', function() {
        this.style.transform = 'translate(-50%, -50%) scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)';
    });
    
    dragPoint.addEventListener('mouseleave', function() {
        if (!isDragging) {
            this.style.transform = 'translate(-50%, -50%) scale(1)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
        }
    });
    
    dragPoint.addEventListener('mousedown', function(e) {
        isDragging = true;
        this.style.cursor = 'grabbing';
        this.style.transform = 'translate(-50%, -50%) scale(1.2)';
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const rect = numberLine.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
        
        animationFrame = requestAnimationFrame(() => {
            updatePointPosition(percentage);
        });
    });
    
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            dragPoint.style.cursor = 'grab';
            dragPoint.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    });
    
    dragPoint.addEventListener('touchstart', function(e) {
        isDragging = true;
        this.style.transform = 'translate(-50%, -50%) scale(1.2)';
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        
        const touch = e.touches[0];
        const rect = numberLine.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
        
        animationFrame = requestAnimationFrame(() => {
            updatePointPosition(percentage);
        });
    });
    
    document.addEventListener('touchend', function() {
        if (isDragging) {
            isDragging = false;
            dragPoint.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    });
}

function initSignExplorer() {
    const signBoxes = document.querySelectorAll('[id^="sign-"]');
    
    signBoxes.forEach((box, index) => {
        box.style.cursor = 'pointer';
        box.style.transition = 'all 0.3s ease';
        
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 8px 24px rgba(245, 158, 11, 0.3)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
        
        box.addEventListener('click', function() {
            const count = index + 1;
            showSignDemo(count);
        });
    });
}

function showSignDemo(negativeCount) {
    const existingDemo = document.getElementById('sign-demo-modal');
    if (existingDemo) {
        existingDemo.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = 'sign-demo-modal';
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        max-width: 500px;
        width: 90%;
        animation: modalSlideIn 0.3s ease;
    `;
    
    const factors = [];
    for (let i = 0; i < negativeCount; i++) {
        factors.push('(-2)');
    }
    if (factors.length === 0) factors.push('2');
    
    const expression = factors.join(' × ');
    const result = Math.pow(-2, negativeCount);
    const sign = negativeCount % 2 === 0 ? '正数' : '负数';
    
    modal.innerHTML = `
        <h3 style="margin-bottom: 1rem; color: #1e40af;">🔍 符号规律演示</h3>
        <div style="background: #f8fafc; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
            <p style="font-size: 1.2rem; margin-bottom: 0.5rem;"><strong>表达式：</strong>${expression}</p>
            <p style="font-size: 1.5rem; color: ${negativeCount % 2 === 0 ? '#22c55e' : '#ef4444'};">
                <strong>结果：</strong>${result}（${sign}）
            </p>
        </div>
        <p style="margin-bottom: 1rem;">
            <strong>规律：</strong>负因数个数 = ${negativeCount}（${negativeCount % 2 === 0 ? '偶数' : '奇数'}）
        </p>
        <button onclick="this.parentElement.remove()" style="
            padding: 0.75rem 2rem;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            font-size: 1rem;
            width: 100%;
        ">关闭</button>
    `;
    
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        animation: fadeIn 0.3s ease;
    `;
    
    overlay.addEventListener('click', function() {
        modal.remove();
        overlay.remove();
    });
    
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    
    setTimeout(() => {
        overlay.addEventListener('click', function() {
            modal.remove();
            overlay.remove();
        });
    }, 100);
}

function initPowerCalculatorEnhanced() {
    const baseInput = document.getElementById('power-base');
    const expInput = document.getElementById('power-exp');
    
    if (!baseInput || !expInput) return;
    
    [baseInput, expInput].forEach(input => {
        input.addEventListener('input', function() {
            this.style.borderColor = '#3b82f6';
            setTimeout(() => {
                this.style.borderColor = '#e2e8f0';
            }, 300);
        });
    });
}

function initQuizEnhancements() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    
    quizOptions.forEach(option => {
        option.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.transform = 'translateX(10px)';
                this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }
        });
        
        option.addEventListener('mouseleave', function() {
            if (!this.disabled) {
                this.style.transform = 'translateX(0)';
                this.style.boxShadow = 'none';
            }
        });
        
        option.addEventListener('click', function() {
            const isCorrect = this.dataset.correct === 'true';
            const quiz = this.closest('.quiz');
            const allOptions = quiz.querySelectorAll('.quiz-option');
            
            allOptions.forEach(opt => {
                opt.disabled = true;
                opt.style.cursor = 'default';
                opt.style.transform = 'translateX(0)';
            });
            
            if (isCorrect) {
                this.classList.add('correct');
                this.style.animation = 'correctPulse 0.6s ease';
                showNotification('🎉 回答正确！太棒了！', 'success');
                createConfetti(this);
                updateProgress('correct');
            } else {
                this.classList.add('wrong');
                this.style.animation = 'wrongShake 0.5s ease';
                allOptions.forEach(opt => {
                    if (opt.dataset.correct === 'true') {
                        opt.classList.add('correct');
                        opt.style.animation = 'correctPulse 0.6s ease';
                    }
                });
                showNotification('💡 再想想看，正确答案已经标出了哦！', 'info');
                updateProgress('wrong');
            }
            
            const explanation = quiz.nextElementSibling;
            if (explanation && explanation.classList.contains('explanation')) {
                explanation.style.display = 'block';
                explanation.style.animation = 'slideInUp 0.5s ease';
            }
        });
    });
}

function initScrollAnimations() {
    const sections = document.querySelectorAll('.content-section, .concept-box, .example-box, .interactive-demo, .practice-box');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

function initParticleEffects() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes correctPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        @keyframes wrongShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
        
        @keyframes confettiFall {
            0% {
                transform: translateY(-10px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100px) rotate(720deg);
                opacity: 0;
            }
        }
        
        .confetti {
            position: absolute;
            width: 10px;
            height: 10px;
            background: #f59e0b;
            animation: confettiFall 1s ease-out forwards;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
}

function createConfetti(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#f59e0b', '#22c55e', '#3b82f6', '#ef4444', '#8b5cf6'];
    
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = (rect.left + rect.width / 2 + (Math.random() - 0.5) * 100) + 'px';
        confetti.style.top = (rect.top + rect.height / 2) + 'px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = (Math.random() * 0.3) + 's';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 1500);
    }
}

function initProgressTracking() {
    if (!localStorage.getItem('chapter1_progress')) {
        localStorage.setItem('chapter1_progress', JSON.stringify({
            total: 0,
            correct: 0,
            wrong: 0,
            sections: {}
        }));
    }
}

function updateProgress(type) {
    const progress = JSON.parse(localStorage.getItem('chapter1_progress') || '{}');
    progress.total = (progress.total || 0) + 1;
    
    if (type === 'correct') {
        progress.correct = (progress.correct || 0) + 1;
    } else {
        progress.wrong = (progress.wrong || 0) + 1;
    }
    
    localStorage.setItem('chapter1_progress', JSON.stringify(progress));
    
    const accuracy = progress.total > 0 ? Math.round((progress.correct / progress.total) * 100) : 0;
    console.log(`学习进度：${progress.total}题，正确率：${accuracy}%`);
}

function showNotification(message, type = 'info') {
    const existing = document.querySelector('.enhanced-notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'enhanced-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 1rem;
        background: ${type === 'success' ? '#22c55e' : '#3b82f6'};
        color: white;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        font-size: 1.1rem;
        font-weight: 600;
    `;
    notification.textContent = message;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.5s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

window.changeTempEnhanced = window.changeTempEnhanced || function(delta) {
    console.log('Temperature change function initialized');
};

window.setTempEnhanced = window.setTempEnhanced || function(temp) {
    console.log('Temperature set function initialized');
};
