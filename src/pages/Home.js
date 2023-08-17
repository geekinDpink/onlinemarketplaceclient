import React, { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../context/authProvider";
import { Container, Row } from "react-bootstrap";
import ItemCard from "../components/ItemCard";
import axios from "axios";

const HomePage = () => {
  const { auth } = useContext(AuthContext);
  const [listProducts, setListProducts] = useState([]);

  async function getProduct() {
    await axios.get("http://localhost:3001/products").then((res) => {
      const products = res.data;
      var arr = [];
      Object.keys(products).forEach((key) => arr.push(products[key]));
      setListProducts(arr);
      // console.log("val.data", arr);
    });
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
