export const sendDiscordNotification = async (submissionData, channel) => {
  try {
    let webhookUrl;
    if (channel === "submissions") {
      webhookUrl = process.env.REACT_APP_DISCORD_WEBHOOK_SUBMISSIONS;
    } else if (channel === "general") {
      webhookUrl = process.env.REACT_APP_DISCORD_WEBHOOK_GENERAL;
    }

    if (!webhookUrl) {
      console.error(
        "Discord webhook URL not configured in environment variables"
      );
      return;
    }

    // Use a CORS proxy service
    const corsProxyUrl = "https://corsproxy.io/?";
    const response = await fetch(
      corsProxyUrl + encodeURIComponent(webhookUrl),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: submissionData.name,
          content: submissionData.content,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Discord webhook failed with status: ${response.status}`);
    }

    console.log("Discord notification sent successfully");
  } catch (error) {
    console.error("Error sending Discord notification:", error);
    throw error;
  }
};
