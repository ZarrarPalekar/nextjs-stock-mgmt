import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { connect, disconnect } from "../mongo";

export async function GET(request) {
  const query = request.nextUrl.searchParams.get("query");
  const client = connect();
  try {
    const database = client.db("stock");
    const inventory = database.collection("inventory");

    const products = await inventory
      .aggregate([
        {
          $match: {
            $or: [
              { slug: { $regex: query, $options: "i" } }, // Partial matching for name field
            ],
          },
        },
      ])
      .toArray();
    return NextResponse.json({ success: true, products });
  } finally {
    disconnect(client);
  }
}
