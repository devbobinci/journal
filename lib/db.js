import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.3xv3wdi.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
  );

  return client;
}
