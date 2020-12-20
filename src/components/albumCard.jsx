import React from "react";
import { Card, Col } from "react-bootstrap";

export default function AlbumCard(props) {
  const { name, date, imgurl } = props;
  return (
    <Card
      bg="dark"
      text="light"
      style={{
        width: "15rem",
        margin: "2rem",
        borderRadius: "0.5rem",
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
