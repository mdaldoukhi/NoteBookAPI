const express = require("express");
const cors = require("cors");
const notebookRoutes = require("./API/notebook/routes");
const noteRoutes = require("./API/note/routes");

const db = require("./db/models");
const app = express();


app.use(cors());
app.use(express.json());


app.use("/notebooks", notebookRoutes);
app.use("/notes", noteRoutes);

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error." });
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found." });
});

const run = async () => {
  try {
    await db.sequelize.sync({ force: true });
    console.log("Connected Successfully");
    app.listen(8000, () => {
      console.log("localhost:8000");
    });
  } catch (error) {
    console.error(error);
  }
};

run();
