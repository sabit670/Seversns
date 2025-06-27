async function sendSMS() {
  const number = document.getElementById("number").value.trim();
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("status");

  if (!number || !message) {
    status.innerText = "⚠️ নাম্বার এবং মেসেজ দিন!";
    return;
  }

  status.innerText = "⏳ মেসেজ পাঠানো হচ্ছে...";

  // ✅ API Info (Direct Use - Not Secure)
  const API_KEY = "4e48c4751d2c552693a7e777db296cd8-97a7407b-2935-442e-812f-745960507284";
  const BASE_URL = "https://m3gx3w.api.infobip.com";

  const payload = {
    messages: [
      {
        from: "InfoSMS",
        destinations: [{ to: "88" + number }],
        text: message
      }
    ]
  };

  try {
    const response = await fetch(`${BASE_URL}/sms/2/text/advanced`, {
      method: "POST",
      headers: {
        "Authorization": `App ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (response.ok) {
      status.innerText = "✅ মেসেজ সফলভাবে পাঠানো হয়েছে!";
    } else {
      status.innerText = "❌ মেসেজ ব্যর্থ: " + JSON.stringify(result);
    }

  } catch (error) {
    console.error(error);
    status.innerText = "❌ ইন্টারনাল সার্ভার সমস্যা হয়েছে।";
  }
}
