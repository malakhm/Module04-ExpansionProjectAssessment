import { BrowserRouter } from "react-router-dom";
import Header from "./components/navbar";
import AppRoutes from "./routes/routes";
const App =() =>{
  return (
    <div className="App">
      <BrowserRouter>
    <AppRoutes/>

      </BrowserRouter>
    </div>
  );
}

export default App;
