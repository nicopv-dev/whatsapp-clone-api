import User from "../models/User.js";

export async function findUsers(req, res) {
  const { q } = req.query;

  const usersFounded = await User.find({ name: { $regex: q, $options: "i" } });

  return res.status(200).json(usersFounded);
}
