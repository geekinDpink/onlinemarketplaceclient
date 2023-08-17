import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const RegistePage = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("R  equired"),
    password: Yup.string().required("Required").min(5, "min 5 chars"),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const response = await axios.post("http://localhost:3001/login", values); // Make POST request to /login
      const { token } = response.data;

      // Store the token in local storage
      console.log(response);
      localStorage.setItem("token", token);

      // Navigate to another page
      // history.push("/dashboard"); // Adjust the route as needed
    } catch (error) {
      console.error("Login error:", error);
      setStatus("Invalid username or password"); // Display error message
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h1>Create An Account</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
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
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegistePage;
