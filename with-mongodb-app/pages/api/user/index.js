
export default function handler(req, res) {
  // Get data from your database
  // if (!req.user) return res.json({ user: null });
  // const { password, ...user } = req.user;
  res.status(200).json({ user: {name: 'jihye'} });
}