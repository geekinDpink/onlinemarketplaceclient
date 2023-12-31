import React from "react";
import Card from "react-bootstrap/Card";

export default function ItemCard({ pdt, handleShow, setModalStall }) {
  const handleClick = (event) => {
    // let elementID = event.target.getAttribute("id");
    // setModalStall(pdt);
    // handleShow(true);
    console.log(pdt);
  };

  return (
    <>
      <Card
        className="ItemCard"
        key={pdt.id}
        id={pdt.item_name}
        style={{ width: "20%", margin: "1.1%", height: "100%" }}
      >
        <Card.Img
          src={pdt.img_url}
          alt="Card image"
          style={{ height: "150px", width: "150px" }}
        />
        <Card.Body className="stallBody">
          <Card.Title>{pdt.item_name}</Card.Title>
          <Card.Text className="stallText">
            Seller:{pdt.seller_name}
            <br />
            Price:{pdt.price}
            <br />
            {pdt.item_desc}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
