let cnv = document.getElementById('cnv');
let ctx = cnv.getContext('2d');
cnv.width = window.innerWidth;
cnv.height = window.innerHeight;

let offsetX = 0, offsetY = 0;
let start = null;

function draw() {
    let step = 40;
    let left = -offsetX % step;  
    let top = -offsetY % step;  
    let right = cnv.width;
    let bottom = cnv.height;
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.beginPath();

    for (let x = left; x < right; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, cnv.height);
    }
    for (let y = top; y < bottom; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(cnv.width, y);
    }
    ctx.strokeStyle = "#888";
    ctx.stroke();
}

const getPos = (e) => ({
    x: e.clientX,
    y: e.clientY
});

cnv.addEventListener("mousedown", e => {
    start = getPos(e);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
});

function onMouseMove(e) {
    if (!start) return;
    let pos = getPos(e);

    offsetX -= pos.x - start.x; 
    offsetY -= pos.y - start.y;
    start = pos;

    draw();
}

function onMouseUp() {
    start = null;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
}

draw(); // First render
