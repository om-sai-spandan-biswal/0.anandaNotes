const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const jwt = require(`jsonwebtoken`);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("ok");
});

app.get("/login", (req, res) => {
  let token = jwt.sign({ email: "jayjay@gmail.com" }, "secrate");
  res.cookie("token", token);
  res.redirect("/")
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

app.get("/read", (req, res) => {
  console.log();
  jwt.verify(req.cookies.token, "secrate", function (err, decoded) {
    console.log(decoded); // bar
  });
  res.send("done");
});

app.get("/test",(req,res) => {
  res.cookie("name", "Jay Jay")
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
