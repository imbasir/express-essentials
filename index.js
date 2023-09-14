import express from "express";
import data from "./data/mock.json" assert { type: "json" };

const app = express();
const PORT = 3000;

//using public folder at the root of the proj-static 1st way
app.use(express.static("public"));

//using the images folder at the route /images -static 2nd way
app.use("/images", express.static("images"));

//using the express.json() and ulrencoded
/* app.use(express.json()) */
app.use(express.urlencoded({ extended: true }));

//get routes
app.get("/", (req, res) => {
  res.json(data);
});

//POST - express.json() and express.urlencode()
app.post("/item", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

//get download methods
app.get("/download", (req, res) => {
  res.download("images/icon3.png");
});

//get redirect methods
app.get("/redirect", (req, res) => {
  res.redirect("https://youtube.com");
});

//get routes with next()
app.get(
  "/next",
  (req, res, next) => {
    console.log("The response will be send by the next() method.");
    next();
  },
  (req, res) => {
    res.send("I just sent up a route with a second callback");
  }
);

//Route chaining
app
  .route("/class")
  .get((req, res) => {
    res.send("This is a retrieve class info");
    //throw new Error();
  })
  .post((req, res) => {
    res.send("Create class info");
  })
  .put((req, res) => {
    res.send("Update class info");
  });

//get with routing parameters
app.get("/class/:id", (req, res) => {
  const studentId = Number(req.params.id);

  const student = data.filter((student) => student.id === studentId);
  res.send(student);
});

//post routes
app.post("/create", (req, res) => {
  res.send("This is a post request at /create");
});

//update routes
app.put("/edit", (req, res) => {
  res.send("This is a put request at /edit");
});

//delete routes
app.delete("/delete", (req, res) => {
  res.send("This is a delete request at /delete");
});

//error stack trace
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("something went wrong");
});

//port logs
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//npm
//npm install express nodemon
//npm  install --save-dev @babel/core @babel/cli @babel/preset-env/ @babel@/node
