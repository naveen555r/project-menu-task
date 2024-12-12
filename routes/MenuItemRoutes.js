import express from 'express';
import Menu from '../models/Menu.js';
import MenuItem from '../models/MenuItem.js';

const router = express.Router();

// Add an item to a menu
router.post('/menus/:menuId/items', async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.menuId);
    if (!menu) {
      return res.status(404).send({ error: 'Menu not found' });
    }

    const menuItem = new MenuItem({
      ...req.body,
      menuId: menu._id,  // Link item to menu
    });

    await menuItem.save();
    res.status(201).send(menuItem);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get all items for a specific menu
router.get('/menus/:menuId/items', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ menuId: req.params.menuId });
    res.status(200).send(menuItems);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Update an existing menu item
router.put('/menus/:menuId/items/:itemId', async (req, res) => {
    try {
      const menu = await Menu.findById(req.params.menuId);
      if (!menu) {
        return res.status(404).send({ error: 'Menu not found' });
      }
  
      const menuItem = await MenuItem.findByIdAndUpdate(
        req.params.itemId,
        { ...req.body, menuId: menu._id },
        { new: true }  // Return the updated document
      );
  
      if (!menuItem) {
        return res.status(404).send({ error: 'Menu item not found' });
      }
  
      res.status(200).send(menuItem);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
});
  
// Delete a menu item
router.delete('/menus/:menuId/items/:itemId', async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.menuId);
        if (!menu) {
        return res.status(404).send({ error: 'Menu not found' });
        }

        const menuItem = await MenuItem.findByIdAndDelete(req.params.itemId);
        if (!menuItem) {
        return res.status(404).send({ error: 'Menu item not found' });
        }

        res.status(200).send({ message: 'Menu item deleted successfully' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});
  

export default router;
