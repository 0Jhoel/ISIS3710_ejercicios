import { Card, Container } from "react-bootstrap";

const Serie = (props) => {
  return (
    <Container>
      {props.serie ? (
        <Card>
          <Card.Img variant="top" src={props.serie.poster} />
          <Card.Body>
            <Card.Title>{props.serie.name}</Card.Title>
            <Card.Text>{props.serie.description}</Card.Text>
            <a href={props.serie.webpage}>{props.serie.webpage}</a>
          </Card.Body>
        </Card>
      ) : (
        <br />
      )}
    </Container>
  );
};
export default Serie;
