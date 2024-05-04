import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { database } from "../Firebase";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        database,
        user?.email,
        user?.password
      )
      if (userCredential && userCredential.user) {
        console.log("userCred ", userCredential);
        localStorage.setItem("userID",JSON.stringify(userCredential?.user?.uid))
      
        navigate("/notes");
      }

    } catch (error) {
      console.log("user Sign in Error ", error);
    }
    console.log("submit");
    console.log("users ", user);

    console.log(user?.email);
    console.log(user?.password);
  };

  return (
    <Form className="w-50 m-auto" onSubmit={handleSubmit}>
      <h1>Sign IN</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          onChange={handleChange}
          type="text"
          placeholder="Password"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
      Sign In 
      </Button>
      <Button variant="primary" onClick = {()=>navigate("/signup")}>Sign Up</Button>
    </Form>
  );
}

export default SignIn;
