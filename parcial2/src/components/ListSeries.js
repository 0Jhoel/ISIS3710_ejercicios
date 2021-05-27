import { useState, useEffect } from "react";
import Serie from "./Serie";
import GraphSeasons from "./Visualizations/GraphSeasons";
import { Table, Container, Row, Col } from "react-bootstrap";
import { FormattedMessage, FormattedDate } from "react-intl";

const ListSeries = (props) => {
  const SERIES = "series";
  const [series, setSeries] = useState();
  const [selected, setSelected] = useState();
  console.log(SERIES, localStorage.getItem(SERIES));

  const convertDate = (dateString) => {
    let dateParts = dateString.split("/");
    return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  };

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem(SERIES) === null) {
        setSeries("Loading…");
      } else {
        setSeries(localStorage.getItem(SERIES));
      }
    }
    fetch(props.url)
      .then((result) => result.json())
      .then((result) => {
        setSeries(result);
        setSelected(result[0]);
        localStorage.setItem(SERIES, result);
      });
  }, []);

  return (
    <Container fluid>
      {series ? (
        <div>
          <Row>
            <Col md={7}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>
                      <FormattedMessage id="Name" />
                    </th>
                    <th>
                      <FormattedMessage id="Channel" />
                    </th>
                    <th>
                      <FormattedMessage id="Seasons" />
                    </th>
                    <th>
                      <FormattedMessage id="Episodes" />
                    </th>
                    <th>
                      <FormattedMessage id="Release" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {series.map((serie, i) => (
                    <tr key={i} onClick={() => setSelected(serie)}>
                      <td>{i + 1}</td>
                      <td>{serie.name}</td>
                      <td>{serie.channel}</td>
                      <td>{serie.seasons}</td>
                      <td>{serie.episodes}</td>
                      <td>
                        <FormattedDate
                          value={convertDate(serie.release)}
                          year="numeric"
                          month="long"
                          day="numeric"
                          weekday="long"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
            <Col md={5}>
              <Serie serie={selected} />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Row>
                <h4>
                  <FormattedMessage id="Seasons" />
                  &nbsp; vs &nbsp;
                  <FormattedMessage id="Episodes" />
                </h4>
              </Row>
              <Row>
                <GraphSeasons data={series} />
              </Row>
            </Col>
          </Row>
        </div>
      ) : (
        <br />
      )}
    </Container>
  );
};

export default ListSeries;
