const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"

const canvasWidth = document.getElementsByClassName("canvas")[0].offsetWidth;
const canvasHeight = document.getElementsByClassName("canvas")[0].offsetHeight;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

//브러쉬 기본 값
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvasWidth, canvasHeight);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(e) { //마우스가 캔버스 안에서 움직일 때
    const x = e.offsetX;
    const y = e.offsetY;
    if(!painting) { //마우스를 클릭하고 있지 않을 떄
        ctx.beginPath(); //새 선을 그린다고 선언 (바로 그릴 수 있게 대기중 / 움직이다가 클릭하면 끝)
        ctx.moveTo(x, y); //시작점 (클릭 직전까지 시작점을 저장하고 있음)
    } else { //마우스를 클릭할 때 (클릭한 상태로 마우스를 움직이는 내내 실행되고 있음)
        ctx.lineTo(x, y); //끝나는 점
        ctx.stroke(); //위 설정대로 선을 나타냄
    }
};

function handleColorClick(e) {
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
};

function handelRangeChange(e) {
    const size = e.target.value;
    ctx.lineWidth = size;
};

function handleModeClick() {
    if(filling ===  true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if(filling) { //fill 버튼 활성화 시에만 클릭-fill이 수행됨, 안하면 paint 하려고 클릭해도 채워짐
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }
}

function handleCM(e) {
    e.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "Paint";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
};

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range) { //range변수가 정상적으로 지정되었는지 확인
    range.addEventListener("input", handelRangeChange);
};

if(mode) {
    mode.addEventListener("click", handleModeClick);
};

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}
