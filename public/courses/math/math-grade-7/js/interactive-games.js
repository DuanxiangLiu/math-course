class MountainAdventure {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.baseTemp = 25;
        this.currentElevation = 0;
        this.maxElevation = 8848;
        this.tempChange = -6;
        
        this.init();
    }
    
    init() {
        this.container.innerHTML = `
            <div class="mountain-scene">
                <div class="mountain-visual">
                    <div class="mountain-bg"></div>
                    <div class="altitude-scale">
                        <span>8848m</span>
                        <span>6000m</span>
                        <span>4000m</span>
                        <span>2000m</span>
                        <span>0m</span>
                    </div>
                    <div class="elevation-marker" id="elevation-marker"></div>
                    <div class="temperature-display" id="temp-display"></div>
                </div>
                
                <div class="control-panel">
                    <h4>🏔️ 登山探险</h4>
                    <p class="hint">调整海拔高度，观察温度变化，回答问题！</p>
                    
                    <div class="slider-container">
                        <label>海拔高度：<span id="elevation-value">0</span> 米</label>
                        <input type="range" id="elevation-slider" min="0" max="8848" value="0" step="100">
                    </div>
                    
                    <div class="info-panel">
                        <div class="info-item">
                            <span class="label">山脚温度：</span>
                            <span class="value">25℃</span>
                        </div>
                        <div class="info-item">
                            <span class="label">温度变化：</span>
                            <span class="value">每1000米降低6℃</span>
                        </div>
                        <div class="info-item highlight">
                            <span class="label">当前温度：</span>
                            <span class="value" id="current-temp">25℃</span>
                        </div>
                    </div>
                    
                    <div class="challenge-box">
                        <h5>🎯 挑战任务</h5>
                        <div id="challenge-content"></div>
                        <div class="answer-input">
                            <input type="number" id="challenge-answer" placeholder="输入你的答案">
                            <button onclick="mountainGame.checkAnswer()">提交答案</button>
                        </div>
                        <div id="feedback"></div>
                    </div>
                </div>
            </div>
        `;
        
        this.addStyles();
        this.setupEvents();
        this.generateChallenge();
    }
    
    addStyles() {
        if (!document.getElementById('mountain-styles')) {
            const style = document.createElement('style');
            style.id = 'mountain-styles';
            style.textContent = `
                .mountain-scene {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                    padding: 1.5rem;
                    background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
                    border-radius: 1rem;
                    margin: 1rem 0;
                }
                
                .mountain-visual {
                    position: relative;
                    height: 400px;
                    background: linear-gradient(to bottom, 
                        #1e3a5f 0%,
                        #4a5568 10%,
                        #87ceeb 30%, 
                        #87ceeb 50%, 
                        #228b22 50%, 
                        #228b22 70%, 
                        #8b4513 70%, 
                        #8b4513 90%,
                        #1e3a5f 90%);
                    border-radius: 1rem;
                    overflow: hidden;
                }
                
                .mountain-bg {
                    position: absolute;
                    bottom: 20%;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 0;
                    border-left: 120px solid transparent;
                    border-right: 120px solid transparent;
                    border-bottom: 200px solid #6b7280;
                }
                
                .mountain-bg::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -60px;
                    width: 0;
                    height: 0;
                    border-left: 60px solid transparent;
                    border-right: 60px solid transparent;
                    border-bottom: 100px solid rgba(255, 255, 255, 0.8);
                }
                
                .mountain-bg::after {
                    content: '🏔️';
                    position: absolute;
                    top: -30px;
                    left: -20px;
                    font-size: 3rem;
                }
                
                .altitude-scale {
                    position: absolute;
                    left: 10px;
                    bottom: 20%;
                    height: 50%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    font-size: 0.75rem;
                    color: white;
                    font-weight: bold;
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
                }
                
                .elevation-marker {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 20px;
                    height: 20px;
                    background: #ef4444;
                    border: 3px solid white;
                    border-radius: 50%;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                    transition: bottom 0.3s ease;
                    z-index: 10;
                }
                
                .temperature-display {
                    position: absolute;
                    right: 10%;
                    bottom: 25%;
                    background: white;
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                    font-size: 1.25rem;
                    font-weight: bold;
                    transition: bottom 0.3s ease;
                    z-index: 5;
                }
                
                .control-panel {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                
                .control-panel h4 {
                    font-size: 1.5rem;
                    color: #1e40af;
                    margin-bottom: 0.5rem;
                }
                
                .hint {
                    color: #64748b;
                    font-style: italic;
                }
                
                .slider-container {
                    background: white;
                    padding: 1rem;
                    border-radius: 0.5rem;
                }
                
                .slider-container label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                }
                
                .slider-container input[type="range"] {
                    width: 100%;
                    height: 8px;
                    border-radius: 4px;
                    background: #e2e8f0;
                    outline: none;
                }
                
                .info-panel {
                    background: white;
                    padding: 1rem;
                    border-radius: 0.5rem;
                }
                
                .info-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid #e2e8f0;
                }
                
                .info-item:last-child {
                    border-bottom: none;
                }
                
                .info-item.highlight {
                    background: #dbeafe;
                    margin: 0 -1rem;
                    padding: 0.5rem 1rem;
                    border-radius: 0.25rem;
                }
                
                .challenge-box {
                    background: #fef3c7;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    border-left: 4px solid #f59e0b;
                }
                
                .challenge-box h5 {
                    color: #92400e;
                    margin-bottom: 0.5rem;
                }
                
                .answer-input {
                    display: flex;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }
                
                .answer-input input {
                    flex: 1;
                    padding: 0.5rem;
                    border: 2px solid #e2e8f0;
                    border-radius: 0.25rem;
                }
                
                .answer-input button {
                    padding: 0.5rem 1.5rem;
                    background: #3b82f6;
                    color: white;
                    border: none;
                    border-radius: 0.25rem;
                    cursor: pointer;
                    font-weight: 600;
                }
                
                .answer-input button:hover {
                    background: #2563eb;
                }
                
                @media (max-width: 768px) {
                    .mountain-scene {
                        grid-template-columns: 1fr;
                    }
                    
                    .mountain-visual {
                        height: 300px;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    setupEvents() {
        const slider = document.getElementById('elevation-slider');
        slider.addEventListener('input', (e) => {
            this.currentElevation = parseInt(e.target.value);
            this.updateDisplay();
        });
    }
    
    updateDisplay() {
        const temp = this.calculateTemp(this.currentElevation);
        
        document.getElementById('elevation-value').textContent = this.currentElevation;
        document.getElementById('current-temp').textContent = temp + '℃';
        
        const marker = document.getElementById('elevation-marker');
        const percentage = 20 + (this.currentElevation / this.maxElevation) * 50;
        marker.style.bottom = percentage + '%';
        
        const tempDisplay = document.getElementById('temp-display');
        tempDisplay.textContent = temp + '℃';
        tempDisplay.style.bottom = (percentage + 5) + '%';
        tempDisplay.style.color = temp > 0 ? '#ef4444' : temp < 0 ? '#3b82f6' : '#f59e0b';
    }
    
    calculateTemp(elevation) {
        const tempChange = (elevation / 1000) * this.tempChange;
        return Math.round(this.baseTemp + tempChange);
    }
    
    generateChallenge() {
        const challenges = [
            {
                question: '当海拔达到 3000 米时，温度是多少？',
                answer: this.calculateTemp(3000),
                hint: '提示：3000 ÷ 1000 × (-6) + 25 = ?'
            },
            {
                question: '珠穆朗玛峰顶（8848米）的温度大约是多少？',
                answer: this.calculateTemp(8848),
                hint: '提示：8848 ÷ 1000 × (-6) + 25 ≈ ?'
            },
            {
                question: '温度降到 0℃ 时，海拔大约是多少米？',
                answer: Math.round((0 - this.baseTemp) / this.tempChange * 1000),
                hint: '提示：设海拔为x米，25 + (x/1000)×(-6) = 0'
            },
            {
                question: '从山脚到 2000 米，温度变化了多少？',
                answer: -12,
                hint: '提示：2000 ÷ 1000 × (-6) = ?'
            }
        ];
        
        this.currentChallenge = challenges[Math.floor(Math.random() * challenges.length)];
        
        document.getElementById('challenge-content').innerHTML = `
            <p><strong>${this.currentChallenge.question}</strong></p>
            <p class="hint">${this.currentChallenge.hint}</p>
        `;
        
        document.getElementById('challenge-answer').value = '';
        document.getElementById('feedback').innerHTML = '';
    }
    
    checkAnswer() {
        const userAnswer = parseInt(document.getElementById('challenge-answer').value);
        const feedback = document.getElementById('feedback');
        
        if (Math.abs(userAnswer - this.currentChallenge.answer) <= 2) {
            feedback.innerHTML = `
                <div style="color: #22c55e; font-weight: bold; margin-top: 1rem;">
                    🎉 正确！太棒了！
                </div>
            `;
            setTimeout(() => this.generateChallenge(), 2000);
        } else {
            feedback.innerHTML = `
                <div style="color: #ef4444; margin-top: 1rem;">
                    ❌ 再想想看！正确答案是 ${this.currentChallenge.answer}
                </div>
            `;
        }
    }
}

class OppositeNumberGame {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.score = 0;
        this.round = 1;
        this.maxRounds = 5;
        this.currentNumber = null;
        
        this.init();
    }
    
    init() {
        this.container.innerHTML = `
            <div class="opposite-game">
                <div class="game-header">
                    <h4>🎯 相反数配对游戏</h4>
                    <div class="game-stats">
                        <span>第 <strong id="round-num">1</strong> 轮</span>
                        <span>得分：<strong id="score-num">0</strong></span>
                    </div>
                </div>
                
                <div class="game-area">
                    <div class="number-line-game" id="number-line-game">
                        <div class="line"></div>
                        <div class="scale-marks" id="scale-marks"></div>
                        <div class="point target" id="target-point"></div>
                        <div class="point player" id="player-point"></div>
                    </div>
                    
                    <div class="instructions">
                        <p>找到 <strong id="target-number">?</strong> 的相反数！</p>
                        <p class="hint">点击数轴上的正确位置</p>
                    </div>
                </div>
                
                <div class="feedback-area" id="feedback-area"></div>
            </div>
        `;
        
        this.addStyles();
        this.setupGame();
    }
    
    addStyles() {
        if (!document.getElementById('opposite-game-styles')) {
            const style = document.createElement('style');
            style.id = 'opposite-game-styles';
            style.textContent = `
                .opposite-game {
                    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                    padding: 2rem;
                    border-radius: 1rem;
                    margin: 1rem 0;
                }
                
                .game-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }
                
                .game-header h4 {
                    font-size: 1.5rem;
                    color: #92400e;
                }
                
                .game-stats {
                    display: flex;
                    gap: 2rem;
                    font-size: 1.1rem;
                }
                
                .number-line-game {
                    position: relative;
                    height: 120px;
                    margin: 3rem 0;
                    cursor: pointer;
                }
                
                .number-line-game .line {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: #1e293b;
                    transform: translateY(-50%);
                }
                
                .number-line-game .line::before,
                .number-line-game .line::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 0;
                    height: 0;
                    border-style: solid;
                }
                
                .number-line-game .line::before {
                    left: 0;
                    border-width: 8px 10px 8px 0;
                    border-color: transparent #1e293b transparent transparent;
                }
                
                .number-line-game .line::after {
                    right: 0;
                    border-width: 8px 0 8px 10px;
                    border-color: transparent transparent transparent #1e293b;
                }
                
                .scale-marks {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                }
                
                .scale-mark {
                    position: absolute;
                    top: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                
                .scale-mark .tick {
                    width: 2px;
                    height: 15px;
                    background: #1e293b;
                    margin-bottom: 5px;
                }
                
                .scale-mark .tick.major {
                    height: 20px;
                    width: 3px;
                }
                
                .scale-mark .label {
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #1e293b;
                }
                
                .number-line-game .point {
                    position: absolute;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    font-size: 1.2rem;
                    transition: all 0.3s ease;
                }
                
                .number-line-game .point.target {
                    background: #3b82f6;
                    color: white;
                    border: 3px solid #1e40af;
                }
                
                .number-line-game .point.player {
                    background: #22c55e;
                    color: white;
                    border: 3px solid #15803d;
                    opacity: 0;
                }
                
                .number-line-game .point.player.show {
                    opacity: 1;
                }
                
                .instructions {
                    text-align: center;
                    font-size: 1.25rem;
                }
                
                .instructions p {
                    margin: 0.5rem 0;
                }
                
                .feedback-area {
                    margin-top: 1.5rem;
                    text-align: center;
                    font-size: 1.1rem;
                    min-height: 60px;
                }
                
                .correct-feedback {
                    color: #22c55e;
                    font-weight: bold;
                    animation: pulse 0.5s ease;
                }
                
                .wrong-feedback {
                    color: #ef4444;
                    font-weight: bold;
                    animation: shake 0.5s ease;
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px); }
                    75% { transform: translateX(10px); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    setupGame() {
        this.createScaleMarks();
        this.generateNumber();
        
        const gameArea = document.getElementById('number-line-game');
        gameArea.addEventListener('click', (e) => this.handleClick(e));
    }
    
    createScaleMarks() {
        const scaleMarks = document.getElementById('scale-marks');
        scaleMarks.innerHTML = '';
        
        for (let i = -10; i <= 10; i++) {
            const percentage = ((i + 10) / 20) * 100;
            const mark = document.createElement('div');
            mark.className = 'scale-mark';
            mark.style.left = percentage + '%';
            
            const isMajor = i % 2 === 0;
            
            mark.innerHTML = `
                <div class="tick ${isMajor ? 'major' : ''}"></div>
                ${isMajor ? `<div class="label">${i}</div>` : ''}
            `;
            
            scaleMarks.appendChild(mark);
        }
    }
    
    generateNumber() {
        this.currentNumber = Math.floor(Math.random() * 10) - 5;
        if (this.currentNumber === 0) this.currentNumber = 5;
        
        const targetPoint = document.getElementById('target-point');
        const percentage = ((this.currentNumber + 10) / 20) * 100;
        targetPoint.style.left = percentage + '%';
        targetPoint.textContent = this.currentNumber;
        
        document.getElementById('target-number').textContent = this.currentNumber;
        
        const playerPoint = document.getElementById('player-point');
        playerPoint.classList.remove('show');
    }
    
    handleClick(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        const clickedNumber = Math.round((percentage / 100) * 20 - 10);
        
        const playerPoint = document.getElementById('player-point');
        const playerPercentage = ((clickedNumber + 10) / 20) * 100;
        playerPoint.style.left = playerPercentage + '%';
        playerPoint.textContent = clickedNumber;
        playerPoint.classList.add('show');
        
        this.checkAnswer(clickedNumber);
    }
    
    checkAnswer(answer) {
        const correctAnswer = -this.currentNumber;
        const feedback = document.getElementById('feedback-area');
        
        if (answer === correctAnswer) {
            this.score += 10;
            feedback.innerHTML = `
                <div class="correct-feedback">
                    🎉 正确！${this.currentNumber} 的相反数是 ${correctAnswer}
                </div>
            `;
        } else {
            feedback.innerHTML = `
                <div class="wrong-feedback">
                    ❌ 错误！${this.currentNumber} 的相反数是 ${correctAnswer}，不是 ${answer}
                </div>
            `;
        }
        
        document.getElementById('score-num').textContent = this.score;
        
        this.round++;
        if (this.round <= this.maxRounds) {
            document.getElementById('round-num').textContent = this.round;
            setTimeout(() => this.generateNumber(), 1500);
        } else {
            setTimeout(() => this.showFinalScore(), 1500);
        }
    }
    
    showFinalScore() {
        const feedback = document.getElementById('feedback-area');
        feedback.innerHTML = `
            <div style="font-size: 1.5rem; font-weight: bold; color: #1e40af;">
                🏆 游戏结束！最终得分：${this.score} 分
            </div>
            <button onclick="oppositeGame.restart()" style="
                margin-top: 1rem;
                padding: 0.75rem 2rem;
                background: #3b82f6;
                color: white;
                border: none;
                border-radius: 0.5rem;
                font-size: 1.1rem;
                cursor: pointer;
            ">再玩一次</button>
        `;
    }
    
    restart() {
        this.score = 0;
        this.round = 1;
        document.getElementById('score-num').textContent = 0;
        document.getElementById('round-num').textContent = 1;
        this.generateNumber();
        document.getElementById('feedback-area').innerHTML = '';
    }
}

class NumberLineJump {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.currentPosition = 0;
        this.operations = [];
        this.score = 0;
        
        this.init();
    }
    
    init() {
        this.container.innerHTML = `
            <div class="jump-game">
                <div class="game-header">
                    <h4>🦘 数轴跳跃游戏</h4>
                    <p class="hint">通过跳跃理解有理数加减法！</p>
                </div>
                
                <div class="number-line-jump" id="number-line-jump">
                    <div class="line-jump"></div>
                    <div class="jumper" id="jumper">🦘</div>
                    <div class="position-labels"></div>
                </div>
                
                <div class="current-state">
                    <div class="position-display">
                        当前位置：<strong id="current-pos">0</strong>
                    </div>
                    <div class="operation-history" id="operation-history">
                        <p>操作记录：</p>
                    </div>
                </div>
                
                <div class="jump-controls">
                    <div class="jump-buttons">
                        <button onclick="jumpGame.jump(5)">向前跳 +5</button>
                        <button onclick="jumpGame.jump(3)">向前跳 +3</button>
                        <button onclick="jumpGame.jump(1)">向前跳 +1</button>
                        <button onclick="jumpGame.jump(-1)">向后跳 -1</button>
                        <button onclick="jumpGame.jump(-3)">向后跳 -3</button>
                        <button onclick="jumpGame.jump(-5)">向后跳 -5</button>
                    </div>
                    <button onclick="jumpGame.reset()" class="reset-btn">重置</button>
                </div>
                
                <div class="challenge-area">
                    <h5>🎯 挑战任务</h5>
                    <div id="jump-challenge"></div>
                    <div class="answer-check">
                        <button onclick="jumpGame.checkPosition()">检查答案</button>
                    </div>
                    <div id="jump-feedback"></div>
                </div>
            </div>
        `;
        
        this.addStyles();
        this.generateJumpChallenge();
    }
    
    addStyles() {
        if (!document.getElementById('jump-game-styles')) {
            const style = document.createElement('style');
            style.id = 'jump-game-styles';
            style.textContent = `
                .jump-game {
                    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
                    padding: 2rem;
                    border-radius: 1rem;
                    margin: 1rem 0;
                }
                
                .game-header h4 {
                    font-size: 1.5rem;
                    color: #1e40af;
                    margin-bottom: 0.5rem;
                }
                
                .number-line-jump {
                    position: relative;
                    height: 120px;
                    margin: 2rem 0;
                    background: white;
                    border-radius: 0.5rem;
                    overflow: hidden;
                }
                
                .line-jump {
                    position: absolute;
                    top: 50%;
                    left: 5%;
                    right: 5%;
                    height: 4px;
                    background: #1e293b;
                    transform: translateY(-50%);
                }
                
                .jumper {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 3rem;
                    transition: left 0.5s ease;
                    z-index: 10;
                }
                
                .position-labels {
                    position: absolute;
                    top: 70%;
                    left: 5%;
                    right: 5%;
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.9rem;
                    color: #64748b;
                }
                
                .position-labels::before {
                    content: '-10  -8  -6  -4  -2  0  2  4  6  8  10';
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                }
                
                .current-state {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin: 1rem 0;
                }
                
                .position-display, .operation-history {
                    background: white;
                    padding: 1rem;
                    border-radius: 0.5rem;
                }
                
                .position-display strong {
                    font-size: 2rem;
                    color: #3b82f6;
                }
                
                .jump-controls {
                    margin: 1.5rem 0;
                }
                
                .jump-buttons {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }
                
                .jump-buttons button {
                    padding: 1rem;
                    background: #3b82f6;
                    color: white;
                    border: none;
                    border-radius: 0.5rem;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                
                .jump-buttons button:hover {
                    background: #2563eb;
                    transform: translateY(-2px);
                }
                
                .reset-btn {
                    width: 100%;
                    padding: 0.75rem;
                    background: #ef4444;
                    color: white;
                    border: none;
                    border-radius: 0.5rem;
                    font-size: 1rem;
                    cursor: pointer;
                }
                
                .challenge-area {
                    background: white;
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }
                
                .challenge-area h5 {
                    color: #1e40af;
                    margin-bottom: 1rem;
                }
                
                .answer-check button {
                    margin-top: 1rem;
                    padding: 0.75rem 2rem;
                    background: #22c55e;
                    color: white;
                    border: none;
                    border-radius: 0.5rem;
                    font-size: 1rem;
                    cursor: pointer;
                }
                
                @media (max-width: 768px) {
                    .jump-buttons {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .current-state {
                        grid-template-columns: 1fr;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        this.createPositionLabels();
    }
    
    createPositionLabels() {
        const labels = document.querySelector('.position-labels');
        for (let i = -10; i <= 10; i += 2) {
            const label = document.createElement('span');
            label.textContent = i;
            labels.appendChild(label);
        }
    }
    
    jump(delta) {
        this.currentPosition += delta;
        this.operations.push(delta > 0 ? `+${delta}` : delta);
        
        const jumper = document.getElementById('jumper');
        const percentage = ((this.currentPosition + 10) / 20) * 90 + 5;
        jumper.style.left = percentage + '%';
        
        document.getElementById('current-pos').textContent = this.currentPosition;
        
        const history = document.getElementById('operation-history');
        history.innerHTML = `
            <p>操作记录：</p>
            <p>${this.operations.join(' → ')}</p>
        `;
    }
    
    reset() {
        this.currentPosition = 0;
        this.operations = [];
        
        const jumper = document.getElementById('jumper');
        jumper.style.left = '50%';
        
        document.getElementById('current-pos').textContent = 0;
        document.getElementById('operation-history').innerHTML = '<p>操作记录：</p>';
        document.getElementById('jump-feedback').innerHTML = '';
        
        this.generateJumpChallenge();
    }
    
    generateJumpChallenge() {
        const challenges = [
            { target: 5, hint: '从0开始，跳到5' },
            { target: -3, hint: '从0开始，跳到-3' },
            { target: 7, hint: '从0开始，跳到7' },
            { target: -8, hint: '从0开始，跳到-8' }
        ];
        
        this.currentChallenge = challenges[Math.floor(Math.random() * challenges.length)];
        
        document.getElementById('jump-challenge').innerHTML = `
            <p><strong>${this.currentChallenge.hint}</strong></p>
        `;
    }
    
    checkPosition() {
        const feedback = document.getElementById('jump-feedback');
        
        if (this.currentPosition === this.currentChallenge.target) {
            this.score += 10;
            feedback.innerHTML = `
                <div style="color: #22c55e; font-weight: bold; margin-top: 1rem;">
                    🎉 正确！你成功跳到了 ${this.currentChallenge.target}！
                </div>
            `;
            setTimeout(() => {
                this.reset();
            }, 2000);
        } else {
            feedback.innerHTML = `
                <div style="color: #ef4444; margin-top: 1rem;">
                    ❌ 还没到！当前位置 ${this.currentPosition}，目标 ${this.currentChallenge.target}
                </div>
            `;
        }
    }
}

class SignPatternExplorer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.factors = [];
        this.result = null;
        
        this.init();
    }
    
    init() {
        this.container.innerHTML = `
            <div class="sign-explorer">
                <div class="explorer-header">
                    <h4>🔍 符号规律探索器</h4>
                    <p class="hint">自己选择因数，发现符号规律！</p>
                </div>
                
                <div class="factor-selector">
                    <h5>选择因数：</h5>
                    <div class="factor-buttons">
                        <button onclick="signExplorer.addFactor(2)" class="positive">+2</button>
                        <button onclick="signExplorer.addFactor(-2)" class="negative">-2</button>
                        <button onclick="signExplorer.addFactor(3)" class="positive">+3</button>
                        <button onclick="signExplorer.addFactor(-3)" class="negative">-3</button>
                        <button onclick="signExplorer.addFactor(5)" class="positive">+5</button>
                        <button onclick="signExplorer.addFactor(-5)" class="negative">-5</button>
                    </div>
                </div>
                
                <div class="expression-display">
                    <h5>当前表达式：</h5>
                    <div class="expression" id="expression">点击上方按钮添加因数</div>
                    <div class="result" id="result"></div>
                </div>
                
                <div class="pattern-analysis">
                    <h5>规律分析：</h5>
                    <div id="analysis"></div>
                </div>
                
                <div class="explorer-controls">
                    <button onclick="signExplorer.calculate()" class="calc-btn">计算结果</button>
                    <button onclick="signExplorer.clear()" class="clear-btn">清空</button>
                </div>
                
                <div class="discovery-zone">
                    <h5>💡 发现规律：</h5>
                    <div id="discovery"></div>
                </div>
            </div>
        `;
        
        this.addStyles();
    }
    
    addStyles() {
        if (!document.getElementById('sign-explorer-styles')) {
            const style = document.createElement('style');
            style.id = 'sign-explorer-styles';
            style.textContent = `
                .sign-explorer {
                    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
                    color: white;
                    padding: 2rem;
                    border-radius: 1rem;
                    margin: 1rem 0;
                }
                
                .explorer-header h4 {
                    font-size: 1.5rem;
                    color: #f59e0b;
                    margin-bottom: 0.5rem;
                }
                
                .factor-selector {
                    margin: 1.5rem 0;
                }
                
                .factor-buttons {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 0.5rem;
                    margin-top: 1rem;
                }
                
                .factor-buttons button {
                    padding: 1rem;
                    font-size: 1.2rem;
                    font-weight: bold;
                    border: none;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                
                .factor-buttons button.positive {
                    background: #22c55e;
                    color: white;
                }
                
                .factor-buttons button.negative {
                    background: #ef4444;
                    color: white;
                }
                
                .factor-buttons button:hover {
                    transform: scale(1.05);
                }
                
                .expression-display {
                    background: rgba(255,255,255,0.1);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    margin: 1.5rem 0;
                }
                
                .expression {
                    font-size: 1.5rem;
                    font-family: 'Courier New', monospace;
                    margin: 1rem 0;
                    min-height: 2rem;
                }
                
                .result {
                    font-size: 2rem;
                    font-weight: bold;
                    color: #f59e0b;
                }
                
                .pattern-analysis {
                    background: rgba(255,255,255,0.1);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }
                
                .explorer-controls {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin: 1.5rem 0;
                }
                
                .explorer-controls button {
                    padding: 1rem;
                    font-size: 1.1rem;
                    font-weight: bold;
                    border: none;
                    border-radius: 0.5rem;
                    cursor: pointer;
                }
                
                .calc-btn {
                    background: #f59e0b;
                    color: white;
                }
                
                .clear-btn {
                    background: #64748b;
                    color: white;
                }
                
                .discovery-zone {
                    background: rgba(245, 158, 11, 0.2);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    border-left: 4px solid #f59e0b;
                }
                
                .discovery-zone h5 {
                    color: #fbbf24;
                    margin-bottom: 1rem;
                }
                
                @media (max-width: 768px) {
                    .factor-buttons {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .explorer-controls {
                        grid-template-columns: 1fr;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    addFactor(value) {
        this.factors.push(value);
        this.updateExpression();
    }
    
    updateExpression() {
        const expression = document.getElementById('expression');
        if (this.factors.length === 0) {
            expression.textContent = '点击上方按钮添加因数';
        } else {
            const display = this.factors.map(f => f > 0 ? `(${f})` : `(${f})`).join(' × ');
            expression.textContent = display;
        }
        
        document.getElementById('result').textContent = '';
        document.getElementById('analysis').textContent = '';
        document.getElementById('discovery').textContent = '';
    }
    
    calculate() {
        if (this.factors.length === 0) return;
        
        this.result = this.factors.reduce((acc, val) => acc * val, 1);
        
        const resultDiv = document.getElementById('result');
        resultDiv.textContent = `= ${this.result}`;
        resultDiv.style.color = this.result > 0 ? '#22c55e' : this.result < 0 ? '#ef4444' : '#fbbf24';
        
        const negativeCount = this.factors.filter(f => f < 0).length;
        const positiveCount = this.factors.filter(f => f > 0).length;
        
        document.getElementById('analysis').innerHTML = `
            <p>正因数个数：${positiveCount}</p>
            <p>负因数个数：${negativeCount}</p>
            <p>总因数个数：${this.factors.length}</p>
        `;
        
        let discovery = '';
        if (negativeCount === 0) {
            discovery = '没有负因数，结果为正数';
        } else if (negativeCount % 2 === 0) {
            discovery = `负因数个数是 ${negativeCount}（偶数），结果为正数`;
        } else {
            discovery = `负因数个数是 ${negativeCount}（奇数），结果为负数`;
        }
        
        document.getElementById('discovery').innerHTML = `
            <p style="font-size: 1.1rem; font-weight: bold;">${discovery}</p>
            <p style="margin-top: 1rem; color: #fbbf24;">
                <strong>规律：</strong>负因数个数是偶数时，积为正；负因数个数是奇数时，积为负。
            </p>
        `;
    }
    
    clear() {
        this.factors = [];
        this.result = null;
        this.updateExpression();
    }
}

class PowerVisualizer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.base = 2;
        this.exponent = 3;
        
        this.init();
    }
    
    init() {
        this.container.innerHTML = `
            <div class="power-viz">
                <div class="viz-header">
                    <h4>📊 乘方可视化</h4>
                    <p class="hint">观察指数增长的过程！</p>
                </div>
                
                <div class="power-controls">
                    <div class="control-group">
                        <label>底数：</label>
                        <input type="number" id="power-base-viz" value="2" min="-10" max="10">
                    </div>
                    <div class="control-group">
                        <label>指数：</label>
                        <input type="number" id="power-exp-viz" value="3" min="1" max="6">
                    </div>
                    <button onclick="powerViz.visualize()">可视化</button>
                </div>
                
                <div class="power-display">
                    <div class="power-visual" id="power-visual"></div>
                    <div class="power-result" id="power-result"></div>
                </div>
                
                <div class="power-explanation" id="power-explanation"></div>
            </div>
        `;
        
        this.addStyles();
        this.visualize();
    }
    
    addStyles() {
        if (!document.getElementById('power-viz-styles')) {
            const style = document.createElement('style');
            style.id = 'power-viz-styles';
            style.textContent = `
                .power-viz {
                    background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
                    padding: 2rem;
                    border-radius: 1rem;
                    margin: 1rem 0;
                }
                
                .viz-header h4 {
                    font-size: 1.5rem;
                    color: #6b21a8;
                    margin-bottom: 0.5rem;
                }
                
                .power-controls {
                    display: flex;
                    gap: 1rem;
                    align-items: flex-end;
                    margin: 1.5rem 0;
                    flex-wrap: wrap;
                }
                
                .control-group {
                    flex: 1;
                    min-width: 120px;
                }
                
                .control-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                }
                
                .control-group input {
                    width: 100%;
                    padding: 0.5rem;
                    font-size: 1.1rem;
                    border: 2px solid #c084fc;
                    border-radius: 0.25rem;
                }
                
                .power-controls button {
                    padding: 0.75rem 2rem;
                    background: #9333ea;
                    color: white;
                    border: none;
                    border-radius: 0.5rem;
                    font-size: 1.1rem;
                    cursor: pointer;
                }
                
                .power-display {
                    background: white;
                    padding: 2rem;
                    border-radius: 0.5rem;
                    margin: 1.5rem 0;
                    min-height: 200px;
                }
                
                .power-visual {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    justify-content: center;
                    margin-bottom: 1rem;
                }
                
                .factor-box {
                    padding: 1rem;
                    background: #9333ea;
                    color: white;
                    border-radius: 0.5rem;
                    font-weight: bold;
                    font-size: 1.2rem;
                    animation: fadeInScale 0.3s ease;
                }
                
                @keyframes fadeInScale {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                .power-result {
                    text-align: center;
                    font-size: 2rem;
                    font-weight: bold;
                    color: #6b21a8;
                }
                
                .power-explanation {
                    background: rgba(147, 51, 234, 0.1);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    border-left: 4px solid #9333ea;
                }
                
                @media (max-width: 768px) {
                    .power-controls {
                        flex-direction: column;
                    }
                    
                    .control-group {
                        width: 100%;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    visualize() {
        const base = parseInt(document.getElementById('power-base-viz').value);
        const exp = parseInt(document.getElementById('power-exp-viz').value);
        
        if (isNaN(base) || isNaN(exp) || exp < 1 || exp > 6) {
            alert('请输入有效的底数和指数（指数1-6）');
            return;
        }
        
        this.base = base;
        this.exponent = exp;
        
        const visual = document.getElementById('power-visual');
        visual.innerHTML = '';
        
        const factors = [];
        for (let i = 0; i < exp; i++) {
            factors.push(base);
        }
        
        factors.forEach((factor, index) => {
            setTimeout(() => {
                const box = document.createElement('div');
                box.className = 'factor-box';
                box.textContent = factor;
                visual.appendChild(box);
                
                if (index < factors.length - 1) {
                    const times = document.createElement('span');
                    times.textContent = ' × ';
                    times.style.fontSize = '1.5rem';
                    times.style.fontWeight = 'bold';
                    visual.appendChild(times);
                }
            }, index * 300);
        });
        
        setTimeout(() => {
            const result = Math.pow(base, exp);
            const resultDiv = document.getElementById('power-result');
            resultDiv.textContent = `= ${result}`;
            resultDiv.style.color = result > 0 ? '#22c55e' : result < 0 ? '#ef4444' : '#f59e0b';
            
            let explanation = '';
            if (base < 0) {
                if (exp % 2 === 0) {
                    explanation = `底数是负数，指数是偶数，结果为正数。`;
                } else {
                    explanation = `底数是负数，指数是奇数，结果为负数。`;
                }
            } else if (base > 0) {
                explanation = `底数是正数，结果总是正数。`;
            } else {
                explanation = `底数是0，结果总是0。`;
            }
            
            document.getElementById('power-explanation').innerHTML = `
                <p><strong>解释：</strong>${explanation}</p>
                <p style="margin-top: 0.5rem;">
                    <strong>计算过程：</strong>${base}<sup>${exp}</sup> = ${factors.join(' × ')} = ${result}
                </p>
            `;
        }, exp * 300 + 500);
    }
}

let mountainGame, oppositeGame, jumpGame, signExplorer, powerViz;

document.addEventListener('DOMContentLoaded', function() {
    mountainGame = new MountainAdventure('mountain-adventure');
    oppositeGame = new OppositeNumberGame('opposite-number-game');
    jumpGame = new NumberLineJump('number-line-jump');
    signExplorer = new SignPatternExplorer('sign-pattern-explorer');
    powerViz = new PowerVisualizer('power-visualizer');
});
