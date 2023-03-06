import { connectDatabase } from "../../../lib/db";
import { hashPassword } from "../../../lib/password";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res
        .status(422)
        .json({ message: "Invalid email or password-(min 8 characters)" });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const client = await connectDatabase();
    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser) {
      res.status(422).json({ message: "User with this e-mail already exists" });
      client.close();
      return;
    }

    // const result = await db
    //   .collection("users")
    //   .insertOne({ email: email, password: hashedPassword });

    res.status(201).json({ message: "User created successfully" });

    client.close();
  }
}
