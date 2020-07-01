const connection = require("../database/connection");

module.exports = {
  async createUser(req, res) {
    try {
      const { name, email } = req.body;
      await connection("users").insert({
        name,
        email,
      });
      return res.json({ name, email });
    } catch (err) {
      return res.status(400).send({ error: "Create User " + err });
    }
  },

  async listUsers(req, res) {
    try {
      const users = await connection("users").select("*");
      return res.json(users);
    } catch (err) {
      return res.status(400).send({ error: "List Users " + err });
    }
  },
};
