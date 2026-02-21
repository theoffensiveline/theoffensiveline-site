const axios = require("axios");

const ESPN_ALLOWED_BASE =
  "https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/";

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Max-Age", "86400");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url, espn_s2, swid } = req.body;

  if (!url || !espn_s2 || !swid) {
    return res
      .status(400)
      .json({ error: "Missing required fields: url, espn_s2, swid" });
  }

  if (!url.startsWith(ESPN_ALLOWED_BASE)) {
    return res
      .status(400)
      .json({ error: "URL must be an ESPN fantasy API URL" });
  }

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `espn_s2=${espn_s2}; SWID=${swid};`,
      },
      withCredentials: false,
    });

    res.status(200).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { error: "Failed to fetch from ESPN" };
    res.status(status).json(data);
  }
};
