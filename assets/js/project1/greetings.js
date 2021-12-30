const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSANAME = "hidden"; //값이 스트링뿐인 변수이름은 대문자로만 작성하는 관습이 있다.
const USERNAME_KEY = "username"; //변수 이름에 오타가 나면 콘솔창에서 경고를 주지만 스트링값에 오타가 나면 찾기 어려움 - 여러번 반복되는 스트링은 변수로 지정해주는 편이 좋음

function onLoginsubmit(event) {
    event.preventDefault(); //기본 동작 막기
    const userName = loginInput.value; //입력값을 userName에 저장하기
    localStorage.setItem(USERNAME_KEY, userName);
    loginForm.classList.add(HIDDEN_CLASSANAME); //폼 지우기
    console.log(userName);
    paintGreeting(userName); //입력된 값을 가져와 인자로 지정한다.
};

function paintGreeting(username) { //두번 이상 쓰이는 식을 함수로 지정한다.
    greeting.innerText = `Hello, ${username}`;
    greeting.classList.remove(HIDDEN_CLASSANAME);
};

const savedUserName = localStorage.getItem(USERNAME_KEY);

if (savedUserName === null) {
    //show the form
    loginForm.classList.remove(HIDDEN_CLASSANAME);
    loginForm.addEventListener("submit", onLoginsubmit);
} else {
    //show the greeting
    paintGreeting(savedUserName); //스토리지의 값을 가져와 인자로 지정한다.
}