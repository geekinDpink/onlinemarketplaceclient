import React, { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../context/authProvider";
import { Container, Row } from "react-bootstrap";
import ItemCard from "../components/ItemCard";
import axios from "axios";

const MyItemsPage = () => {
  const { auth } = useContext(AuthContext);
  const [myListProducts, setMyListProducts] = useState([]);

  // Get token from localstorage, add "bearer" to header via axios get request and get data
  async function getProduct() {
    const token = localStorage.getItem("token");
    console.log("token", token);

    await axios
      .get(`http://localhost:3001/products/${auth.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const products = res.data;
        var arr = [];
        Object.keys(products).forEach((key) => arr.push(products[key]));
        setMyListProducts(arr);
        // console.log("val.data", arr);
      });
  }

  useEffect(() => {
    const allProducts = getProduct();
    // setlistProducts(allProducts.data);
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
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {myListProducts.length > 0 ? (
            myListProducts.map((pdt) => {
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

export default MyItemsPage;
