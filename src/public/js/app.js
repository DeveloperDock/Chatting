const socket = io(); /* 소켓 접속 */

const form = document.querySelector('form');
const input = document.querySelector('input');
const btn = document.querySelector('button');
const ul = document.querySelector('ul');

let i = 0;

function handleSubmit(evtName, placeholder, btnText) {
    if (i <= 1) i++; /* 입력 수 증가 (닉네임, 방, 메시지 입력 구별 용도) */
    socket.emit(evtName, input.value); /* 이벤트 발생 */
    input.value = ''; /* 입력 비움 */
    input.placeholder = placeholder; /* placeholder 변경 */
    btn.innerText = btnText; /* button innerText 변경 */
}

/* 챗 추가 */
function addMsg(msg) {
    const li = document.createElement('li'); /* li 생성 */
    li.innerText = msg; /* li 내용을 msg로 초기화 */
    ul.appendChild(li); /* chat에 li 추가 */
}

/* 입력 감지 */
form.addEventListener('submit', (e) => {
    e.preventDefault();
    switch (i) {
        case 0 /* 닉네임 입력 후 */:
            handleSubmit('nickname', 'Room Name', 'Enter Room');
            break;
        case 1 /* 방 이름 입력 후 */:
            handleSubmit('room', 'Message', 'Send');
            break;
        default:
            /* 메시지 입력 */
            handleSubmit('msg', 'Message', 'Send');
            break;
    }
});

socket.on('msg', addMsg); /* msg 이벤트 감지, addMsg 실행 */
