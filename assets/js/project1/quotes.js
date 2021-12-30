const quotes = [
    {
        quote: "기대해 즐겨 듣던 그 멜로디.",
        author: "괜찮아요",
    },
    {
        quote: "너를 그리워하다 일 년이 가버렸어, 난 그냥 그렇게 살아.",
        author: "그리워하다",
    },
    {
        quote: "차가운 계절은 지나고 봄이 또 찾아왔죠, 이렇게 시린 겨울을 우린 잘 버텨냈네요.",
        author: "봄날의 기억",
    },
    {
        quote: "한 걸음씩 걷다보면 넘어져도 괜찮아요. 틀리면 좀 어때. 그럴 때도 있는 거죠.",
        author: "그려본다 (내가 그린 그림)",
    },
    {
        quote: "나도 알아 요새 많이 힘들었지. 귀 빌려줄 테니 말해봐, 문제가 뭔지.",
        author: "Show Your Love",
    },
    {
        quote: "언젠가 다시 만나 우리. 더 좋은 날에, 우리.",
        author: "언젠가",
    },
    {
        quote: "우린 아직도 꿈을 꾸고 가슴이 뜨겁게 뛰는 걸",
        author: "DREAMER",
    },
    {
        quote: "걱정하지 마 우리의 story는 이제부터 시작이야",
        author: "Finale : 우리들의 콘서트",
    },
    {
        quote: "예전도 지금도 앞으로도 사랑해 어디에 있더라도",
        author: "예지앞사",
    },
    {
        quote: "그 언젠가 이 길의 끝에, 나의 마지막엔 네가 있기를.",
        author: "At The End",
    },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todayQuote = quotes[Math.floor(Math.random() * quotes.length)]; // 이제 명언이 몇개가 되어도 상관 없음(quotes.length를 곱해서)

quote.innerText = todayQuote.quote;
author.innerText = todayQuote.author;
/*
//하지만 0부터 9까지의 수가 필요하다. 그래서 10을 곱해준다

//소수점 없애는 세가지 방법
Math.round() //소수점 아래 숫자들을 반올림 한다.

Math.ceil() //소수점 자리의 숫자를 무조건 올린다. ex) 1.0 = 1, 1.01 = 2 ...

Math.floor() //소수점 자리의 숫자를 무조건 내린다. ex) 1.99 = 1, 2.0 = 2 ...

//지금 사용할건 플로어
Math.floor(Math.random() * 10) //0에서 9사이의 숫자를 랜덤하게 가져온다.
*/
