import React, { useState, useEffect } from "react";
import { Table, Col, Row } from "react-bootstrap";
import Axios from "axios";
import { PieChart } from "react-minimal-pie-chart";

export const DashBoard = () => {
  const [movieCount, setmovieCount] = useState([]);
  const [tagData, setTagData] = useState([]);

  const pieData = tagData.map((lead, key) => {
    return {
      title: (lead.Genre ? lead.Genre : "Unknown") + ":" + lead.genCount,
      value: lead.genCount,
      color: "#C13C37",
    };
  });

  useEffect(() => {
    Axios.get("http://localhost:3001/api/dash").then((response) => {
      setmovieCount([response.data[0][0].total, response.data[1][0].total]);
      setTagData(response.data[2]);
    });
  }, []);
  return (
    <div style={{ width: "90%" }}>
      <Row style={{ alignItems: "center", marginTop: "0px" }} width="100%">
        <Col xl={1}></Col>
        <Col xl={3}>
          <Table striped bordered hover variant="dark">
            <tbody>
              <tr>
                <td>Number of Movies</td>
                <td>{String(movieCount[0])}</td>
              </tr>
              <tr>
                <td>Movies watched</td>
                <td>{String(movieCount[1])}</td>
              </tr>
              <tr>
                <td>Movies not watched</td>
                <td>{String(movieCount[0] - movieCount[1])}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col
          xl={3}
          style={{
            backgroundColor: "#EEEEEE",
            borderRadius: "15px",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
          }}
        >
          <PieChart
            animationDuration={500}
            center={[60, 60]}
            animationEasing="ease-out"
            labelPosition={80}
            labelStyle={{
              fontSize: "6px",
              fontFamily: "cursive",
              fontWeight: "bold",
            }}
            lengthAngle={360}
            lineWidth={25}
            paddingAngle={10}
            radius={50}
            startAngle={0}
            viewBoxSize={[120, 120]}
            label={(props) => props.dataEntry.title}
            data={[
              {
                title: "Watched",
                value: movieCount[1] ? movieCount[1] : 1,
                color: "#E38627",
              },
              {
                title: "Watchlist",
                value:
                  movieCount[0] - movieCount[1]
                    ? movieCount[0] - movieCount[1]
                    : 1,
                color: "#C13C37",
              },
            ]}
          />
        </Col>
        <Col
          xl={3}
          style={{
            backgroundColor: "#EEEEEE",
            borderRadius: "15px",
            borderTopLeftRadius: "0px",
            borderBottomLeftRadius: "0px",
          }}
        >
          <PieChart
            animationDuration={500}
            center={[60, 60]}
            animationEasing="ease-out"
            labelPosition={75}
            lengthAngle={360}
            lineWidth={25}
            paddingAngle={10}
            radius={45}
            startAngle={0}
            viewBoxSize={[120, 120]}
            label={(props) => props.dataEntry.title}
            data={pieData}
            labelStyle={{
              fontSize: "6px",
              fontFamily: "sans-serif",
              fontWeight: "bold",
              color: "#FFFFFF",
              backgroundColor: "#FFFFFF",
            }}
          />
          {/* <PieChart
               animation
               animationDuration={500}
               animationEasing="ease-out"
               label={true}
               data={[
                 {
                   color: "#E38627",
                   title: "One",
                   value: 10,
                 },
                 {
                   color: "#C13C37",
                   title: "Two",
                   value: 15,
                 },
                 {
                   color: "#6A2135",
                   title: "Three",
                   value: 20,
                 },
               ]}
               labelPosition={50}
               lengthAngle={360}
               lineWidth={30}
               paddingAngle={0}
               radius={50}
               rounded
               startAngle={0}
               viewBoxSize={[100, 100]}
             /> */}
        </Col>
      </Row>
    </div>
  );
};
