import { useState, useEffect } from "react";
import Serie from "./Serie";
import { Table, Container, Row, Col } from "react-bootstrap";
import {FormattedMessage} from "react-intl";

const ListSeries = () => {
  const [series, setSeries] = useState();
  const [selected, setSelected] = useState();

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("series") === null) {
        setSeries("Loading…");
      } else {
        setSeries(localStorage.getItem("series"));
      }
    }
    fetch(
      "https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/a467415350e87c13faf9c8e843ea2fd20df056f3/series-es.json"
    )
      .then((result) => result.json())
      .then((result) => {
        setSeries(result);
        setSelected(result[0]);
      });
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md={7}>
          {series ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th><FormattedMessage id="Name"/></th>
                  <th><FormattedMessage id="Channel"/></th>
                  <th><FormattedMessage id="Seasons"/></th>
                  <th><FormattedMessage id="Episodes"/></th>
                  <th><FormattedMessage id="Release"/></th>
                </tr>
              </thead>
              <tbody>
                {series.map((serie, i) => (
                  <tr  onClick={() => setSelected(serie)}>
                    <td>{i + 1}</td>
                    <td>{serie.name}</td>
                    <td>{serie.channel}</td>
                    <td>{serie.seasons}</td>
                    <td>{serie.episodes}</td>
                    <td>{serie.release}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <br />
          )}
        </Col>
        <Col md={5}>
          <Serie serie={selected} />
        </Col>
      </Row>
    </Container>
  );
};

export default ListSeries;
