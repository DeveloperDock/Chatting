import http from 'http';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import express from 'express';

const app = express();

app.set('view engine', 'pug'); /* view engine 언어를 pug로 설정 */
app.set('views', __dirname + '/views'); /* views 경로를 views 파일 경로로 설정 */
app.use('/public', express.static(__dirname + '/public')); /* pug에서 /public으로 경로가 시작될 경우 public 폴더와 연결 */
app.get('/', (_, res) => res.render('home')); /* url이 없을 때 views파일 내 home파일을 렌더링 */
app.get('/*', (_, res) => res.redirect('/')); /* url이 수정되어도 home으로 돌아오게 설정 */

const https = http.createServer(app); /* express를 이용한 http 서버 */

/* http 서버에 socket.io 서버 설치, admin-ui 사용 설정 */
const wss = new Server(https, {
    cors: {
        origin: ['https://admin.socket.io'],
        credentials: true,
    },
});

/* admin-ui 유저 이름과 비밀번호 생략 */
instrument(wss, {
    auth: false,
});

let roomName; /* 방 이름 */

/* 서버 접속 */
wss.on('connection', (socket) => {
    socket.on('nickname', (nickname) => (socket['nickname'] = nickname)); /* nickname 이벤트 감지, 사용자 정보에 닉네임 추가 */

    /* room 이벤트 감지, room에 접속, 방 이름을 room으로 초기화 */
    socket.on('room', (room) => {
        socket.join(room);
        roomName = room;
    });

    socket.on('msg', (msg) => wss.to(roomName).emit('msg', `${socket['nickname']}: ${msg}`)); /* msg 이벤트 감지, 현재 방 내 모든 사용자에게 msg 이벤트 실행, 메시지 전달 */
});

https.listen(3000, console.log(`Listening on http://localhost:3000`));
