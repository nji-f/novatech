export default async function handler(req, res) {
  const { prompt } = req.body;

  // Memanggil API z.ai (Zapier Central / AI provider lainnya)
  const response = await fetch("https://api.z.ai/v1/chat/completions", { // Sesuaikan URL endpoint z.ai kamu
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.ZAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", // Sesuaikan model yang tersedia di z.ai
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
