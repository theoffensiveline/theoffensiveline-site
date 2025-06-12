const axios = require("axios");

module.exports = async (req, res) => {
  // Handle OPTIONS request for CORS preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Max-Age", "86400");
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { webhookUrl, username, content } = req.body;

    if (!webhookUrl || !username || !content) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    // Validate that the webhook URL is from Discord
    if (!webhookUrl.startsWith("https://discord.com/api/webhooks/")) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(400).json({ error: "Invalid webhook URL" });
      return;
    }

    await axios.post(webhookUrl, {
      username,
      content,
    });

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error in Discord webhook:", error);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).json({ error: "Failed to send Discord notification" });
  }
};
