// 1
const { Server } = require("socket.io");
const { posts } = require("./data");

// 2
const io = new Server("5000", {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

// 새로운 사용자가 접속하면 users 배열에 저장하는 함수
// 기존 사용자가 있다면 저장 안함
// Math.random()함수를 이용해 기존에 만들어두었던 목 데이터 중 하나를 선택(목데이터는 총 5개 존재)
const addNewUser = (userName, socketId) => {
  !users.some((user) => user.userName === userName) &&
    users.unshift({
      ...posts[Math.floor(Math.random() * 5)],
      userName,
      socketId,
    });
};

// users 배열에서 일치하는 사용자 이름을 검색해서 반환
const getUser = (userName) => {
  return users.find((user) => user.userName === userName);
};

io.use((socket, next) => {
  const userName = socket.handshake.auth.userName;
  if (!userName) {
    console.log("err");
    return next(new Error("invalid userName"));
  }
  socket.userName = userName;
  next();
});

io.on("connection", (socket) => {
  // 7
  addNewUser(socket.userName, socket.id);
  console.log(users);
  socket.on("userList", () => {
    io.sockets.emit("user-list", users);
  });

  // 8
  socket.on("sendNotification", ({ senderName, receiverName, type }) => {
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getNotification", {
      senderName,
      type,
    });
  });

  socket.on("disconnection", () => {
    console.log("logout");
  });
});
