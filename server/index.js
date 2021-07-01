const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "cruddatabase",
  multipleStatements: true,
});

app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/api/dash", (req, res) => {
  const sqlDash = "SELECT COUNT(*) as total FROM movie_reviews;";
  const sqlSeen =
    "SELECT COUNT(*) as total FROM movie_reviews WHERE Watched = true;";
  const sqlTags =
    "select Genre, count(*) as genCount from movie_reviews group by Genre";
  db.query(sqlDash + sqlSeen + sqlTags, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send(result);
  });
});

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM movie_reviews";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.delete("/api/delete/:id", (req, res) => {
  const delKey = req.params.id;
  const sqlSelect = "DELETE FROM movie_reviews WHERE id = (?) ";
  db.query(sqlSelect, delKey, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(delKey);
  });
});
app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  const imgUrl = req.body.imgUrl;
  const watched = req.body.watched;
  const genre = req.body.genre;
  const sqlInsert =
    "INSERT INTO movie_reviews (movieName, movieReview, imageURL, Watched, Genre) VALUES (?,?, ?, ?, ?)";
  db.query(
    sqlInsert,
    [movieName, movieReview, imgUrl, watched, genre],
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
});

app.put("/api/update", (req, res) => {
  const movieId = req.body.id;
  const newWatched = req.body.newWatched;
  const sqlUpdate = "UPDATE movie_reviews SET Watched = ? WHERE id = ?";
  db.query(sqlUpdate, [newWatched, movieId], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(true);
  });
});

app.put("/api/update2", (req, res) => {
  const movieId = req.body.id;
  const newReview = req.body.newReview;
  const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE id = ?";
  db.query(sqlUpdate, [newReview, movieId], (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});
app.listen(3001, () => {
  console.log("running!!!");
});
