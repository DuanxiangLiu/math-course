const GRID_COLS = 20;
const GRID_ROWS = 8;
const CELL_W = 900 / GRID_COLS;
const CELL_H = 350 / GRID_ROWS;
const scaleFreqs = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];

const sampleMelody = [1, 2, 3, 5, 6, 5, 3, null, 2, 1, 2, 3, 5, 6, 8, null, 6, 5, 3, 1];

let graphPoints = [];
let hasConflict = false;
let m3_canvas, m3_ctx;
let melodyLoaded = false;

function m3_handleClick(e) {
    if(e.target.classList.contains('coord-point')) return;

    const rect = document.getElementById('m3-grid').getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const col = Math.round(clickX / CELL_W);
    const row = Math.round(clickY / CELL_H);

    if(col < 0 || col > (GRID_COLS-1)) return;
    if(row < 0 || row > (GRID_ROWS-1)) return;

    const mathX = col + 1;
    const mathY = GRID_ROWS - row;

    addPoint(mathX, mathY, col * CELL_W, row * CELL_H);
}

function addPoint(mathX, mathY, px, py) {
    const existingPoint = graphPoints.find(p => p.mathX === mathX && p.mathY === mathY);
    if (existingPoint) {
        existingPoint.el.remove();
        graphPoints = graphPoints.filter(p => p !== existingPoint);
        m3_drawLines();
        checkFunctionRule();
        return;
    }

    const container = document.getElementById('m3-points');
    const dot = document.createElement('div');
    dot.className = 'coord-point absolute w-4 h-4 bg-orange-500 rounded-full cursor-pointer shadow-md -translate-x-1/2 -translate-y-1/2';
    dot.style.left = `${px}px`;
    dot.style.top = `${py}px`;

    dot.title = `点: (${mathX}, ${mathY})`;

    dot.onclick = (e) => {
        e.stopPropagation();
        dot.remove();
        graphPoints = graphPoints.filter(p => p.el !== dot);
        m3_drawLines();
        checkFunctionRule();
    };

    container.appendChild(dot);
    graphPoints.push({ mathX, mathY, px, py, el: dot });

    playTone(scaleFreqs[mathY - 1], 'triangle', 0.3);
    m3_drawLines();
    checkFunctionRule();
}

function m3_drawLines() {
    m3_ctx.clearRect(0, 0, m3_canvas.width, m3_canvas.height);
    if (graphPoints.length < 2) return;

    const sorted = [...graphPoints].sort((a, b) => a.mathX - b.mathX);

    m3_ctx.beginPath();
    m3_ctx.strokeStyle = '#fdba74';
    m3_ctx.lineWidth = 2;
    m3_ctx.lineJoin = 'round';

    sorted.forEach((p, idx) => {
        if(idx === 0) m3_ctx.moveTo(p.px, p.py);
        else m3_ctx.lineTo(p.px, p.py);
    });
    m3_ctx.stroke();
}

function m3_clear() {
    document.getElementById('m3-points').innerHTML = '';
    graphPoints = [];
    m3_drawLines();
    document.getElementById('m3-alert').classList.add('hidden');
}

function checkFunctionRule() {
    hasConflict = false;
    const xCounts = {};
    graphPoints.forEach(p => {
        xCounts[p.mathX] = (xCounts[p.mathX] || 0) + 1;
        if(xCounts[p.mathX] > 1) hasConflict = true;
    });

    const alertBox = document.getElementById('m3-alert');
    const playBtn = document.getElementById('btn-play');

    if (hasConflict) {
        alertBox.classList.remove('hidden');
        playBtn.classList.add('opacity-50', 'cursor-not-allowed');
        playBtn.disabled = true;
    } else {
        alertBox.classList.add('hidden');
        playBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        playBtn.disabled = false;
    }
}

function m3_forcePlay() {
    document.getElementById('m3-alert').classList.add('hidden');
    m3_executePlay();
}

function m3_playGraph() {
    if(graphPoints.length === 0) return alert('请先在右侧网格中点击描点！');
    if(hasConflict) return;
    m3_executePlay();
}

async function m3_executePlay() {
    const btn = document.getElementById('btn-play');
    const scanner = document.getElementById('scanner-line');

    btn.disabled = true;
    scanner.classList.remove('hidden');

    const groupsByX = {};
    graphPoints.forEach(p => {
        if(!groupsByX[p.mathX]) groupsByX[p.mathX] = [];
        groupsByX[p.mathX].push(p);
    });

    const sortedXs = Object.keys(groupsByX).map(Number).sort((a,b)=>a-b);

    if(sortedXs.length === 0) { btn.disabled = false; return; }

    for(let i=0; i<sortedXs.length; i++) {
        const currentX = sortedXs[i];
        const pointsToPlay = groupsByX[currentX];

        const targetLeft = (currentX - 1) * CELL_W;
        scanner.style.left = `${targetLeft}px`;

        pointsToPlay.forEach(p => {
            p.el.classList.add('playing-point');
            playTone(scaleFreqs[p.mathY - 1], 'triangle', 0.4);
        });

        await new Promise(r => setTimeout(r, 400));

        pointsToPlay.forEach(p => {
            p.el.classList.remove('playing-point');
        });

        if (i < sortedXs.length - 1) {
            const nextX = sortedXs[i+1];
            const gap = nextX - currentX;
            if (gap > 1) {
                for(let step = 1; step < gap; step++){
                    scanner.style.left = `${targetLeft + step * CELL_W}px`;
                    await new Promise(r => setTimeout(r, 400));
                }
            }
        }
    }

    scanner.classList.add('hidden');
    scanner.style.left = '0px';
    btn.disabled = false;
}

function initModule3() {
    m3_canvas = document.getElementById('m3-lines');
    m3_ctx = m3_canvas.getContext('2d');
}

function toggleMelody() {
    const btn = document.getElementById('btn-load-melody');
    
    if (melodyLoaded) {
        m3_clear();
        melodyLoaded = false;
        btn.textContent = '🎵 加载示例旋律';
        btn.classList.remove('bg-slate-500', 'hover:bg-slate-600');
        btn.classList.add('bg-amber-500', 'hover:bg-amber-600');
    } else {
        m3_clear();
        
        sampleMelody.forEach((pitch, index) => {
            if (pitch !== null) {
                const mathX = index + 1;
                const mathY = pitch;
                const px = index * CELL_W;
                const py = (GRID_ROWS - pitch) * CELL_H;
                addPoint(mathX, mathY, px, py);
            }
        });
        
        melodyLoaded = true;
        btn.textContent = '🗑️ 清空示例旋律';
        btn.classList.remove('bg-amber-500', 'hover:bg-amber-600');
        btn.classList.add('bg-slate-500', 'hover:bg-slate-600');
    }
}
