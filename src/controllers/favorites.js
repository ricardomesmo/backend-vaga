const connection = require("../database/connection");

module.exports = {
  async createFavorite(req, res) {
    try {
      const { url_picture, likes } = req.body;
      const user_id = req.headers.authorization;
      await connection("favorites").insert({ url_picture, likes, user_id });
      return res.json({ url_picture, likes, user_id });
    } catch (err) {
      return res.status(400).send({ error: "Create Favorite " + err });
    }
  },
  async listFavorites(req, res) {
    try {
      const { page = 1 } = req.query;

      const [count] = await connection("favorites").count();
      console.log(count);
      const favorites = await connection("favorites")
        .limit(5)
        .offset((page - 1) * 5)
        .select("*");

      res.header("X-Total-Count", count["count(*)"]);
      return res.json(favorites);
    } catch (err) {
      return res.status(400).send({ error: "Listing Favorite " + err });
    }
  },
  async indexFavorite(req, res) {
    try {
      const user_id = req.headers.authorization;
      const favorites = await connection("favorites")
        .where("user_id", user_id)
        .select("*");
      return res.json(favorites);
    } catch (err) {
      return res.status(400).send({ error: "Listing Your Favorites " + err });
    }
  },
  async removeFavorites(req, res) {
    try {
      const { id } = req.params;
      const user_id = req.headers.authorization;
      const favorites = await connection("favorites")
        .where("id", id)
        .select("user_id")
        .first();
      if (favorites.user_id !== user_id) {
        return res
          .status(401)
          .send({ error: "Operation not permitted " + err });
      }
      await connection("favorites").where("id", id).delete();
      return res.status(204).json({ message: "Favorite was removed" });
    } catch (err) {
      return res.status(400).send({ error: "Remove Favorite " + err });
    }
  },
};
