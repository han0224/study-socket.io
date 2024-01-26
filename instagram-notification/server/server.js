// 1
const { Server } = require("socket.io");
const { posts } = require("./data");

// 지금 유저는 게시글을 한개밖에 등록할 수 없음 -> 유저가 생성되면 알아서 게시글이 생성
// 그럼 그 좋아요가 눌린 갯수는 어딘가에 저장이되야 하는데 유저정보 + 소켓Id +

// 2
const io = new Server("5000", {
  cors: {
    origin: "http://localhost:3000",
  },
});

// 유저는 한번이상 등록한 유저
const users = [];
// currentUsers: 현재 접속중인 user
// 그럼 users안에 socketId는 바뀔수 있음
// 애초에 필요한가? 저장할 필요없을거같은데
// 닉네임이 겹치면 안되는 거니깐 userName이 곧 id역할을 하고 한번 등록하면 바뀌지 않는 값이니깐,
const currentUsers = [];
// 새로운 사용자가 접속하면 users 배열에 저장하는 함수
// 기존 사용자가 있다면 저장 안함
// Math.random()함수를 이용해 기존에 만들어두었던 목 데이터 중 하나를 선택(목데이터는 총 5개 존재)
const addNewUser = (userName, socketId) => {
  !users.some((user) => user.userName === userName) &&
    users.push({
      ...posts[Math.floor(Math.random() * 5)],
      userName,
      like: 0,
    });
};

const addCurrentUser = (userName, socketId) => {
  currentUsers.push({ userName, socketId });
};

const isIncludesCurrentUser = (userName) => {
  currentUsers.some((user) => user.userName === userName);
};

const getCurrentUser = (userName) => {
  return currentUsers.find((user) => user.userName === userName);
};

// users 배열에서 일치하는 사용자 이름을 검색해서 반환
const getUser = (userName) => {
  return users.find((user) => user.userName === userName);
};
io.use((socket, next) => {
  const userName = socket.handshake.auth.userName;
  if (!userName) {
    console.log("err - invalid userName");
    return next(new Error("invalid userName"));
  }
  if (isIncludesCurrentUser(userName)) {
    console.log("err - existing userName");
    return next(new Error("existing userName"));
  }
  socket.userName = userName;
  next();
});

io.on("connection", (socket) => {
  // 7
  io.sockets.emit("connect-success", true);

  addNewUser(socket.userName, socket.id);
  addCurrentUser(socket.userName, socket.id);

  socket.on("userList", () => {
    io.sockets.emit("user-list", users);
  });

  // 8
  socket.on("sendNotification", ({ senderName, receiverName, type }) => {
    const receiver = getUser(receiverName);
    if (type) {
      receiver.like += 1;
    } else {
      receiver.like -= 1;
    }
    const receiverUser = getCurrentUser(receiverName);
    console.log(receiver, receiverUser);
    if (!receiverUser) return;
    io.to(receiverUser.socketId).emit("getNotification", {
      senderName,
      type,
      like: receiver.like,
    });
  });

  socket.on("disconnect", () => {
    const index = currentUsers.indexOf(socket.userName);
    currentUsers.splice(index, 1);

    console.log("logout");
    console.log(currentUsers);
  });
});
