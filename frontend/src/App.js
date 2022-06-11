import { Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "./redux/modules/postSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts);
  });
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/posts/:id" element={<Detail />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
