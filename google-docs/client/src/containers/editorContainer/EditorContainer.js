import React, { useEffect, useRef, useState } from "react";
// 라우팅으로 생성된 uuid 값을 가져옴
import { useParams } from "react-router-dom";
import { debounce } from "lodash-es";
import TextEditor from "../../components/textEditor/TextEditor";
import { socket } from "../../socket";

// 다양한 사용자의 실시간 커서 위치 반영하기 위해
const cursorMap = new Map();
const cursorColor = [
  "#FF0000",
  "#FF5E00",
  "#FFBB00",
  "#FFE400",
  "#ABF200",
  "#1DDB16",
  "#00D8FF",
  "#0054FF",
];

export default function EditorContainer() {
  const timeRef = useRef(null);
  const cursorRef = useRef(null);
  const reactQuillRef = useRef(null);
  // 3
  const { id: documentId } = useParams();
  const [text, setText] = useState("");

  // 4
  useEffect(() => {
    socket.emit("join", documentId);
    return () => {
      socket.disconnect();
    };
  }, []);

  // socket.io의 once(): 소켓 연결이후 무조건 한 번만 실행되는 함수
  useEffect(() => {
    // 현재 접속중인 사용자 리스트 정보 가져옴
    socket.once("initDocument", (res) => {
      const { _document, userList } = res;
      setText(_document);
      userList.forEach((u) => {
        setCursor(u);
      });
    });
  }, []);

  // 새로운 사용자 접속
  useEffect(() => {
    const setCursorHandler = (user) => {
      setCursor(user);
    };
    socket.on("newUser", setCursorHandler);
    return () => {
      socket.off("newUser", setCursorHandler);
    };
  }, []);

  // quill-cursors 모듈 설정
  useEffect(() => {
    if (!reactQuillRef.current) return;
    // ReactQuill에서 getEditor() 데이터 정보 가져옴
    cursorRef.current = reactQuillRef.current.getEditor().getModule("cursors");
  }, []);

  // 다른 사용자가 텍스트 작성
  // delta: quill에서 제공하는 객체 updateContents 함수를 통해 에디터 내용 수정
  useEffect(() => {
    const updateContentHandler = (delta) => {
      reactQuillRef.current.getEditor().updateContents(delta);
    };
    socket.on("receive-changes", updateContentHandler);
    return () => {
      socket.off("receive-changes", updateContentHandler);
    };
  }, []);

  // 다른 사용자가 마우스로 커서 움직이게 되면 움직인 index 번호를 받는 함수
  useEffect(() => {
    const updateHandler = (res) => {
      const { range, id } = res;
      debounceUpdate(range, id);
    };
    socket.on("receive-cursor", updateHandler);
    return () => {
      socket.off("receive-cursor", updateHandler);
    };
  }, []);

  // 문서에 글을 작성하면 호출되는 함수
  const onChangeTextHandler = (content, delta, source, editor) => {
    if (timeRef.current != null) {
      clearTimeout(timeRef.current);
    }
    timeRef.current = setTimeout(() => {
      // 수정된 정보 서버로 전송
      // 매번 실행되면 비효율, 따라서 timer 객체 생성, 마지막 순간ㄴ에 한 번만 실행되도록
      socket.emit(
        "save-document",
        reactQuillRef.current.getEditor().getContents()
      );
      timeRef.current = null;
    }, 1000);
    if (source !== "user") return;
    socket.emit("send-changes", delta);
  };

  // 커서 생성, cursorMap 객체에 저장
  // createCursor: quill-cursors에서 제공되는 함수, 색상과 id 정의
  const setCursor = (id) => {
    if (!cursorMap.get(id)) {
      cursorRef.current.createCursor(
        id,
        id,
        cursorColor[Math.floor(Math.random() * 8)]
      );
      cursorMap.set(id, cursorRef.current);
    }
  };

  // 커서 객체의 위치 실시간 이동
  // debounce: 다수의 이벤트를 모았다 한번에 처리 ex) 브라우저 리사이즈
  // throttle: 일정한 주기를 기준으로 무조건 한번씩 ex) 스크롤링 이벤트
  const debounceUpdate = debounce((range, id) => {
    cursorMap.get(id).moveCursor(id, range);
  }, 500);

  // 13
  const onChangeSelection = (selection, source, editor) => {
    if (source !== "user") return;
    socket.emit("cursor-changes", selection);
  };

  return (
    <TextEditor
      text={text}
      onChangeTextHandler={onChangeTextHandler}
      onChangeSelection={onChangeSelection}
      reactQuillRef={reactQuillRef}
    />
  );
}
