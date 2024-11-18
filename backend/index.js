const express = require("express")
const app = express()
const { connection } = require("./utils/db")
const bodyParser = require("body-parser")
const cors = require("cors")
const List = require("./model/listModel")
const PORT = 3001

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(bodyParser.json())

// log toutes les requêtes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

connection()

app.post("/api/lists", async (req, res) => {
  try {
    const { values } = req.body
    console.log(values)

    if (!values) {
      res.status(422).send({ error: "missing an argument" })

      return
    }
    const newList = await List.create(values)

    res.send(newList)
  } catch (e) {
    console.log(e)
    res.status(500).send(e.message)
  }
})

app.get("/api/lists", async (req, res) => {
  try {
    const lists = await List.find()

    res.send(lists)
  } catch (e) {
    res.status(500).send(e.message)
  }
})

app.put("/api/lists/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { values } = req.body

    const updatedList = await List.findByIdAndUpdate(id, values, { new: true })

    if (!updatedList) {
      res.status(404).send("List not found")

      return
    }

    res.send(updatedList)
  } catch (e) {
    res.status(500).send(e.message)
  }
})

app.delete("/api/lists/:id", async (req, res) => {
  try {
    const { id } = req.params

    const deletedList = await List.findByIdAndDelete(id)

    if (!deletedList) {
      res.status(404).send("List not found")

      return
    }

    res.send(deletedList)
  } catch (e) {
    res.status(500).send(e.message)
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
