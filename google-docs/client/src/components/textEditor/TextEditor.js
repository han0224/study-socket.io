// 1
import { css } from "@emotion/react";
import QuillCursors from "quill-cursors";
import { container } from "./TextEditor.style.js";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

// Quill 라이브러리에서는 객체 구조를 이용해서 에디터의 다양한 도구를 구현하고 사용할 수 있음
// modules 라는 객체 안에 toolbar 배열을 확인하면 우리가 흔히 볼 수 있는 에디터의 편집 도구를 확인할 수 있음
const modules = {
  cursors: true,
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
  ],
};

// Quill 라이브러리에는 다양한 모듈을 추가할 수 있음
Quill.register("modules/cursors", QuillCursors);

// toolbar 라는 재사용 가능한 컴포넌트를 정의
// text editor 는 속성으로 작성된 글 정보와 이벤트 함수를 받음
// 마지막으로 quill 정보를 부모 컴포넌트에서 참조하기 위해 리액트의 ref 속성 이용
export default function TextEditor({
  text,
  onChangeTextHandler,
  reactQuillRef,
  onChangeSelection,
}) {
  return (
    <div css={container}>
      <ReactQuill
        theme="snow"
        modules={modules}
        value={text}
        onChange={onChangeTextHandler}
        onChangeSelection={onChangeSelection}
        ref={(el) => {
          reactQuillRef.current = el;
        }}
      />
    </div>
  );
}
