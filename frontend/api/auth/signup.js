export default function handler(req, res) {
  if (req.method === "POST") {
    // Your signup logic here (e.g., save user, return token, etc.)
    res.status(201).json({ message: "Signup successful" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}