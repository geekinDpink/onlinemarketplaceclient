import React, { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../context/authProvider";
import { Container, Row, Col } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";

import ItemCard from "../components/ItemCard";
import axios from "axios";

const HomePage = () => {
  const { auth } = useContext(AuthContext);
  const [listProducts, setListProducts] = useState([]);

  async function getProduct() {
    // Prevent Uncaught runtime errors: Network Err, if server not available
    try {
      await axios.get("http://localhost:3001/products").then((res) => {
        const products = res.data;
        var arr = [];
        Object.keys(products).forEach((key) => arr.push(products[key]));
        setListProducts(arr);
        // console.log("val.data", arr);
      });
    } catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    const allProducts = getProduct();
    // setListProducts(allProducts.data);
  }, []);

  // console.log("listProducts", listProducts);
  // console.log("listProducts", typeof listProducts);

  const mockfn = () => {};

  return (
    <>
      <Container>
        <h1>Welcome {auth.user}!</h1>
        <Row>
          <Formik
            onSubmit={async (values) => {
              //await getAllStall();
            }}
          >
            <Form>
              <Container
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "50%",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                <Row
                  style={{
                    marginLeft: "0px",
                    paddingLeft: "0px",
                    marginTop: "8px",
                  }}
                >
                  <Col md={12}>
                    <Field
                      id="searchStall"
                      name="searchStall"
                      placeholder="Search for stalls"
                      onChange={(e) => {
                        //setSearchInput(e.target.value);
                        // console.log(searchInput);
                        // searchFilter(e);
                      }}
                      style={{ width: "60%" }}
                    />
                  </Col>
                </Row>
              </Container>
            </Form>
          </Formik>
        </Row>
        <Row
          style={{
            background: "#FFFFF0",
            paddingLeft: "1%",
            paddingRight: "1%",
          }}
        >
          {listProducts.length > 0 ? (
            listProducts.map((pdt) => {
              return (
                <ItemCard
                  pdt={pdt}
                  handleShow={mockfn}
                  key={pdt.id}
                  setModalStall={mockfn}
                />
              );
            })
          ) : (
            <div>No Products Listed</div>
          )}
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
