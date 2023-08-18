import React, { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../context/authProvider";
import { Container, Row, Col } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";

import ItemCard from "../components/ItemCard";
import axios from "axios";

const HomePage = () => {
  const { auth } = useContext(AuthContext);
  const [listProducts, setListProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  async function getProduct() {
    // Prevent Uncaught runtime errors: Network Err, if server not available
    try {
      await axios.get("http://localhost:3001/products").then((res) => {
        const products = res.data;
        var arr = [];
        Object.keys(products).forEach((key) => arr.push(products[key]));
        setListProducts(arr);
        if (searchInput === "") {
          setFilteredData(arr);
        }
      });
    } catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    const allProducts = getProduct();
  }, []);

  useEffect(() => {
    console.log("useEffect searchinput", searchInput);
    if (searchInput === "") {
      setFilteredData(listProducts);
    } else {
      console.log("initial input: listproducts state", listProducts);
      let newProductsData = listProducts.filter((product) => {
        console.log("product", product.item_name);
        return product.item_name
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      console.log("output", newProductsData);

      setFilteredData(newProductsData);
    }
  }, [searchInput]);

  console.log("listProducts", listProducts);
  console.log("filteredData", filteredData);

  const mockfn = () => {};

  return (
    <>
      <Container
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          width: "80%",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <h1>Welcome {auth.user}!</h1>
        <Row>
          <p>
            Online marketplace is the best place to find and sell your products.
            You can find any products you want in the list of item below. If you
            have difficulty finding a product, you may key the product name into
            the search bar below.
          </p>
          <p>
            Do note that you need to login to list your products for sale and
            view the product you list.
          </p>
        </Row>
        <Row>
          <Formik
            onSubmit={async (values) => {
              await getProduct(values);
            }}
          >
            <Form>
              <Container
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
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
                      id="searchItem"
                      name="searchItem"
                      placeholder="Search By Item Name"
                      onChange={(e) => {
                        setSearchInput(e.target.value);
                      }}
                      style={{ width: "40%" }}
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
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {filteredData.length > 0 ? (
            filteredData.map((pdt) => {
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
