import { Navbar, RequireAuth } from "components";
import { Bookmark, Explore, Home, Login, Profile, Signup } from "features";
import { getAllPosts } from "features/post/postSlice";
import { getAllUsers, getBookmarks } from "features/profile/userSlice";
import MockmanEs from "mockman-js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getBookmarks())
  },[dispatch])

  useEffect(()=>{
    dispatch(getAllUsers())
    dispatch(getAllPosts())
  },[dispatch])
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
          <Route path="/bookmarks" element={<Bookmark />} />
          <Route path="/profile/:currUsername" element={<Profile />} />
        </Route>
        <Route path="/mock" element={<MockmanEs />} />
      </Routes>
    </div>
  );
}

export default App;
