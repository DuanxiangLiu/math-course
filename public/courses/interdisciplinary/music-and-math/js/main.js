function resizeCanvas(canvas) {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
}

window.onload = () => {
    initModule1();
    initModule2();
    initModule3();
};

window.onresize = () => {
    if (m1_canvas) resizeCanvas(m1_canvas);
    if (m2_canvas) resizeCanvas(m2_canvas);
};
