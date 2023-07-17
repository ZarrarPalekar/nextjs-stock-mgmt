import { MongoClient } from "mongodb";

export function connect() {
  const uri = process.env.MONGO_URI;
  return new MongoClient(uri);
}

export async function disconnect(client) {
  await client.close();
}
