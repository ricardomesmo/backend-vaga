const connection = require("../database/connection");

module.exports = {
  async login(req, res) {
    try {
      const { email } = req.body;
      const user = await connection("users")
        .where("email", email)
        .select("name")
        .first();

      if (!user) {
        return res.status(400).send({ error: "User email not found " });
      }
      return res.json(user);
    } catch (err) {
      return res.status(400).send({ error: "An error occurred  " + err });
    }
  },
};
