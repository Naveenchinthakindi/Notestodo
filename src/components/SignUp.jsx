import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { database } from "../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {set,ref} from 'firebase/database'

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
      const userCredential = await createUserWithEmailAndPassword(
        database,
        user?.email,
        user?.password
      );

      if (userCredential && userCredential.user) {

        await set(ref(database, `users/${userCredential.user.uid}`), {
          email: user?.email,
          password:user?.password
          // Add more user data as needed
        });

        console.log("user uid ",userCredential?.user?.uid)
        console.log("userCred ", userCredential);
        navigate("/notes");
      }
    } catch (error) {
      alert(error.code)
      console.log("user Sign Up Error ", error, error.code);
    }
    console.log("submit");
    console.log("users ", user);

    console.log(user?.email);
    console.log(user?.password);
  };

  return (
    <Form className="w-50 m-auto" onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
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
        Sign Up
      </Button>
    </Form>
  );
}

export default SignIn;
