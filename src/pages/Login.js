import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AuthContext from "../context/authProvider";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

// import { useAuth } from "../utilis/auth"; // authProvider v1

const LoginPage = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  // const auth = useAuth(); // authProvider v1
  const { auth, setAuth } = useContext(AuthContext);
  const [isWrongUserOrPwd, setIsWrongUserOrPwd] = useState(false); // Login in successful
  const [isConnectErr, setisConnectErr] = useState(false); // Unable to connect to server
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required").min(5, "min 5 chars"),
  });

  // Update username in context and get token
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:3001/login", values); // Make POST request to /login
      console.log("response", response);

      if (response.data) {
        const token = response.data.token;

        // Store the token in local storage
        localStorage.setItem("token", token);

        // For context
        console.log("values", response);
        setAuth({ user: response.data.username, id: response.data.id });
        // auth.login(values.username); // authProvider v1

        setIsWrongUserOrPwd(false);
        setisConnectErr(false);
      }

      // Navigate to previous page
      navigate(-1);
    } catch (error) {
      console.log("error", error);

      if (!error.response) {
        // network error
        setisConnectErr(true);
      } else {
        setIsWrongUserOrPwd(true);
      }
    }
  };

  return (
    <>
      <h1>Login</h1>

      {auth.user ? (
        <div>
          <div>Welcome {auth.user}, your login is successful</div>
          <button onClick={() => setAuth({})}>Logout</button>
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div
              style={{ width: "100%", display: "flex", marginBottom: "5px" }}
            >
              <div style={{ width: "6%", marginRight: "0px" }}>
                <label htmlFor="username">Username</label>
              </div>
              <div style={{ width: "94%", marginLeft: "0px" }}>
                <Field type="text" id="username" name="username" />
                <br />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error"
                />
              </div>
            </div>{" "}
            <div
              style={{ width: "100%", display: "flex", marginBottom: "5px" }}
            >
              <div style={{ width: "6%", marginRight: "0px" }}>
                <label
                  htmlFor="password"
                  style={{ marginLeft: 0, marginRight: "10px", width: "40%" }}
                >
                  Password
                </label>
              </div>
              <div style={{ width: "94%", marginLeft: "0px" }}>
                <Field type="password" id="password" name="password" /> <br />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
            </div>
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      )}
      {isWrongUserOrPwd && (
        <div>Username or password is incorrect, please try again</div>
      )}
      {isConnectErr && <div>Server is unavailable, please try later</div>}
    </>
  );
};

export default LoginPage;
