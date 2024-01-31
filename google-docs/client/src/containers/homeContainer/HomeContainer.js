import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components";
import useInput from "../../hooks/useInput";
import { css } from "@emotion/react";

const inputStyle = css`
  width: 500px;
  height: 32px;
  font-size: 15px;
  border: 0;
  border-radius: 6px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);
`;

const googleDocsStyle = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  & h1 {
    margin: 0;
    padding: 0;
    margin-bottom: 2.7rem;
    font-size: 3rem;
    font-weight: 900;
  }

  & a {
    text-decoration: none;
    color: black;
    transition: color ease-in-out 0.23s;
    font-size: 1.6rem;
    font-weight: 700;
    :hover {
      color: #0b69b1;
    }
    :after {
      position: absolute;
      display: block;
      content: "";
      height: 80%;
      width: 100%;
      top: 0.2rem;
      /* background: #ffff00a1; */
      background-image: linear-gradient(transparent 60%, #b1a00b9f 40%);
      /* border-bottom: 2px solid #0b69b1; */
      transform: scaleX(0);
      transition: transform 0.25s ease-in-out;
      transform-origin: 0% 50%;
    }
    :hover:after {
      transform: scaleX(1);
    }
  }
`;

export default function HomeContainer() {
  const [inputText, onChange] = useInput();
  const navigate = useNavigate();

  const onClick = () => {
    if (!inputText) {
      alert("Please enter document id");
      return;
    }
    navigate(`/documents/${inputText}`);
  };

  return (
    <div css={googleDocsStyle}>
      <h1>Google Docs</h1>
      <div css={{ position: "relative" }}>
        <Link to={"/documents"}>new Document</Link>
      </div>
      <div css={{ display: "flex", gap: "0.3rem" }}>
        <input
          css={inputStyle}
          type="text"
          placeholder="document id"
          onChange={onChange}
        />
        <Button onClick={onClick}>join Document</Button>
      </div>
    </div>
  );
}
