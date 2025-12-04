const express = require("express");
const prisma = require("../prisma");

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const { autor, tresc, wpisId } = req.body;

  const komentarz = await prisma.komentarz.create({
    data: {
      autor,
      tresc,
      wpisId,
    },
  });

  res.json(komentarz);
});

// READ ALL
router.get("/", async (req, res) => {
  const komentarze = await prisma.komentarz.findMany({
    include: {
      wpis: true,
    },
  });

  res.json(komentarze);
});

// READ ONE
router.get("/:id", async (req, res) => {
  const komentarz = await prisma.komentarz.findUnique({
    where: { id: Number(req.params.id) },
    include: { wpis: true },
  });

  res.json(komentarz);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { autor, tresc } = req.body;

  const komentarz = await prisma.komentarz.update({
    where: { id: Number(req.params.id) },
    data: { autor, tresc },
  });

  res.json(komentarz);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await prisma.komentarz.delete({
    where: { id: Number(req.params.id) },
  });

  res.json({ message: "Komentarz usunięty" });
});

module.exports = router;
