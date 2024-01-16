import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { socket } from "../../socket";
import styles from "./Navbar.module.css";

export default function Navbar() {
  // 좋아요를 받은 개수를 저장
  // 저장된 값에 따라 몇 개를 노출할지 화면에 표시
  const [notifications, setNotifications] = useState([]);

  // useEffect를 이용해 소켓 통신을 대기
  // getNotification 이벤트: 좋아요를 받을 때 서버에서 전송한 데이터를 받을 수 있는 콜백 함수
  useEffect(() => {
    const getNoti = (data) => {
      const { type } = data;
      const temp =
        type === "0" ? [...notifications, data] : notifications.pop();
      setNotifications(temp || []);
    };
    socket.on("getNotification", getNoti);
    return () => {
      socket.off("getNotification", getNoti);
    };
  }, []);

  return (
    <div className={styles.navbar}>
      <span className={styles.logo}>Instagram</span>
      <div className={styles.icons}>
        <div className={styles.heartContainer}>
          {notifications.length > 0 && <span className={styles.noti}></span>}
          <AiOutlineHeart size="20" className={styles.heart} />
          {notifications.length > 0 && (
            <div className={styles.likeBubble}>
              <AiFillHeart size="15" color="#fff" />{" "}
              <div className={styles.count}>{notifications.length}</div>
            </div>
          )}
        </div>

        <HiOutlinePaperAirplane className={styles.airplane} size="20" />
      </div>
    </div>
  );
}
