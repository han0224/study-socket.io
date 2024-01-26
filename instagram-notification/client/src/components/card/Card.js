import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { BiMessageRounded } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";

import { socket } from "../../socket";
import styles from "./Card.module.css";

// id: 리스트 구분
// post: post 객체
// loginUser: 로그인한 사용자 이름
export default function Card({ id, post, loginUser }) {
  // 좋아요상태
  const [liked, setLiked] = useState(false);
  // 좋아요 버튼 클릭 시
  // 눌렀으면 sendNotification 소켓 이벤트 실행
  // 누른 사람과 좋아요를 받은 사람 정보 전송
  const onLikeHandler = (e) => {
    const { type } = e.target.closest("svg").dataset;
    console.log("like handler - ", type === "0");
    setLiked(type === "0");
    socket.emit("sendNotification", {
      senderName: loginUser,
      receiverName: post.userName,
      type: type === "0",
    });
  };

  return (
    <div className={styles.card} key={id}>
      <div className={styles.info}>
        <div className={styles.userInfo}>
          <img src={post.userImg} alt="" className={styles.userImg} />
          <div className={styles.username}>
            <div>{post.userName}</div>
            <div className={styles.loc}>{post.location}</div>
          </div>
        </div>
        <FiMoreVertical size="20" />
      </div>
      <img src={post.postImg} alt="" className={styles.postImg} />
      <div className={styles.icons}>
        {
          // 5
          liked ? (
            <AiFillHeart
              className={styles.fillHeart}
              size="20"
              onClick={onLikeHandler}
              data-type="1"
            />
          ) : (
            <AiOutlineHeart
              className={styles.heart}
              size="20"
              onClick={onLikeHandler}
              data-type="0"
            />
          )
        }
        <BiMessageRounded className={styles.msg} size="20" />
        <HiOutlinePaperAirplane className={styles.airplane} size="20" />
      </div>
    </div>
  );
}
