import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { database } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignIn() {
  const [user, setUser] = useState({email:'',password:''});
  const [showPassword, setShowPassword] = useState(false);
  // const [validateName, setValidateName] = useState(false);
  // const [validatePassword, setValidatePassword] = useState(false);
  const [validateErrors, setValidateErrors] = useState({email:false,password:false})

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    setValidateErrors({...validateErrors,[name]:value.trim().lenght===0})

    // if (user?.email !== undefined) {
    //   setValidateName(false);
    // } else {
    //   setValidateName(true);
    // }
    // if (name === "password") {
    //   if (user?.password !== undefined) {
    //     setValidatePassword(false);
    //   } else {
    //     setValidatePassword(true);
    //   }
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {email, password} =   user;

    if(email.trim().length===0 || password.trim().length ===0 ){
      setValidateErrors({email:user?.email?.trim().length===0, password:user?.password?.trim().length===0});
      return;
    }

    // if (
    //   user?.email &&
    //   user.email.lenght !== 0 &&
    //   user?.email !== undefined &&
    //   user?.password !== undefined &&
    //   user?.password !== ""
    // ) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          database,
          user?.email,
          user?.password
        );
        if (userCredential && userCredential.user) {
          console.log("userCred ", userCredential);
          localStorage.setItem(
            "userID",
            JSON.stringify(userCredential?.user?.uid)
          );
          toast.success("Successfully signed In!");
          navigate("/notes");
        }
      } catch (error) {
        toast.error("Unscussful Login ", error.code);
        console.log("user Sign in Error ", error);
      }
    // } else {
    //   console.log("user submit data ", user);
    //   if (user?.email !== undefined && user?.email !== "") {
    //     console.log("user email ", user?.email);
    //     setValidateName(false);
    //   } else {
    //     console.log("user else email ", user?.email);
    //     setValidateName(true);
    //   }

    //   if (user?.password !== undefined && user?.password !== "") {
    //     setValidatePassword(false);
    //     console.log("if ", user);
    //   } else {
    //     setValidatePassword(true);
    //     console.log("else ", user);
    //   }
    // }
    // console.log("users ", user);
  };

  console.log("validationErrors ",validateErrors)

  return (
    <div className="signinhome">
      <div className="signnimg">
        <img src="\images\notesimage.jpg" className="img1" alt="image" />
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
              isInvalid = {validateErrors?.email}
            />
            <Form.Control.Feedback type="invalid">Enter a valid email</Form.Control.Feedback>

            {/* {validateName ? (
              <p className="para-error">Enter the Email</p>
            ) : (
              <p></p>
            )} */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              isInvalid ={validateErrors?.password}
            />
            <div
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {(showPassword && !validateErrors?.password) && <i class="bi bi-eye-fill"></i>}
              {(!showPassword  && !validateErrors?.password)&& <i class="bi bi-eye-slash-fill"></i>}
            </div>

            <Form.Control.Feedback className="mt-4" type="invalid">Enter the Password</Form.Control.Feedback>

            {/* {validatePassword ? (
              <p className="para-error">Enter the Password</p>
            ) : (
              ""
            )} */}
          </Form.Group>
          <Button className="d-block mb-4" variant="primary" type="submit">
            Log In
          </Button>
          <a className="m-2 ml-0" href="/signup">
            Register
          </a>
          <a className="m-2" href="/reset">
            ResetPassword
          </a>
        </Form>
      </div>
    </div>
  );
}

export default SignIn;
