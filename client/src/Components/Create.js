import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import Axios from "axios";

export const Create = () => {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [imgUrl, setimgUrl] = useState("");
  const [watched, setWatched] = useState(0);
  const [genre, setGenre] = useState("");

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
      imgUrl: imgUrl,
      watched: watched,
      genre: genre,
    }).then(() => {
      alert("Success");
    });
  };

  return (
    <Form id="hForm" onSubmit={submitReview}>
      <Row className="mx-0">
        <Col xl={4}></Col>
        <Col
          style={{
            border: "2px solid rgb(0, 0, 0)",
            borderTopLeftRadius: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)",
            borderBottom: "none",
          }}
        >
          <Row>
            <Col xs={5}>
              <Form.Group>
                <Form.Label>Movie Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter movie name"
                  name="movieName"
                  onChange={(e) => {
                    setMovieName(e.target.value);
                  }}
                  required={true}
                />
              </Form.Group>
            </Col>
            <Col xs={7}>
              <Form.Group>
                <Form.Label>Image URL:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Image URL"
                  name="imgUrl"
                  onChange={(e) => {
                    setimgUrl(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
        </Col>
        <Col xl={4}></Col>
      </Row>
      <Row className="mx-0">
        <Col xl={4}></Col>
        <Col
          xl={4}
          style={{
            border: "2px solid rgb(0, 0, 0)",
            backgroundColor: "rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)",
            borderCollapse: "collapse",
            borderTop: "none",
            borderBottom: "none",
          }}
        >
          <Form.Group>
            <Form.Label style={{ color: "white" }}>Review:</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter your review"
              name="review"
              onChange={(e) => {
                setReview(e.target.value);
              }}
              required={true}
            />
          </Form.Group>
        </Col>
        <Col xl={4}></Col>
      </Row>
      <Row className="mx-0">
        <Col xl={4}></Col>
        <Col>
          <Row
            xl={12}
            style={{
              border: "2px solid rgb(0, 0, 0)",
              borderBottomRightRadius: "10px",
              backgroundColor: "rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)",
              borderTop: "none",
              padding: "5px",
              alignItems: "center",
            }}
          >
            <Col>
              <Form.Group>
                <Form.Label>Genre:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Genre"
                  name="genre"
                  onChange={(e) => {
                    setGenre(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col xl={5} className="align-self-end ">
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Watched?"
                  name="watched"
                  defaultChecked={false}
                  onChange={() => setWatched(watched === 1 ? 0 : 1)}
                />
              </Form.Group>
            </Col>

            <Col>
              <Button
                variant="primary"
                type="submit"
                className="align-self-end "
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Col>
        <Col xl={4}></Col>
      </Row>
    </Form>
  );
};
