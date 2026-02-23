import "./App.css";
import "./css/styles.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

const raw = localStorage.getItem('user');
export const CURRENT_USER = (raw && raw !== "undefined") 
  ? JSON.parse(raw) 
  : { id: 1, firstName: 'John', lastName: 'Doe' };

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;