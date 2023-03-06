import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    // "mongodb+srv://journal-boi:a7eqfTKEOjq5KMu3@cluster0.3xv3wdi.mongodb.net/journal?retryWrites=true&w=majority",
    `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.3xv3wdi.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
  );

  return client;
}
