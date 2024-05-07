import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { database } from "../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { set, ref } from "firebase/database";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignIn() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmpass: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validateErrors, setValidateErrors] = useState({
    email: false,
    password: false,
    confirmpass: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
    setValidateErrors({ ...validateErrors, [name]: value.trim().lenght === 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, confirmpass } = user;

    if (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      confirmpass.trim().length === 0
    ) {
      setValidateErrors({
        email: user?.email?.trim().length === 0,
        password: user?.password?.trim().length === 0,
        confirmpass: user?.confirmpass?.trim().length === 0,
      });
      return;
    }

    if (user?.password === user?.confirmpass) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          database,
          user?.email,
          user?.password
        );

        console.log("user creditionals ", userCredential);

        if (userCredential && userCredential?.user) {
          console.log("inside ", userCredential.user);
          const res = await set(
            ref(database, `users/${userCredential?.user?.uid}`),
            {
              email: user?.email,
              password: user?.password,
            }
          );

          console.log("res ", res);

          navigate("/");
        }
      } catch (error) {
        // alert(error.code);
        navigate("/");
        toast.error("Sign Up Erro ".error?.code);
        console.log("user Sign Up Error ", error);
      }
    } else {
      alert("password donot match");
    }
  };

  console.log("user ", user);

  console.log("validation error ", validateErrors);

  return (
    <div className="signinhome">
      <div className="signnimg">
        <img src="images/notesregister.jpg" />
      </div>
      <div>
        <Form className="form" onSubmit={handleSubmit}>
          <h1>Notes</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              onChange={handleChange}
              type="email"
              placeholder="Enter email"
              isInvalid={validateErrors?.email}
            />
            <Form.Control.Feedback type="invalid">
              Enter a valid email
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              style={{ paddingRight: "2.5rem" }}
              className="mb-2 mt-2"
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
              isInvalid={
                validateErrors?.password && validateErrors?.confirmpass
              }
            />
            <div
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword && <i class="bi bi-eye-fill"></i>}
              {!showPassword && <i class="bi bi-eye-slash-fill"></i>}
            </div>

            <Form.Control.Feedback className="mt-4" type="invalid">
              Enter the Password
            </Form.Control.Feedback>
          </Form.Group>
          <Button className="m-2" variant="primary" type="submit">
            Register
          </Button>
          <a href="/signin">Sign In</a>
          {/* <Button
          className="m-2"
          variant="primary"
          onClick={() => navigate("/signin")}
        >
          Sign IN
        </Button> */}
        </Form>
      </div>
    </div>
  );
}

export default SignIn;
