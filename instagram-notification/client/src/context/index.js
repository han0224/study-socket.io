// createContext: 리액트의 전역변수를 설정하기 위한 context 객체를 생성하는 함수
// useReducer: 지금까지 useState를 이용해서 상태를 관리했습니다.
// useReducer를 이용하면 더 복잡한 상태 관리를 할 수 있다.
// 무엇보다 상태 관리라는 로직과 기존의 비즈니스 로직을 분리할 수 있다는 장점 존재
import { createContext, useReducer } from "react";
import { AUTH_INFO } from "./action";

// 관리할 초기 객체 변수를 설정
// 사용자 이름을 저장하기 위한 userName 작성
const initialState = {
  userName: "",
};

// createContext를 이용해서 전역으로 관리된 context를 생성
const Context = createContext({});

// useReducer 의 핵심 기능인 상태를 관리하는 부분
// switch 문을 이용해서 들어온 상태의 키워드 값을 구분하고 실행
// action 객체에는 payload, type 존재
// payload: 상태를 업데이트하는 최신 변수
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_INFO:
      return {
        ...state,
        userName: action.payload,
      };
    default:
      return state;
  }
};

// Context API 를 사용하는 모든 컴포넌트에게 변화를 알리는 역할
const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, StoreProvider };
