const socket = io(); /* 소켓 접속 */

const nickname = document.getElementById("nickname"); /* nickname 접근 */
const room = document.getElementById("room"); /* room 접근 */
const chat = document.getElementById("chat");
const msg = document.getElementById("msg"); /* chat 접근 */

room.hidden = true; /* room 숨김 */
chat.hidden = true; /* chat 숨김 */
msg.hidden = true; /* msg 숨김 */
/* dvsvdv */
/* 챗 입력시 */
function handleMsgSubmit(e) {
    e.preventDefault(); /* 새로고침 막기 */

    const input = msg.querySelector("input"); /* input 접근 */

    socket.emit("msg", input.value); /* msg 이벤트 실행, 입력값 전달 */

    input.value = ""; /* 입력창 내용 제거 */
}

/* 방 입력 시 */
function handleRoomSubmit(e) {
    e.preventDefault(); /* 새로고침 막기 */

    room.hidden = true; /* room 숨김 */
    chat.hidden = false; /* chat 보임 */
    msg.hidden = false; /* msg 보임 */

    const input = room.querySelector("input"); /* input 접근 */

    socket.emit("room", input.value); /* room 이벤트 실행, 입력값 전달 */

    msg.addEventListener("submit", handleMsgSubmit); /* 메시지 입력 감지 */
}

/* 닉네임 입력 시 */
function handleNameSubmit(e) {
    e.preventDefault(); /* 새로고침 막기 */

    nickname.hidden = true; /* nickname 숨김 */
    room.hidden = false; /* room 보임 */

    const input = nickname.querySelector("input"); /* input 접근 */

    socket.emit("nickname", input.value); /* nickname 이벤트 실행, 입력값 전달 */

    room.addEventListener("submit", handleRoomSubmit); /* 방 입력 감지 */
}

/* 챗 추가 */
function addMsg(msg) {
    const li = document.createElement("li"); /* li 생성 */
    li.innerText = msg; /* li 내용을 msg로 초기화 */
    chat.appendChild(li); /* chat에 li 추가 */
}

nickname.addEventListener("submit", handleNameSubmit); /* 닉네임 입력 감지 */

socket.on("msg", addMsg); /* msg 이벤트 감지, addMsg 실행 */
