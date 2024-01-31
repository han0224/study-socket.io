require("dotenv").config();
const mongoose = require("mongoose");
const Document = require("./Schema");

const uri = process.env.MONGODB_URI;
const defaultValue = "";
mongoose.set("strictQuery", false);
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const userMap = new Map();

io.on("connection", (socket) => {
  let _documentId = "";
  socket.on("join", async (documentId) => {
    _documentId = documentId;
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("initDocument", {
      _document: document.data,
      userList: userMap.get(documentId) || [],
    });

    const myId = Array.from(socket.rooms)[0];
    setUserMap(_documentId, myId);
    socket.broadcast.to(_documentId).emit("newUser", myId);
  });

  socket.on("save-document", async (data) => {
    await Document.findByIdAndUpdate(_documentId, { data });
  });

  socket.on("send-changes", (delta) => {
    socket.broadcast.to(_documentId).emit("receive-changes", delta);
  });

  socket.on("cursor-changes", (range) => {
    const myRooms = Array.from(socket.rooms);
    socket.broadcast
      .to(_documentId)
      .emit("receive-cursor", { range, id: myRooms[0] });
  });

  socket.on("disconnect", () => {
    console.log("logout", socket.id, _documentId);
    deleteUser(_documentId, socket.id);

    socket.broadcast
      .to(_documentId)
      .emit("delete-user", {
        userList: userMap.get(_documentId),
        id: socket.id,
      });
  });
});

const setUserMap = (documentId, myId) => {
  const tempUserList = userMap.get(documentId);
  if (!tempUserList) {
    userMap.set(documentId, [myId]);
  } else {
    userMap.set(documentId, [...tempUserList, myId]);
  }
};

const deleteUser = (documentId, myId) => {
  const tempUserList = userMap.get(documentId);

  if (!tempUserList) return;
  userMap.set(
    documentId,
    tempUserList.filter((user) => user !== myId)
  );

  userMap.get(documentId).length || userMap.delete(documentId);
};

const findOrCreateDocument = async (id) => {
  if (id === null) return;

  const document = await Document.findById(id);
  if (document) return document;

  return await Document.create({ _id: id, data: defaultValue });
};
