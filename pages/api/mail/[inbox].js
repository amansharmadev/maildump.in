import db from "../../../utils/db";
import Mail from "../../../models/Mail";
import Log from "../../../models/Log";

const headers = {
    "Access-Control-Allow-Origin": "https://theamansharma.com",
    "Access-Control-Allow-Headers": "Content-Type",
};

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(404).send();
    }
    if (req.method === "OPTIONS") return { statusCode: 200, headers };

    await db();

    const mails = await Mail.find({ _inbox: req.query.inbox })
        .sort({ createdAt: -1 })
        .limit(10);

    res.send(mails);

    /**
     * Logging which inboxs are viewed most
     */
    Log.create({
        to: req.query.inbox,
        type: "view",
    });
}
