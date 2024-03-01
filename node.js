const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // Import the 'node-fetch' library

const app = express();
const port = process.env.PORT || 3000;

// Body parser middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors());

// Discord Webhook URL - Replace 'YOUR_DISCORD_WEBHOOK_URL' with your actual webhook URL
const discordWebhookUrl = 'https://discord.com/api/webhooks/1212254616004071484/yOJzKZKSQRZrBMg0W48Yy6DX2Td0y_POMQ0zWDTUBy_Jhw4-hC6DRdixjh7k-D9YAyAc';

// Middleware to log requests and send a Discord webhook
app.use(async (req, res, next) => {
    console.log('----------------- Incoming Request -----------------');
    console.log(`Request Method: ${req.method}`);
    console.log(`Request URL: ${req.originalUrl}`);
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);
    console.log('----------------------------------------------------');

    // Send a Discord webhook message
    try {
        await sendDiscordWebhook(req);
        console.log('Discord webhook sent successfully!');
    } catch (error) {
        console.error('Error sending Discord webhook:', error);
    }

    // Continue to the next middleware
    next();
});

// Your API endpoint
app.post('/log-download', (req, res) => {
    // Handle the request and log any necessary information
    const downloadLink = req.body.downloadLink;

    // Log or process the downloadLink as needed
    console.log(`Download Link: ${downloadLink}`);

    // Respond to the client if needed
    res.status(200).send('Download logged successfully');
});

// Function to send Discord webhook
async function sendDiscordWebhook(req) {
    const payload = {
        content: `New request:\n\`\`\`${JSON.stringify(req, null, 2)}\`\`\``,
    };

    await fetch(discordWebhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});