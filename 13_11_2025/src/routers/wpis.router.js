const express = require("express");
const prisma = require("../prisma");

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const { tytul, tresc, kategoriaId } = req.body;

  const wpis = await prisma.wpis.create({
    data: {
      tytul,
      tresc,
      kategoriaId,
    },
  });

  res.json(wpis);
});

// READ ALL
router.get("/", async (req, res) => {
  const wpisy = await prisma.wpis.findMany({
    include: {
      kategoria: true,
      komentarze: true,
    },
  });

  res.json(wpisy);
});

// READ ONE
router.get("/:id", async (req, res) => {
  const wpis = await prisma.wpis.findUnique({
    where: { id: Number(req.params.id) },
    include: {
      kategoria: true,
      komentarze: true,
    },
  });

  res.json(wpis);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { tytul, tresc } = req.body;

  const wpis = await prisma.wpis.update({
    where: { id: Number(req.params.id) },
    data: { tytul, tresc },
  });

  res.json(wpis);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await prisma.wpis.delete({
    where: { id: Number(req.params.id) },
  });

  res.json({ message: "Wpis usunięty" });
});

module.exports = router;
