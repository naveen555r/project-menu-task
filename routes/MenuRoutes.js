import express from 'express';
import Menu from '../models/Menu.js';

const router = express.Router();

// Create a new menu
router.post('/menus', async (req, res) => {
  try {
    const menu = new Menu(req.body);
    await menu.save();
    res.status(201).send(menu);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get all menus
router.get('/menus', async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).send(menus);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get a specific menu by ID
router.get('/menus/:menuId', async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.menuId);
    if (!menu) {
      return res.status(404).send({ error: 'Menu not found' });
    }
    res.status(200).send(menu);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

export default router;
