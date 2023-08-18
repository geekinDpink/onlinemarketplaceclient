import React, { useContext, useState } from "react";
import AuthContext from "../context/authProvider";
import * as Yup from "yup";
import { Container, Row, Col } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

const MyItemsPage = () => {
  const { auth } = useContext(AuthContext);
  const [isPostErr, setIsPostErr] = useState(false);
  const [isPostSuccess, setIsPostSuccess] = useState(false);

  const initialValues = {
    itemName: "",
    itemDesc: "",
    imgUrl: "",
    price: 0,
  };

  const validationSchema = Yup.object().shape({
    itemName: Yup.string().required("Required"),
    itemDesc: Yup.string().required("Required"),
    imgUrl: Yup.string().url().required("Required"),
    price: Yup.number().moreThan(0).required("Required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      console.log(values);
      const token = localStorage.getItem("token");
      const { itemName, itemDesc, imgUrl, price } = values;
      const newProductData = {
        seller_id: auth.id,
        seller_name: auth.user,
        item_name: itemName,
        item_desc: itemDesc,
        price: price,
        img_url: imgUrl,
      };

      // Get token from localstorage, add "bearer" to header via axios post request and add product data
      await axios
        .post(`http://localhost:3001/products`, newProductData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // if success, add success message for 1sec and clear all input fields
          if (res.status === 201) {
            setIsPostSuccess(true);
            resetForm({ values: "" });
            setTimeout(() => setIsPostSuccess(false), 1000);
          }
        });
    } catch (error) {
      // Error connecting to server
      setIsPostErr(true);
      console.log("Post item error", error);
    }
  };

  return (
    <>
      <Container>
        <h1>List Product</h1>
        <Row
          style={{
            width: "100%",
            background: "#FFFFF0",
            paddingLeft: "1%",
            paddingRight: "1%",
          }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Container style={{ width: "100%" }}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    marginBottom: "5px",
                  }}
                >
                  <div style={{ width: "8%", marginRight: "0px" }}>
                    <label htmlFor="itemName">Item Name</label>
                  </div>
                  <div style={{ width: "92%", marginLeft: "0px" }}>
                    <Field type="text" id="itemName" name="itemName" />
                    <br></br>
                    <ErrorMessage
                      name="itemName"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    marginBottom: "5px",
                  }}
                >
                  <div style={{ width: "8%", marginRight: "0px" }}>
                    <label htmlFor="itemDesc">Item Desc</label>
                  </div>
                  <div style={{ width: "92%", marginLeft: "0px" }}>
                    <Field type="text" id="itemDesc" name="itemDesc" />
                    <ErrorMessage
                      name="itemDesc"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    marginBottom: "5px",
                  }}
                >
                  <div style={{ width: "8%", marginRight: "0px" }}>
                    <label htmlFor="imgUrl">Link to image</label>
                  </div>
                  <div style={{ width: "92%", marginLeft: "0px" }}>
                    <Field type="text" id="imgUrl" name="imgUrl" />
                    <ErrorMessage
                      name="imgUrl"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    marginBottom: "5px",
                  }}
                >
                  <div style={{ width: "8%", marginRight: "0px" }}>
                    <label htmlFor="price">Price</label>
                  </div>
                  <div style={{ width: "92%", marginLeft: "0px" }}>
                    <Field type="number" id="price" name="price" />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
                <button type="submit">Submit</button>
              </Container>
            </Form>
          </Formik>
          {isPostErr && <div>Unable to add new product</div>}
          {isPostSuccess && <div>Product added</div>}
        </Row>
      </Container>
    </>
  );
};

export default MyItemsPage;
