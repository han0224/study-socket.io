const { Server } = require("socket.io");
const { seats } = require("./data");

// 1
const io = new Server("5000", {
  cors: {
    origin: "http://localhost:3000",
  },
});

const avatar = seats.map((v) => [...v]);
const antman = seats.map((v) => [...v]);
const cats = seats.map((v) => [...v]);

const MOVIE_NAME = {
  1: avatar,
  2: antman,
  3: cats,
};
const SEAT_STATUS = {
  CONFIRM: 3,
  CANCEL: 1,
};
/**
 * seats: 현재 선택된 영화 좌석들
 * seat: 상태를 변경할 좌석
 * status: 취소(1) 또는 확정(3)
 */
const updateSeat = (seats, seat, status) => {
  for (let i = 0; i < seats.length; i++) {
    const index = seats[i].findIndex((v) => v.seatNumber === seat);
    if (index < 0) continue;
    seats[i][index] = { ...seats[i][index], status };
    return seats;
  }
  return null;
};

const setSeats = (roomNumber, seat, status) => {
  const temp = updateSeat(MOVIE_NAME[roomNumber], seat, status);
  if (!temp) new Error("err");

  return temp;
};

io.on("connection", (socket) => {
  socket.on("join", (movie) => {
    socket.join(movie);

    const tempSeat = MOVIE_NAME[movie];
    io.sockets.in(movie).emit("sSeatMessage", tempSeat);
  });

  socket.on("addSeat", (seat) => {
    const myRooms = Array.from(socket.rooms);
    io.sockets
      .in(myRooms[1])
      .emit("sSeatMessage", setSeats(myRooms[1], seat, SEAT_STATUS.CONFIRM));
  });

  socket.on("cancelSeat", (seat) => {
    const myRooms = Array.from(socket.rooms);
    io.sockets
      .in(myRooms[1])
      .emit("sSeatMessage", setSeats(myRooms[1], seat, SEAT_STATUS.CANCEL));
  });
  socket.on("disconnection", () => {
    console.log("logout");
  });
});
