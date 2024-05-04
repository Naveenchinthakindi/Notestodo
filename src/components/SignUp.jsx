import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { database } from "../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { set, ref } from "firebase/database";

function SignIn() {
  const [user, setUser] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user?.password === user?.confirmpass) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          database,
          user?.email,
          user?.password
        );

        if (userCredential && userCredential.user) {
          await set(ref(database, `users/${userCredential.user.uid}`), {
            email: user?.email,
            password: user?.password,
          });

          navigate("/notes");
        }
      } catch (error) {
        alert(error.code);
        console.log("user Sign Up Error ", error, error.code);
      }
    } else {
      alert("password donot match");
    }
  };

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <h1>Register</h1>
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
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          style={{ paddingRight: "2.5rem" }}
        />
        <div
          className="eye-icon"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword && <i class="bi bi-eye-fill"></i>}
          {!showPassword && <i class="bi bi-eye-slash-fill"></i>}
        </div>

        <Form.Control
          name="confirmpass"
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          style={{ paddingRight: "2.5rem" }}
        />
        <div
          className="eye-icon"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword && <i class="bi bi-eye-fill"></i>}
          {!showPassword && <i class="bi bi-eye-slash-fill"></i>}
        </div>
      </Form.Group>
      <Button className="m-2" variant="primary" type="submit">
        Register
      </Button>
      <Button
        className="m-2"
        variant="primary"
        onClick={() => navigate("/signin")}
      >
        Sign IN
      </Button>
    </Form>
  );
}

export default SignIn;
