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
        style={{ width: "31%", margin: "1.1%" }}
        // onClick={(e) => handleClick(e)}
      >
        <Card.Img
          src={pdt.img_url}
          alt="Card image"
          style={{ height: "60%" }}
        />
        <Card.Body className="stallBody">
          <Card.Title>{pdt.item_name}</Card.Title>
          <Card.Text className="stallText">{pdt.item_desc}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
