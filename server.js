require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.INFOBIP_API_KEY;
const BASE_URL = process.env.INFOBIP_BASE_URL;

app.post("/send-sms", async (req, res) => {
  const { number, message } = req.body;
  try {
    const response = await fetch(`${BASE_URL}/sms/2/text/advanced`, {
      method: "POST",
      headers: {
        Authorization: `App ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [
          {
            from: "InfoSMS",
            destinations: [{ to: `88${number}` }],
            text: message
          }
        ]
      })
    });
    const data = await response.json();
    if (response.ok) return res.json({ success: true, data });
    res.status(response.status).json({ success: false, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));