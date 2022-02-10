const express = require("express");
const app = express(); // create express app
const path = require("path")
const auth = require("./auth.js")
const build_path = path.join(__dirname, "..", "build")

app.use(express.static(build_path))
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use("/logged-in", express.static(build_path))


app.get("/date", (req, res)=>{
  res.status(200).sendFile(path.join(__dirname, "public/index.html"))
})

app.post("/login", (req, res)=>{
  const {id, password} = req.body
  authResults = auth(id, password)
  if (authResults.success) {
    res.cookie("user", authResults.data, {maxAge: 10000, httpOnly: false})
    res.redirect("/logged-in")
  }
})

// a /api url could provide the json data from firebase and be primarily accessed
// from the axios get request in the react app

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});