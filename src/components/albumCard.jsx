import React from "react";
import { Card, Col } from "react-bootstrap";

export default function AlbumCard(props) {
  const { name, date, imgurl } = props;
  return (
    <Card
      bg="light"
      text="dark"
      style={{
        width: "18rem",
        margin: "1rem",
        borderRadius: "0.5rem",
        background: "linear-gradient(rgba(255, 255, 255, 0.5), transparent)",
      }}
      className="align-self-start"
    >
      <Card.Img variant="top" src={imgurl} />
      <Card.Body style={{ opacity: "65%" }}>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>{date}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}
