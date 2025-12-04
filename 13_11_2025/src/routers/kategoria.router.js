const express = require("express");
const prisma = require("../prisma");

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const { nazwa } = req.body;

  const kategoria = await prisma.kategoria.create({
    data: { nazwa },
  });

  res.json(kategoria);
});

// READ ALL
router.get("/", async (req, res) => {
  const kategorie = await prisma.kategoria.findMany();
  res.json(kategorie);
});

// READ ONE
router.get("/:id", async (req, res) => {
  const kategoria = await prisma.kategoria.findUnique({
    where: { id: Number(req.params.id) },
  });

  res.json(kategoria);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { nazwa } = req.body;

  const kategoria = await prisma.kategoria.update({
    where: { id: Number(req.params.id) },
    data: { nazwa },
  });

  res.json(kategoria);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await prisma.kategoria.delete({
    where: { id: Number(req.params.id) },
  });

  res.json({ message: "Kategoria usunięta" });
});

module.exports = router;
