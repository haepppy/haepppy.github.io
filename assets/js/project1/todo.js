const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");
const checkboxArr = document.querySelectorAll("input[type='checkbox']");

const TODOS_KEY = "toDos";

let toDos = []; //const -> let

function panitCheck(list) {

}

function checkedI(e) {
    let thisCheckedId = parseInt(e.target.id);
    let index = toDos.findIndex(i => i.checkedId === thisCheckedId);
    console.log(index);
    let obj = toDos[index];
    const trueValue = true;
    const falseValue = false;
    if (obj.checked) {
        obj.checked = falseValue
    } else {
        obj.checked = trueValue;
    }
    saveToDos();
    console.log(obj);
};


function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
};

function deleteToDo(e) {
    const thisLi = e.target.parentElement;
    thisLi.remove();
    toDos = toDos.filter((todo) => todo.id !== parseInt(thisLi.id)); //자료형 문자형에서 숫자형으로 바꿔줘야함
    console.log(toDos);
    saveToDos(); //새로 바뀐 배열을 다시 스토리지에 업데이트
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
    checkBox.addEventListener("click", checkedI);
    
    const label = document.createElement("label");
    label.htmlFor = checkId;

    const span2 = document.createElement("span");
    span2.className = "checkBox";

    li.appendChild(checkBox);
    li.appendChild(label);
    label.appendChild(span2);
    label.appendChild(span);
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
