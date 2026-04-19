let m2_step = 0;
const root12 = Math.pow(2, 1/12);
let m2_currentRatio = 1;
let m2_canvas, m2_ctx, m2_time = 0;

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = start + (end - start) * easeOut;
        obj.innerHTML = currentVal.toFixed(9);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function updateM2() {
    const stepEl = document.getElementById('m2-step');
    if (m2_step > 0) {
        stepEl.innerText = `+${m2_step}`;
    } else if (m2_step < 0) {
        stepEl.innerText = `${m2_step}`;
    } else {
        stepEl.innerText = '0';
    }
    
    const ratio = 1 / Math.pow(root12, m2_step);
    const freq = BASE_FREQ * Math.pow(root12, m2_step);

    const decEl = document.getElementById('m2-decimal');
    const startVal = parseFloat(decEl.innerText) || 1;
    animateValue(decEl, startVal, ratio, 800);

    playTone(freq, 'sine', 1.5);
    m2_currentRatio = ratio;
}

function m2_stepUp() {
    m2_step++;
    updateM2();
}

function m2_stepDown() {
    m2_step--;
    updateM2();
}

function m2_reset() {
    m2_step = 0;
    updateM2();
}

function initModule2() {
    m2_canvas = document.getElementById('m2-canvas');
    m2_ctx = m2_canvas.getContext('2d');
    resizeCanvas(m2_canvas);
    drawWave2();
}

function drawWave2() {
    m2_ctx.clearRect(0, 0, m2_canvas.width, m2_canvas.height);
    m2_ctx.beginPath();
    m2_ctx.moveTo(0, m2_canvas.height/2);
    m2_ctx.lineTo(m2_canvas.width, m2_canvas.height/2);
    m2_ctx.strokeStyle = '#334155';
    m2_ctx.stroke();

    const freqMult = 1 / m2_currentRatio;
    m2_ctx.beginPath();
    m2_ctx.strokeStyle = '#2dd4bf';
    m2_ctx.lineWidth = 2;
    for (let x = 0; x < m2_canvas.width; x++) {
        const y = m2_canvas.height/2 + Math.sin(x * 0.03 * freqMult + m2_time) * (m2_canvas.height * 0.3);
        if (x === 0) m2_ctx.moveTo(x, y);
        else m2_ctx.lineTo(x, y);
    }
    m2_ctx.stroke();
    m2_time -= 0.1;
    requestAnimationFrame(drawWave2);
}
