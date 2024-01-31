import { css } from "@emotion/react";

export default function UserList({ userList }) {
  const style = css`
    display: flex;
    gap: 0.2rem;
  `;

  const userIcon = (props) => css`
    background: ${props.color};
    border: 1px solid #959595;
    width: 30px;
    height: 30px;
    border-radius: 100%;
  `;
  console.log(userList);
  return (
    <div css={style}>
      <div css={userIcon({ color: "red" })}></div>
      {userList.map((user) => (
        <div key={user.id} css={userIcon({ color: user.color })}></div>
      ))}
    </div>
  );
}
