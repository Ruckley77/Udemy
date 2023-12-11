const Newsletter = require('../models/newsletter');

async function subscribeNewsletter(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send('email is required');
    }

    const newsletter = new Newsletter({ email: email.toLowerCase() });
    const subscribedEmail = await Newsletter.findOne({
      email: email.toLowerCase(),
    });
    if (subscribedEmail) {
      return res.status(400).send('email already subscribed');
    }

    await newsletter.save();
    res.status(200).send(newsletter);
  } catch (error) {
    res.status(400).send(`${error}, error subscribing to newsletter`);
  }
}

async function getsubscribeNewsletter(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };
    const paginateSubscribeNewsletter = await Newsletter.paginate({}, options);

    res.status(200).send(paginateSubscribeNewsletter);
  } catch (error) {
    res.status(400).send(`${error}, error getting subscribed newsletter`);
  }
}

async function deletesubscribeNewsletter(req, res) {
  try {
    const { id } = req.params;
    const subscribedEmail = await Newsletter.findByIdAndDelete(id);
    if (!subscribedEmail) {
      return res.status(404).send('cant find subscribed to delete');
    }
    res.status(200).send(subscribedEmail);
  } catch (error) {
    res.status(400).send(`${error}, error deleting subscribed`);
  }
}

module.exports = {
  subscribeNewsletter,
  getsubscribeNewsletter,
  deletesubscribeNewsletter,
};
