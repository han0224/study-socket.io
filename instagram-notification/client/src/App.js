import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginContainer, PostingContainer } from "./containers";
import { StoreProvider } from "./context";
function App() {
  return (
    // StoreProvider 로 최상위 컴포넌트를 감싸면서 어디서든 전역 변수에 접근할 수 있도록 함
    <StoreProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginContainer />} />
          <Route path="/post" element={<PostingContainer />} />
        </Routes>
      </Router>
    </StoreProvider>
  );
}

export default App;
