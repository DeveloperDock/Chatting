const socket = io(); /* 소켓 접속 */

const form = document.querySelector('form');
const input = document.querySelector('input');
const btn = document.querySelector('button');
const ul = document.querySelector('ul');

let i = 0;

function handleSubmit(e) {
    e.preventDefault();

    switch (i) {
        case 0:
            i++;
            socket.emit('nickname', input.value);
            input.value = '';
            input.placeholder = 'Room Name';
            btn.innerText = 'Enter Room';
            break;
        case 1:
            i++;
            socket.emit('room', input.value);
            input.value = '';
            input.placeholder = 'Message';
            btn.innerText = 'Send';
            break;
        default:
            socket.emit('msg', input.value);
            input.value = '';
            break;
    }
}

/* 챗 추가 */
function addMsg(msg) {
    const li = document.createElement('li'); /* li 생성 */
    li.innerText = msg; /* li 내용을 msg로 초기화 */
    ul.appendChild(li); /* chat에 li 추가 */
}

form.addEventListener('submit', handleSubmit); /* 닉네임 입력 감지 */

socket.on('msg', addMsg); /* msg 이벤트 감지, addMsg 실행 */
