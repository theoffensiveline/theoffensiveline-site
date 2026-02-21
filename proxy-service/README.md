# Discord Webhook Service

A serverless API service that forwards messages to Discord webhooks. This service is deployed on Vercel and provides a simple way to send notifications to Discord channels.

## Features

- CORS enabled for cross-origin requests
- Input validation for webhook URLs
- Error handling and logging
- Simple POST endpoint for sending messages

## Usage

### API Endpoint

```
POST /api/webhook
```

### Request Body

The request body should be a JSON object with the following fields:

```json
{
  "webhookUrl": "https://discord.com/api/webhooks/your-webhook-url",
  "username": "Sender Name",
  "content": "Your message content"
}
```

### Example Request

```javascript
const response = await fetch(
  "https://your-vercel-domain.vercel.app/api/webhook",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      webhookUrl: "https://discord.com/api/webhooks/your-webhook-url",
      username: "Notification Bot",
      content: "Hello from the webhook service!",
    }),
  }
);

const data = await response.json();
```

### Response

#### Success (200 OK)

```json
{
  "success": true
}
```

#### Error Responses

- 400 Bad Request: Missing required fields or invalid webhook URL
- 405 Method Not Allowed: Only POST requests are accepted
- 500 Internal Server Error: Failed to send Discord notification

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Deploy to Vercel:
   ```bash
   vercel
   ```

## Environment Variables

No environment variables are required for basic functionality. The service is designed to be stateless and accepts the webhook URL as part of the request payload.

## Security Notes

- Always use HTTPS for your webhook URLs
- The service validates that webhook URLs are from Discord's domain
- CORS is enabled to allow cross-origin requests
