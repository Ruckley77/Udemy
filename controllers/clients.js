const Client = require('../models/clients');

async function create(req, res) {
  const { name, cc } = req.body;
  try {
    const client = new Client({ name, cc });
    await client.save();
    res.send(client);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

async function read(req, res) {
  try {
    const client = await Client.find();
    res.send(client);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

async function upt(req, res) {
  const cc = req.params.cc;
  const body = req.body;

  try {
    const client = await Client.findOneAndUpdate({ cc: cc }, body);
    if (!client) {
      res.status(404).send();
    } else {
      res.status(200).send();
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}
async function del(req, res) {
  try {
    const id = req.params.id;
    const client = await Client.findOneAndDelete({ _id: id });
    if (!client) {
      res.status(404).send('Client does not exist');
    } else {
      res.status(200).send(client);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

module.exports = {
  create,
  read,
  upt,
  del,
};
