import { Navbar, RequireAuth } from "components";
import { Login, Signup } from "features";
import MockmanEs from "mockman-js";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ToastContainer 
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick />

      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<>Home</>} />
        </Route>
        <Route path="/mock" element={<MockmanEs />} />
      </Routes>
    </div>
  );
}

export default App;
