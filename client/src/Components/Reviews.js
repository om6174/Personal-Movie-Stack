import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Button, Card, Col } from "react-bootstrap";
import Swal from "sweetalert2";

export const Reviews = (props) => {
  const [reviewList, setReviewList] = useState([]);
  const [newReview, setNewReview] = useState({});
  const [newWatched, setNewWatched] = useState(false);
  const updateWatched = (id) => {
    //
    Axios.put("http://localhost:3001/api/update", {
      id: id,
      newWatched: !newWatched,
    }).then(() => {
      setNewWatched(!newWatched);
    });
  };

  const updateReview = (id) => {
    //setNewWatched(newWatched === 1 ? 0 : 1);
    if (newReview[id]) {
      Axios.put("http://localhost:3001/api/update2", {
        id: id,
        newReview: newReview[id],
      });
      setNewReview((prevState) => ({
        ...prevState,
        [id]: "",
      }));
    }
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setReviewList(response.data);
    });
  });

  const deleteReview = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`).then(
      console.log("deleted")
    );
  };

  return reviewList.map((val) => {
    return (
      <Col xs={3} key={val.id} style={{ minWidth: "19rem" }}>
        <Card
          className="card my-1"
          border="info"
          style={{
            minHeight: "28rem",
            maxHeight: "28rem",
          }}
          //style={{ height: "20rem" }}
        >
          <Card.Img
            variant="top"
            src={val.imageURL}
            alt={val.movieName}
            width="100px"
            height="200px"
          />
          {/* <img
              className="card-img-top"
              //src={val.imgUrl}
              src={val.imageURL}
              alt={val.movieName}
            ></img> */}
          <Card.Body
            className="overflow-auto"
            style={{
              marginBottom: "-10px",
              backgroundColor: "rgba(40, 40, 40, 0.2), rgba(55, 55, 55, 0.6)",
            }}
          >
            <Card.Title>{val.movieName}</Card.Title>
            <Card.Text
              as="textarea"
              name="newReview"
              id={val.id}
              defaultValue={val.movieReview}
              style={{
                width: "320px",
                height: "105px",
                margin: "-10px",
                backgroundColor: "rgba(156, 156, 178,0.3)",
              }}
              onChange={(e) => {
                setNewReview((prevState) => ({
                  ...prevState,
                  [e.target.id]: e.target.value,
                }));
              }}
              className="overflow-auto"
            ></Card.Text>
          </Card.Body>

          <Card.Footer
            style={{
              backgroundColor: "#333333",
            }}
          >
            <Button
              className="btn btn-primary btn-sm m-1"
              style={{ marginLeft: "-10px" }}
              onClick={() => {
                Swal.fire({
                  title: `Are you sure?`,
                  text: val.movieName + " will be deleted",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    Swal.fire(
                      "Deleted!",
                      "Your movie has been deleted.",
                      "success"
                    );
                    deleteReview(val.id);
                  }
                });
                //alert("Deleting " + val.movieName);
              }}
            >
              Delete
            </Button>
            <Button
              name="newWatched"
              className={
                val.Watched
                  ? "btn btn-sm btn-primary m-1"
                  : "btn btn-sm btn-danger m-1"
              }
              onClick={(e) => {
                updateWatched(val.id);
              }}
            >
              {val.Watched ? "Seen" : "Not seen"}
            </Button>
            <Button
              className="btn btn-primary btn-sm m-1"
              onClick={() => {
                updateReview(val.id);
              }}
            >
              Update Review
            </Button>
            <span style={{ float: "right", color: "grey", overflow: "hidden" }}>
              {val.Genre}
            </span>
          </Card.Footer>
        </Card>
      </Col>
    );
  });
};
