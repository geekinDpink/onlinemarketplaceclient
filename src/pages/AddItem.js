import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/authProvider";
import * as Yup from "yup";
import { Container, Row } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

const MyItemsPage = () => {
  const { auth } = useContext(AuthContext);
  const [myListProducts, setMyListProducts] = useState([]);

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

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem("token");
      const { itemName, itemDesc, imgUrl, price } = values;
      const newProduct = {
        seller_id: auth.id,
        seller_name: auth.user,
        item_name: itemName,
        item_desc: itemDesc,
        img_url: imgUrl,
        price: price,
      };

      // Get token from localstorage, add "bearer" to header via axios post request and add product data
      const response = await axios
        .post(`http://localhost:3001/products/${auth.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const products = res.data;
          var arr = [];
          Object.keys(products).forEach((key) => arr.push(products[key]));
          // console.log("val.data", arr);
        });

      if (response.data) {
        // For context
        console.log("values", response);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  async function addProduct() {
    const token = localStorage.getItem("token");
    console.log("token", token);

    await axios
      .post(`http://localhost:3001/products/${auth.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const products = res.data;
        var arr = [];
        Object.keys(products).forEach((key) => arr.push(products[key]));
        // console.log("val.data", arr);
      });
  }

  return (
    <>
      <Container>
        <h1>List Product</h1>
        <Row
          style={{
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
              <div>
                <label htmlFor="itemName">Item Name</label>
                <Field type="text" id="itemName" name="itemName" />
                <ErrorMessage
                  name="itemName"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label htmlFor="itemDesc">Item Description</label>
                <Field type="text" id="itemDesc" name="itemDesc" />
                <ErrorMessage
                  name="itemDesc"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label htmlFor="imgUrl">Link to image</label>
                <Field type="text" id="imgUrl" name="imgUrl" />
                <ErrorMessage name="imgUrl" component="div" className="error" />
              </div>
              <div>
                <label htmlFor="price">Price</label>
                <Field type="number" id="price" name="price" />
                <ErrorMessage name="price" component="div" className="error" />
              </div>
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </Row>
      </Container>
    </>
  );
};

export default MyItemsPage;
