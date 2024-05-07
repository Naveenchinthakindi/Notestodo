import Notes from "./components/Notes";
import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResetForm from "./components/ResetForm";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/reset" element={<ResetForm/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
