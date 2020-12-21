import React from "react";
import { Card, Col } from "react-bootstrap";

export default function AlbumCard(props) {
  const { name, date, imgurl } = props;
  return (
    <Card
      bg="dark"
      text="light"
      border="light"
      style={{
        width: "15rem",
        borderRadius: "0.3rem",
        margin: "1.5rem",
        padding: "0.1rem",
        alignSelf: "start",
      }}
    >
      <Card.Img src={imgurl} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>{date}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}
