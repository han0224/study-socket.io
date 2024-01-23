import { useEffect, useState, useContext } from "react";
import styles from "./LoginContainer.module.css";
import { socket } from "../../socket";
import { Context } from "../../context";
import { AUTH_INFO } from "../../context/action";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";

export default function LoginContainer() {
  // 페이지 라우팅을 위해 설정
  const navigate = useNavigate();
  // dispatch를 이용해 전역 변수 관리
  const { dispatch } = useContext(Context);
  const [user, setUser] = useState("");

  // 소켓 서버에서 사용자 이름 유효성 검사를 확인 후 오류가 없다면 콜백 호출
  useEffect(() => {
    socket.on("connect_error", (err) => {
      if (err.message === "invalid userName") {
        console.log("err", err);
      }
    });
  }, []);

  // 로그인 성공시 connect-success event 받음
  // 해당 이벤트를 받아야지만 post 페이지로 이동
  useEffect(() => {
    const goPage = () => {
      navigate("/post");
    };
    socket.on("connect-success", goPage);
    return () => {
      socket.off("connect-success", goPage);
    };
  }, []);

  const setUserNameHandler = (e) => {
    setUser(e.target.value);
  };

  // 로그인 버튼을 클릭하면 호출
  // Context API 사용
  // dispatch 함수에 미리 선언한 AUTH_INFO 타입 추가
  // payload에 실제 업데이트할 값을 추가
  // 서버 사이드에서 먼저 살펴봤던 handshake 속성의 auth 부분을 추가
  // socket.auth 라는 객체에 userName 설정
  const onLoginHandler = (e) => {
    console.log("on login handler");
    e.preventDefault();
    dispatch({
      type: AUTH_INFO,
      payload: user,
    });
    socket.auth = { userName: user };
    const a = socket.connect();
    console.log(a);
    // navigate("/post");
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login}>
        <img src={logo} width="200px" alt="logo" />
        <form className={styles.loginForm} onSubmit={onLoginHandler}>
          <input
            className={styles.input}
            type="text"
            value={user}
            placeholder="Enter your name"
            onChange={setUserNameHandler}
          />
          <button onClick={onLoginHandler} className={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
