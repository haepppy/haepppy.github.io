const clock = document.querySelector("h2#clock");
const dateArea = document.querySelector("h2#date");

function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const year = date.getFullYear();
    const month = String(date.getMonth()).padStart(2,"0");
    const day = String(date.getDay()).padStart(2,"0");

    clock.innerText = `${hours} : ${minutes}`;
    dateArea.innerText = `${year}년 ${month}월 ${day}일`;
};
getClock();
setInterval(getClock, 1000);
