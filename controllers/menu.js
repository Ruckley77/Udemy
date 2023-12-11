const Menu = require('../models/menu');

async function createMenu(req, res) {
  try {
    const menu = new Menu(req.body);
    await menu.save();
    res.status(200).send(menu);
  } catch (error) {
    res.status(400).send(`${error} Error creating menu`);
  }
}

async function getMenus(req, res) {
  try {
    const { active } = req.query;
    let queryResponse = null;

    if (active === undefined) {
      queryResponse = await Menu.find().sort({ order: 'asc' });
    } else {
      queryResponse = Menu.find({ active });
    }

    if (!queryResponse) {
      return res.status(404).send('cant find menu');
    }
    return res.status(200).send(queryResponse);
  } catch (error) {
    res.status(400).send(`${error}, Error getting menus`);
  }
}

async function updateMenu(req, res) {
  try {
    const { id } = req.params;
    const menuData = req.body;

    const existingMenu = await Menu.findByIdAndUpdate(id, menuData);
    res.status(200).send(existingMenu);
  } catch (error) {
    res.status(400).send(`${error}, error updating menu`);
  }
}

async function deleteMenu(req, res) {
  try {
    const { id } = req.params;
    const existingMenu = await Menu.findByIdAndDelete(id);

    if (!existingMenu) {
      return res.status(404).send('cant find menu to delete');
    }
    res.status(200).send(existingMenu);
  } catch (error) {
    res.status(400).send(`${error}, error deleting menu`);
  }
}

module.exports = { createMenu, getMenus, updateMenu, deleteMenu };
