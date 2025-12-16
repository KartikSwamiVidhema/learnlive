// pages/api/demo-request.js

let demoRequests = [];  // This will keep data in-memory (reset on server reload)

export default function handler(req, res) {
    if (req.method === "POST") {
        const { phone, name, email, budget, businesstype } = req.body;

        // Basic validation
        if (!phone || !name || !email) {
            return res.status(400).json({ error: "Missing fields" });
        }

        // Save the submission in memory
        demoRequests.push({ phone, name, email, budget, businesstype, submittedAt: new Date() });

        console.log("Saved demo request:", demoRequests);
        console.log(demoRequests)
        return res.status(200).json({ message: "Demo request saved." });
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}