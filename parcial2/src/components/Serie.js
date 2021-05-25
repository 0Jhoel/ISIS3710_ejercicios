import { useState, useEffect } from "react";
import { Card, Button, Container } from "react-bootstrap";

const Serie = (props) => {

  const toDataURL = (url) =>
    fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );

  return (
	  <Container>
	  {props.serie?(
		<Card>
		<Card.Img variant="top" src={props.serie.poster} />
		<Card.Body>
		  <Card.Title>{props.serie.name}</Card.Title>
		  <Card.Text>
			{props.serie.description}
		  </Card.Text>
		  <a href={props.serie.webpage}>{props.serie.webpage}</a>
		</Card.Body>
	  </Card>
	  ):(<br/>)}
	  </Container>
  );
};
export default Serie;
