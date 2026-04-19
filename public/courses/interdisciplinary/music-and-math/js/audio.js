const AudioContext = window.AudioContext || window.webkitAudioContext;
let actx;
const BASE_FREQ = 261.63;

function playTone(freq, type = 'sine', duration = 0.5) {
    if (!actx) actx = new AudioContext();
    if (actx.state === 'suspended') actx.resume();

    const osc = actx.createOscillator();
    const gain = actx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, actx.currentTime);

    gain.gain.setValueAtTime(0, actx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, actx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + duration);

    osc.connect(gain);
    gain.connect(actx.destination);

    osc.start();
    osc.stop(actx.currentTime + duration);
}
