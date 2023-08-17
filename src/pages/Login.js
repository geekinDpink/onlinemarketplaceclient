import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AuthContext from "../context/authProvider";
import { useNavigate } from "react-router-dom";
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
        <div>Welcome {auth.user}, your login is successful</div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div>
              <label htmlFor="username">Username</label>
              <Field type="text" id="username" name="username" />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
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
