import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { database } from "../Firebase";

const ResetForm = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {  
    e.preventDefault();

    try {
    const data =   await  sendPasswordResetEmail(database,email);
    console.log("data ",data)
    } catch (error) {
      console.log("error ", error);
    }
  };

  return (
    <div className="resetform">
      <h1>Reset Password</h1>
      <form onSubmit={handleReset}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          value={email}
          placeholder="Enter Your Email"
        />
        <br />
        <br />
        <button onClick={handleReset}>Reset</button>
      </form>
    </div>
  );
};

export default ResetForm;
