import { Navbar, RequireAuth } from "components";
import { Explore, Home, Login, Signup } from "features";
import { getAllPosts } from "features/post/postSlice";
import { getAllUsers } from "features/profile/userSlice";
import MockmanEs from "mockman-js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAllUsers())
    dispatch(getAllPosts())
  },[])
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
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
        </Route>
        <Route path="/mock" element={<MockmanEs />} />
      </Routes>
    </div>
  );
}

export default App;
