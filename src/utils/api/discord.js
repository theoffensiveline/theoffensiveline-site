import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export const sendDiscordNotification = async (submissionData, channel) => {
  try {
    let webhookUrl;

    // Get the config document from Firestore
    const configDoc = await getDoc(doc(db, "config", "discord"));
    if (!configDoc.exists()) {
      console.error("Discord config not found in Firestore");
      return;
    }

    const config = configDoc.data();
    if (channel === "submissions") {
      webhookUrl = config.submissionsUrl;
    } else if (channel === "general") {
      webhookUrl = config.leaderboardUrl;
    }

    if (!webhookUrl) {
      console.error("Discord webhook URL not configured in Firestore");
      return;
    }

    const webhookServiceUrl = config.webhookServiceUrl;
    if (!webhookServiceUrl) {
      console.error("Webhook service URL not configured in Firestore");
      return;
    }

    const response = await fetch(webhookServiceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        webhookUrl,
        username: submissionData.name,
        content: submissionData.content,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Discord notification sent successfully");
  } catch (error) {
    console.error("Error sending Discord notification:", error);
    throw error;
  }
};
