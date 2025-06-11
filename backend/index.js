const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const mongoURL = "mongodb://127.0.0.1:27017/anandnotes";
const cors = require("cors");
const User = require("./models/user");
const Note = require("./models/note");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("./middelwere/verifyToken");
const cookieParser = require("cookie-parser");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(cookieParser());

mongoose.set("strictQuery", false);
async function main() {
  await mongoose.connect(mongoURL);
}
main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(`ERROR : ${err}`));

app.listen(port, () => {
  console.log(`App is listening at port : ${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

///////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/", (req, res) => {
  res.send("Jay Jay Shree Radhe...");
});
//Creat

app.get("/api/notes", async (req, res) => {
  let data = await Note.find().populate("auther"); //common used
  // const data = await Promise.all(notes.map((note) => note.populate("auther")));
  res.send(data);
});
app.get("/api/current-user", async (req, res) => {
  const token = req.cookies.token;
  if(token != null){
    const decoded = jwt.verify(token, "secrateCode");
  const currUser = await User.findOne({ email: decoded.email });
  res.send(currUser);
  }else{
    res.status(403).json({message:"User is Not Login"})
  }
});

app.get("/try", (req, res) => {
  res.send("This is a try route");
});
//

app.post("/api/auth/resister", (req, res) => {
  res.send("Resister POST");
});

app.post("/api/notes", verifyToken, async (req, res) => {
  try {
    const data = { ...req.body, auther: req.user._id };
    console.log(data);
    const createdNote = await Note.create(data);
    res.status(201).json(createdNote);
  } catch (err) {
    console.error("Error on saving", err);
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/notes/:id", verifyToken, async (req, res) => {
  try {
    const currId = req.params.id;
    const newData = req.body;
    const note = await Note.findById(currId);
    const autherEmail = (await note.populate("auther")).auther["email"];
    if (autherEmail == req.user["email"]) {
      await Note.updateOne({ _id: currId }, newData);
      res.status(200).json({ message: "Note Successfully Edited" });
    } else {
      res.status(403).json({ message: "You are NOT auther of this Note" });
    }
  } catch (err) {
    console.error("Error on Updating", err);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/notes/:id", verifyToken, async (req, res) => {
  try {
    const currId = req.params.id;
    const note = await Note.findById(currId);
    const autherEmail = (await note.populate("auther")).auther["email"];
    if (autherEmail == req.user["email"]) {
      await Note.findByIdAndDelete(currId);
      res.status(200).json({ message: "Note deleted successfully" });
    } else {
      res.status(403).json({ message: "You are NOT auther of this Note" });
    }
  } catch (err) {
    console.error("Error on Deleting", err);
    res.status(500).json({ error: err.message });
  }
});

/////Auth

app.post("/api/resister", async (req, res) => {
  let data = req.body;

  try {
    data.password = await bcrypt.hash(data.password, 10);
    const createUser = await User.create(data);
    const token = jwt.sign({ email: data.email }, "secrateCode");
    res.cookie("token", token);
    res.status(201).json(createUser);
  } catch (err) {
    console.log("Error when creating user");
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/login", async (req, res) => {
  let { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user != null) {
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const token = jwt.sign({ email: user.email }, "secrateCode");
      res.cookie("token", token);
      console.log("Correct");
      res.status(200).json({ message: "Successfully Login" });
    } else {
      console.log("Password in correct");
      res.status(400).json({ message: "Password is Incorrect" });
    }
  } else {
    console.log("User Not exist");
    res.status(400).json({ message: "User is NOT exist" });
  }
});

app.post("/api/logout", (req, res) => {
  console.log("receved request");
  res.clearCookie("token");
  res.status(200).json({ message: "Successfully loguot" });
});
