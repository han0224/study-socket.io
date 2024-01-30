import { io } from "socket.io-client";

// autoConnect: false => 사용자가 영화를 선택하는 화면에서 연결되도록 설정
export const socket = io("http://localhost:5000", {
  autoConnect: false,
});
