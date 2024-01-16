// module.export 문법을 이용해 node.js 환경에서 모듈화 작업을 할 수 있음
// 이렇게 모듈화된 js 파일들은 require 문법을 이용해 어디서든 쉽게 사용할 수 있음
module.exports.posts = [
  {
    id: 1,
    // userName 항목은 공백.
    // 나중에 클라이언트 사이드에서 전송된 사용자 이름이 들어가야 함
    userName: "",
    location: "Republic of Korea",
    userImg:
      "https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_1280.jpg",
    postImg:
      "https://cdn.pixabay.com/photo/2023/02/04/09/20/castle-7766794_1280.jpg",
  },
  {
    id: 2,
    userName: "",
    location: "USA",
    userImg:
      "https://cdn.pixabay.com/photo/2018/02/21/08/40/woman-3169726_1280.jpg",
    postImg:
      "https://cdn.pixabay.com/photo/2023/01/21/13/39/night-sky-7733876_1280.jpg",
  },
  {
    id: 3,
    userName: "",
    location: "Japan",
    userImg:
      "https://cdn.pixabay.com/photo/2017/12/31/15/56/portrait-3052641_1280.jpg",
    postImg:
      "https://cdn.pixabay.com/photo/2022/09/07/17/26/vintage-pocket-watch-7439233_1280.jpg",
  },
  {
    id: 4,
    userName: "",
    location: "Italy",
    userImg:
      "https://cdn.pixabay.com/photo/2016/11/20/18/18/girl-1843477_1280.jpg",
    postImg:
      "https://cdn.pixabay.com/photo/2022/03/11/10/55/couple-7061929_1280.jpg",
  },
  {
    id: 5,
    userName: "",
    location: "Canada",
    userImg:
      "https://cdn.pixabay.com/photo/2017/04/01/21/06/portrait-2194457_1280.jpg",
    postImg:
      "https://cdn.pixabay.com/photo/2022/11/16/16/56/city-7596379_1280.jpg",
  },
];
