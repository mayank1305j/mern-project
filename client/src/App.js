import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppBar from "./components/AppBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Error from "./pages/Error";
import CheckAuth from "./utils/CheckAuth";
import Guest from "./utils/Guest";

function App() {
  return (
    <div>
      <Router>
        <AppBar />
        <Routes>
          <Route
            path="/"
            element={
              <CheckAuth>
                <Home />
              </CheckAuth>
            }
          />
          <Route
            path="/login"
            element={
              <Guest>
                <Login />
              </Guest>
            }
          />
          <Route
            path="/register"
            element={
              <Guest>
                <Register />
              </Guest>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
