let m1_num = 1, m1_den = 1;
const noteMap = {"1/1":"宫 (Do)", "2/3":"徵 (Sol)", "8/9":"商 (Re)", "16/27":"羽 (La)", "64/81":"角 (Mi)"};
let m1_currentRatio = 1;
let m1_canvas, m1_ctx, m1_time = 0;

function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function updateM1(action, prevNum, prevDen) {
    const ratio = m1_num / m1_den;
    const prevRatio = prevNum / prevDen;
    const freq = BASE_FREQ * (m1_den / m1_num);

    document.getElementById('m1-fraction').innerText = `${m1_num} / ${m1_den}`;
    document.getElementById('m1-note').innerText = noteMap[`${m1_num}/${m1_den}`] || "未知";

    let formulaStr = "";
    if (action === 'sun') formulaStr = `<span class="text-red-500">${prevNum}/${prevDen}</span> × (1-1/3) = ${m1_num}/${m1_den}`;
    else if (action === 'yi') formulaStr = `<span class="text-blue-500">${prevNum}/${prevDen}</span> × (1+1/3) = ${m1_num}/${m1_den}`;
    else formulaStr = "基准长度: 1";
    document.getElementById('m1-formula').innerHTML = formulaStr;

    const strEl = document.getElementById('m1-string');
    const diffEl = document.getElementById('m1-diff');
    strEl.style.width = `${ratio * 100}%`;

    if (action === 'sun') {
        diffEl.style.width = `${(prevRatio - ratio) * 100}%`;
        diffEl.style.left = `${ratio * 100}%`;
        diffEl.className = "absolute top-0 h-full rounded-full transition-all duration-700 opacity-100 string-red";
    } else if (action === 'yi') {
        diffEl.style.width = `${(ratio - prevRatio) * 100}%`;
        diffEl.style.left = `${prevRatio * 100}%`;
        diffEl.className = "absolute top-0 h-full rounded-full transition-all duration-700 opacity-100 string-blue";
    } else {
        diffEl.style.opacity = "0";
    }

    playTone(freq, 'sine', 1.5);
    m1_currentRatio = ratio;
}

function m1_sun() {
    const pN = m1_num, pD = m1_den;
    const g = gcd(m1_num * 2, m1_den * 3);
    m1_num = (m1_num * 2) / g;
    m1_den = (m1_den * 3) / g;
    updateM1('sun', pN, pD);
}

function m1_yi() {
    const pN = m1_num, pD = m1_den;
    const g = gcd(m1_num * 4, m1_den * 3);
    m1_num = (m1_num * 4) / g;
    m1_den = (m1_den * 3) / g;
    updateM1('yi', pN, pD);
}

function m1_reset() {
    m1_num = 1;
    m1_den = 1;
    updateM1('reset', 1, 1);
}

function initModule1() {
    m1_canvas = document.getElementById('m1-canvas');
    m1_ctx = m1_canvas.getContext('2d');
    resizeCanvas(m1_canvas);
    drawWave1();
}

function drawWave1() {
    m1_ctx.clearRect(0, 0, m1_canvas.width, m1_canvas.height);

    m1_ctx.beginPath();
    m1_ctx.moveTo(0, m1_canvas.height/2);
    m1_ctx.lineTo(m1_canvas.width, m1_canvas.height/2);
    m1_ctx.strokeStyle = '#334155';
    m1_ctx.lineWidth = 1;
    m1_ctx.stroke();

    const freqMult = 1 / m1_currentRatio;
    m1_ctx.beginPath();
    m1_ctx.strokeStyle = '#38bdf8';
    m1_ctx.lineWidth = 3;
    for (let x = 0; x < m1_canvas.width; x++) {
        const y = m1_canvas.height/2 + Math.sin(x * 0.02 * freqMult + m1_time) * (m1_canvas.height * 0.4);
        if (x === 0) m1_ctx.moveTo(x, y);
        else m1_ctx.lineTo(x, y);
    }
    m1_ctx.stroke();
    m1_time -= 0.15;
    requestAnimationFrame(drawWave1);
}
