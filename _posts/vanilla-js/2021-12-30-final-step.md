---
layout: single
title:  "바닐라 JS로 크롬 앱 만들기 - 완성"
folder: "vanilla-js"

categories:
    - vanilla-js


author_profile: true
sidebar:
  nav: "side"
related: false

toc: true
toc_label: "목록"
toc_icon: "star"
toc_sticky: true
---

드디어 완성했다!  

**강의에서 만든 페이지 내용**  

1. 시계
2. 로그인 입력창
3. 로그인 정보 표시
4. 랜덤 명언
5. 지역 및 날씨
6. 투두리스트

--

**응용해서 추가한 내용**

1. 날짜
2. 투두리스트의 체크박스
    - 체크박스의 css 및 편의 위해 label 태그 사용
    - 체크박스의 checked 여부를 아이템 객체에 저장하고 불러와 적용
    - 체크될 때 텍스트 효과 추가
3. 포커스 되면 플레이스 홀더가 사라지는 입력창
4. submit된 리스트 편집하는 함수 추가
  - 데스크탑 : 리스트 오른쪽 연필 아이콘 버튼 클릭해서 실행
  - 모바일 : 왼쪽으로 밀어서 실행
5. 리스트 전체 삭제 버튼 추가
6. 포인트 컬러 변경할 수 있는 페이지 추가

[완성본 보기](/assets/html/project1.html)  

---

## 1. 날짜  

```js
const year = date.getFullYear();
const month = String(date.getMonth()+1).padStart(2,"0");
const day = String(date.getDate()).padStart(2,"0");
const week = ['일', '월', '화', '수', '목', '금', '토'];
const weekName = week[date.getDay()];

dateArea.innerText = `${year}년 ${month}월 ${day}일 ${weekName}요일`;
```
- `.getMonth()+1` : 0부터 시작한다. (0 : 1월)

## 2. 투두리스트의 체크박스  

```js
function checkedE(e) {
    let thisCheckedId = parseInt(e.target.id); //체크박스 아이디 저장
    //toDos 배열에서 checkedId가 일치하는 객체를 찾아 인덱스를 반환
    let index = toDos.findIndex(i => i.checkedId === thisCheckedId);
    let obj = toDos[index]; //해당 아이디가 존재하는 객체를 불러와서
    const trueValue = true;
    const falseValue = false;
    if (obj.checked) { //체크 여부를 토글시킨다
        obj.checked = falseValue
    } else {
        obj.checked = trueValue;
    }
    saveToDos(); //체크 여부를 갱신한 배열을 다시 저장한다.
};

//paintToDo 함수에 체트박스 요소 추가
const checkBox = document.createElement("input");
checkBox.type = "checkbox";
const checkId = newTodo.checkedId;
checkBox.id = checkId;
const thisCheck = newTodo.checked; //체크박스의 체크 여부
checkBox.checked = thisCheck;
checkBox.addEventListener("click", checkedE);

//handleToDoSubmit 함수에서 설정하는 객체에 체트박스 요소 추가
let newToDoObj = { //체크박스 관련 정보도 함께 저장
    text: newTodo,
    id: Date.now(),
    checkedId: Math.floor(Date.now()/2),
    checked: false,
}
```

- 체크박스를 지닌 투두리스트를 만들기 위해서는 새로고침 후에도 체크박스는 그대로여야한다.
  - 체크박스의 상태를 로컬 스토리지에 저장한다.
- `arr.findIndex(i => i.key === value)`
  - 객체로 이루어진 배열에서 객체의 키값을 대조해 배열 인덱스를 찾는다.

## 3. 플레이스홀더  
css에서 `:focus::placeholder`의 스타일을 `display: none;`으로 설정한다.

## 4. 리스트 편집 함수  
1. 모바일에선 좁은 너비로 인해 편집 아이콘을 넣지 않고 터치 제스처를 통해 이벤트를 얻는다.
2. 프롬프트의 기본 텍스트는 기존의 리스트 내용에서 불러온다.
  - 모바일 사파리 브라우저에서 form의 submit 이벤트가 작동하지 않았다.
  - 그 이유와 해결을 찾지 못해 모바일 화면에서는 프롬프트로 input을 대신하기로 했다.
3. 확인을 터치할 시엔 프롬프트의 내용을 리스트에 할당하고, 취소를 터치할 시엔 기존의 내용을 그대로 할당한다.  

```js
let changedObj;

let startX = 0;
let endX = 0;


function handleEditBtnClick(e) {
    console.dir(e);
    if(!editOn) {
        editOn = true;
    } else {
        editOn = false;
    }
}

//editBtn 클릭시 입력창 나타내고 입력창 있는 상태에서 클릭시 submit 동작 진행
function paintChangeInput(e) {
    const editOn = e.target.parentElement.children[4];

    if (!editOn) {
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

    } else if(editOn) {
        editClick(e);
    };

};

function editSubmit(e) {
    e.preventDefault();

    const inputValue = e.target.lastChild.value;
    const span = e.path[1].children[1].lastChild;

    changedObj.text = inputValue;
    span.innerText = String(inputValue);

    e.target.remove();
    saveToDos();
}

function editClick(e) {
    const inputValue = e.target.parentElement.lastChild.firstChild.value;
    const span = e.target.parentElement.children[1].children[1];
    
    span.innerText = String(inputValue);
    span.classList.remove(HIDDEN_STYLE);

    e.target.parentElement.lastChild.remove();
    saveToDos();
}

//모바일에서 리스트 왼쪽으로 미는 것을 감지
function touchStart(s) {
    startX = s.changedTouches[0].pageX;
};

function touchEnd (e) {
    endX = e.changedTouches[0].pageX;
    touchMove(e);
};

function touchMove(m) {
    let moveX = startX - endX;
    const target = m.target.tagName;
    if (moveX > 30) { //30px 이상 이동할 경우에 실행한다.
        const checkBox = document.querySelector(".checkBox");
        m.target.classList.add(HIDDEN_STYLE);
        promptFunc(m);
    };
};

toDoList.addEventListener("touchstart", touchStart, false);
toDoList.addEventListener("touchend", touchEnd, false);

//모바일에서 슬라이딩을 감지했을 경우 수행하는 함수
function promptFunc(span) {
    const spanText = String(span.target.innerText);
    const newText = window.prompt("Edit To Do List", spanText);

    const thisId = parseInt(span.target.offsetParent.id);
    const index = toDos.findIndex(i => i.id === thisId);

    if (newText === null) { //프롬프트 창에서 취소를 눌렀을 경우
        span.target.innerText = spanText;
    } else {
        span.target.innerText = newText;
        changedObj = toDos[index];
        changedObj.text = newText;
    }
    
    span.target.classList.remove(HIDDEN_STYLE);
    saveToDos();
}
```

## 5. 전체 삭제 버튼  

```js
const deleteAllBtn = document.querySelector("#delete-all");

function deleteAll() {
    toDoList.innerHTML = "";
    toDos = [];
    localStorage.removeItem(TODOS_KEY);
}

deleteAllBtn.addEventListener("click", deleteAll);
```
- 처음 구상에서는 `toDoList.remove();`, `localStorage.removeItem(TODOS_KEY);` 이렇게만 작성했지만 문제를 발견
  - 전체 삭제 버튼을 누름(항목 지워짐) → 새로고침 안하고 바로 새 항목 추가 : 새로 추가한 항목이 리스트에 보이지 않음 → 새로고침 하니까 지워진 줄 알았던 항목에 새로 추가한 항목까지 리스트가 나타남
  - 하지만 전체삭제 버튼을 한번 누르고 바로 새로고침을 하면 정상적으로 작동됨.
- 원인 1. `<li>`태그를 지웠어야 했는데 `<ul>`태그를 지우는 바람에 새로 추가하는 항목이 안보임!
- 원인 2. 스토리지의 내용은 비웠지만 비워진 배열이 현재 적용되기 전 → 새로고침 하면 현재 배열에 적용 되지만 그러지 않기 위해 현재 배열의 내용을 지워준다.

## 6. 전체 포인트 컬러 변경  

```css
:root { 
    --main-color: #6667AB;
}

.default {
    background-color: #6667AB;
}
.pink {
    background-color: #d88c99;
}
.yellow {
    background-color: #f2d0aa;
}
.black {
    background-color: #000;
}
.green {
    background-color: #85ad68;
}
.blue {
    background-color: #87a5c1;
}
```

- `:root` 선택자를 사용해 전역 변수를 지정한다.
  - 이때, 변수명은 "--" + "변수명" 형태로 한다.
  - 이후 색상값을 넣을 자리에 `var(--main-color)`를 작성하면 변수로 지정한 색상으로 보여진다.
- 포인트 색상을 사용한 모든 자리에 변수로 지정한 뒤 스크립트를 이용하여 변수만 변경한다.


```js
const colorSetPage = document.querySelector("#color-setting");
const setting = document.querySelector("#setting");
const backIcon = document.querySelector(".back-icon");
const colorCircle = document.querySelector(".color-grid");
let changeColor = localStorage.getItem("color"); //새로고침 해도 변하지 않게 하기 위해 color 정보를 저장한다.

function colorSetting() {
    colorSetPage.classList.toggle(HIDDEN_STYLE);
}

function colorChange(e) {
    const circle = e.target;
    const thisColor = `.${circle.classList[1]}`;
    const colorInfo = document.querySelector(thisColor);

    //클릭한 컬러 버튼의 배경 값을 가져온다.
    const colorValue = window.getComputedStyle(colorInfo).getPropertyValue('background-color');

    localStorage.setItem("color", colorValue); //그 값을 스토리지에 저장
    document.documentElement.style.setProperty('--main-color', colorValue); //변수 설정
    colorSetPage.classList.add(HIDDEN_STYLE);
}

setting.addEventListener("click", colorSetting);
backIcon.addEventListener("click", colorSetting);
colorCircle.addEventListener("click", colorChange);

if (changeColor !== null) { //스토리지에 값이 존재할 경우 컬러 변수를 그 값으로 설정한다.
    document.documentElement.style.setProperty('--main-color', changeColor);
};
```
