import "./App.css";
import { BrowserRouter } from "react-router-dom";
import MainPage from "./Component/MainPage";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>
  );
}

export default App;
