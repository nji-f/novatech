export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { prompt } = req.body;

    // Endpoint resmi dari apifree.ai
    const response = await fetch("https://api.apifree.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.APIFREE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-v3", // Sesuai dengan model yang kamu pilih
        messages: [
          { role: "system", content: "Kamu adalah asisten AI yang cerdas." },
          { role: "user", content: prompt }
        ],
        stream: false
      })
    });

    const data = await response.json();
    
    // Kirim hasil ke frontend
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Gagal menghubungi APIfree", detail: error.message });
  }
}
