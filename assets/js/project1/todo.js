const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");
const checkboxArr = document.querySelectorAll("input[type='checkbox']");

let deviceSize = window.matchMedia("screen and (max-width: 1023px)");

const TODOS_KEY = "toDos";
const HIDDEN_STYLE = "hidden";

let toDos = []; //const -> let


function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
};

function deleteToDo(e) {
    const thisLi = e.target.parentElement;
    thisLi.remove();
    toDos = toDos.filter((todo) => todo.id !== parseInt(thisLi.id)); //자료형 문자형에서 숫자형으로 바꿔줘야함
    saveToDos(); //새로 바뀐 배열을 다시 스토리지에 업데이트
};

function checked(e) {
    let thisCheckedId = parseInt(e.target.id);
    let index = toDos.findIndex(i => i.checkedId === thisCheckedId);
    let obj = toDos[index];
    const trueValue = true;
    const falseValue = false;
    if (obj.checked) {
        obj.checked = falseValue
    } else {
        obj.checked = trueValue;
    }
    saveToDos();
};

function paintToDo(newTodo) { //이 함수가 받는 것은 더이상 string이 아니고 object임
    const li = document.createElement("li");
    li.id = newTodo.id; //li의 id를 오브젝트의 아이디로 지정

    const span = document.createElement("span");
    span.innerText = newTodo.text; //object의 text와 id 중 text 부분을 가져옴
    /*span.className = textArea;*/

    const btn = document.createElement("button");
    btn.innerText = "×";
    btn.addEventListener("click", deleteToDo);

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    const checkId = newTodo.checkedId;
    checkBox.id = checkId;
    const thisCheck = newTodo.checked;
    checkBox.checked = thisCheck;
    checkBox.addEventListener("click", checked);
    
    const label = document.createElement("label");
    label.htmlFor = checkId;

    const span2 = document.createElement("span");
    span2.className = "checkBox";

    const editBtn = document.createElement("span");
    editBtn.className = "editBtn";
    editBtn.addEventListener("click", clickEditBtn);

    li.appendChild(checkBox);
    li.appendChild(label);
    label.appendChild(span2);
    label.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(btn); //순서! span 다음으로 들어와야 함
    toDoList.appendChild(li); //전체적으로 append는 가장 마지막에 작성되어야 함
};

function handleToDoSubmit(e) {
    e.preventDefault();
    const newTodo = toDoInput.value; //여기서 새 변수에 값을 할당했으므로
    toDoInput.value = ""; //값을 비운다고 해서 이미 할당된 변수가 변하진 않음.
    let newToDoObj = {
        text: newTodo,
        id: Date.now(),
        checkedId: Math.floor(Date.now()/2),
        checked: false,
    }
    toDos.push(newToDoObj);
    paintToDo(newToDoObj); //위에서 생성한 변수를 paintToDo 함수로 보내기
    saveToDos();
};

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos; //toDos 배열이 항상 빈 배열로 시작하는 것을 막기 위함 (예전 복사본 유지하기)
    parsedToDos.forEach(paintToDo); //array의 각 item에 대해 paintToDo 실행 
};


/* delete all btn */
const deleteAllBtn = document.querySelector("#delete-all");

function deleteAll() {
    toDoList.innerHTML = "";
    toDos = [];
    localStorage.removeItem(TODOS_KEY);
}

deleteAllBtn.addEventListener("click", deleteAll);


/* edit event */
let changedObj;


//데스크탑
function pressEnter(e) {
    if(e.keyCode == 13) {
        e.preventDefault();
        console.dir(e);
        const value = e.target.value;
        const span = e.path[2].children[1].lastChild;

        changedObj.text = value;
        span.innerText = String(value);

        e.target.parentElement.remove();
        saveToDos();
    };
};

function clickEditBtn(e) {
    const editOn = e.target.parentElement.children[4];

    if (!editOn) {
        paintEditInput(e);

    } else if(editOn) {
        editClickSubmit(e);
    };
};

function paintEditInput(e) {
    const thisLi = e.target.offsetParent;
    const thisSpan = thisLi.children[1].lastChild;
    const form = document.createElement("form");
    const textArea = document.createElement("textarea");

    textArea.value = String(thisSpan.innerText);
    textArea.className = "edit-textarea";
    textArea.focus();
    textArea.addEventListener("keydown", pressEnter);

    const thisId = parseInt(thisLi.id);
    const index = toDos.findIndex(i => i.id === thisId);
    changedObj = toDos[index];

    form.appendChild(textArea);
    thisLi.appendChild(form);

    /*
    const thisLi = e.target.offsetParent;
    const thisSpan = thisLi.children[1].lastChild;
    const form = document.createElement("form");
    const input = document.createElement("input");

    form.id = 'changeList';
    form.addEventListener("submit", editSubmit);

    input.type = "text";
    input.value = String(thisSpan.innerText);
    input.autofocus = 'true';
    input.className = "change-input";
    thisSpan.innerHTML = "";

    const thisId = parseInt(thisLi.id);
    const index = toDos.findIndex(i => i.id === thisId);
    changedObj = toDos[index];

    form.appendChild(input);
    thisLi.appendChild(form);
    */
}

function editSubmit(e) {
    e.preventDefault();

    const inputValue = e.target.lastChild.value;
    const span = e.path[1].children[1].lastChild;

    changedObj.text = inputValue; //배열 내용 업데이트
    span.innerText = String(inputValue);

    e.target.remove();
    saveToDos();
}

function editClickSubmit(e) {
    const inputValue = e.target.parentElement.lastChild.firstChild.value;
    const span = e.target.parentElement.children[1].children[1];
    
    changedObj.text = inputValue;
    span.innerText = String(inputValue);

    e.target.parentElement.lastChild.remove();
    saveToDos();
}

//옆으로 밀기 이벤트 - touch

let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;

let moveType = -1;
let hSlope = ((window.innerHeight / 2) / window.innerWidth).toFixed(2) * 0.3;


function getMoveType(x, y) {
    moveType = -1;
    let nDis = x + y;
    if(nDis < 30) {return moveType};

    let slope = parseFloat((y / x).toFixed(2), 10);
    console.log("slope", slope);
    console.log("hslope", hSlope);
    if(slope > hSlope || slope < 0) {
        moveType = 1;
    } else {
        moveType = 0;
    }

    return moveType;
}

function touchStart(e) {
    startX = e.changedTouches[0].pageX;
    startY = e.changedTouches[0].pageY;
};

function touchEnd (e) {
    endX = e.changedTouches[0].pageX;
    endY = e.changedTouches[0].pageY;
    touchMove(e);
};

function touchMove(e) {
    let moveX = startX - endX;
    let moveY = startY - endY;
    moveType = getMoveType(moveX, moveY);
    console.log(moveType);

    const target = e.target.tagName;
    if (target == 'SPAN' && moveType === 0) {
        console.log("a",moveType);
        e.target.classList.add(HIDDEN_STYLE);
        promptFunc(e);
    };
};

toDoList.addEventListener("touchstart", touchStart, false);
toDoList.addEventListener("touchend", touchEnd, false);

/* 모바일 프롬프트 */
function promptFunc(span) {
    const spanText = String(span.target.innerText);
    const newText = window.prompt("Edit To Do List", spanText);

    const thisId = parseInt(span.target.offsetParent.id);
    const index = toDos.findIndex(i => i.id === thisId);

    if (newText === null) {
        span.target.innerText = spanText;
    } else {
        span.target.innerText = newText;
        changedObj = toDos[index];
        changedObj.text = newText;
    }
    
    span.target.classList.remove(HIDDEN_STYLE);
    saveToDos();
}


/* color setting page */
const colorSetPage = document.querySelector("#color-setting");
const setting = document.querySelector("#settingBtn");
const backIcon = document.querySelector(".back-icon");
const colorCircle = document.querySelector(".color-grid");
let changeColor = localStorage.getItem("color");

function colorSetting() {
    colorSetPage.classList.toggle(HIDDEN_STYLE);
}

function colorChange(e) {
    const color = e.target;
    const thisColor = `.${color.classList[1]}`;
    const colorInfo = document.querySelector(thisColor);
    const colorValue = window.getComputedStyle(colorInfo).getPropertyValue('background-color');
    localStorage.setItem("color", colorValue);
    document.documentElement.style.setProperty('--main-color', colorValue);
    colorSetPage.classList.add(HIDDEN_STYLE);
}

setting.addEventListener("click", colorSetting);
backIcon.addEventListener("click", colorSetting);
colorCircle.addEventListener("click", colorChange);

if (changeColor !== null) {
    document.documentElement.style.setProperty('--main-color', changeColor);
};

//to do list scroll
function onScroll(e) {
    e.preventDefault();

    if(e.deltaY < 0) { //위로 스크롤
        this.scrollBy({
            top: -100,
            left: 0,
            behavior: 'smooth'
        });
    } else { //아래로 스크롤
        this.scrollBy({
            top: 100,
            left: 0,
            behavior: 'smooth'
        });
    }
}

toDoList.addEventListener("wheel", onScroll, false);