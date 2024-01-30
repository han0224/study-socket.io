// HomeContainer: 사용자가 우리 사이트를 방문하면 처음으로 노출되는 화면
// 현재 상영작인 3개의 영화를 노출

import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./HomeContainer.module.css";
import avatar from "../../images/avatar.png";
import antman from "../../images/antman.png";
import cat from "../../images/cat.png";
import { socket } from "../../socket";
import { Link } from "react-router-dom";

// classnames라는 라이브러리 이용해 스타일 연결
// 이후에는 cx() 형태로 정의된 스타일을 사용할 수 있음
// cx('home_container')문법을 사용하면 조건문을 이용한 스타일도 가능
const cx = classNames.bind(styles);

export default function HomeContainer() {
  useEffect(() => {
    socket.connect();
  }, []);
  return (
    <div className={cx("home_container")}>
      <h2 className={cx("title")}>Movie Chart</h2>
      <ul className={cx("wrap_movies")}>
        <li className={cx("movie")}>
          <Link
            to={`/seat/1/Avatar: The Way of Water`}
            style={{ textDecoration: "none" }}
          >
            <div className={cx("img_wrap")}>
              <img
                src={avatar}
                width="250px"
                height="300px"
                className={cx("img")}
                alt="aa"
              />
              <h3 className={cx("number")}>1</h3>
            </div>
            <div className={cx("movie_title")}>Avatar: The Way of Water</div>
          </Link>
        </li>
        <li className={cx("movie")}>
          <Link
            to={`/seat/2/Ant-Man and the Wasp:Quantumania`}
            style={{ textDecoration: "none" }}
          >
            <div className={cx("img_wrap")}>
              <img
                src={antman}
                width="250px"
                height="300px"
                className={cx("img")}
                alt="aa"
              />
              <h3 className={cx("number")}>2</h3>
            </div>
            <div className={cx("movie_title")}>
              Ant-Man and the Wasp:
              <br /> Quantumania
            </div>
          </Link>
        </li>
        <li className={cx("movie")}>
          <Link
            to={`/seat/3/Puss in Boots: The Last Wish`}
            style={{ textDecoration: "none" }}
          >
            <div className={cx("img_wrap")}>
              <img
                src={cat}
                width="250px"
                height="300px"
                className={cx("img")}
                alt="aa"
              />
              <h3 className={cx("number")}>3</h3>
            </div>
            <div className={cx("movie_title")}>
              Puss in Boots: The Last Wish
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}
