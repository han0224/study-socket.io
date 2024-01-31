import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { EditorContainer, HomeContainer } from "./containers";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route
          path="/documents"
          element={<Navigate replace to={`/documents/${uuidV4()}`} />}
        />
        <Route path="/documents/:id" element={<EditorContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
