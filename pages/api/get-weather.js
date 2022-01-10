// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require("axios");

export default async function handler(req, res) {
  const { API_KEY } = process.env;
  req.body.headers["x-rapidapi-key"] = API_KEY;
  const { data } = await axios.request(req.body);
  res.status(200).json(data);
}
