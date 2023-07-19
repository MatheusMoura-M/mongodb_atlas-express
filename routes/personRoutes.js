const router = require("express").Router();
const Person = require("../models/Person");

// Create
router.post("/", async (req, resp) => {
  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved,
  };

  if (!name) {
    return resp.status(422).json({ error: "O nome é obrigatório" });
  }

  try {
    await Person.create(person);

    resp.status(201).json({ message: "Pessoa inserida com sucesso!" });
  } catch (err) {
    resp.status(500).json({ error: err });
  }
});

// Read Peoples
router.get("/", async (req, resp) => {
  try {
    const peoples = await Person.find();

    resp.json(peoples);
  } catch (err) {
    resp.status(500).json({ error: err });
  }
});

// Read People by Id
router.get("/:id", async (req, resp) => {
  const id = req.params.id;

  try {
    const people = await Person.findById(id);

    if (!people) {
      return resp.status(422).json({ error: "Pessoa não foi encontrada" });
    }

    resp.json(people);
  } catch (err) {
    resp.status(500).json({ error: err });
  }
});

// Update Person
router.patch("/:id", async (req, resp) => {
  const id = req.params.id;
  const person = req.body;

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person);

    if (updatedPerson.matchedCount === 0) {
      return resp.status(422).json({ error: "Pessoa não foi encontrada" });
    }

    resp.status(200).json(person);
  } catch (err) {
    resp.status(500).json({ error: err });
  }
});

// Delete Person
router.delete("/:id", async (req, resp) => {
  const id = req.params.id;
  const person = await Person.findById(id);

  if (!person) {
    return resp.status(422).json({ error: "Pessoa não foi encontrada" });
  }
  try {
    await Person.deleteOne({ _id: id });

    resp.status(204).json({});
  } catch (err) {
    resp.status(500).json({ error: err });
  }
});

module.exports = router;
