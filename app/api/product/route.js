import { NextResponse } from "next/server";
import { connect, disconnect } from "../mongo";

export async function GET(request) {
  const client = connect();
  try {
    const database = client.db("stock");
    const inventory = database.collection("inventory");
    const query = {};
    const products = await inventory.find(query).toArray();
    return NextResponse.json({ success: true, products });
  } finally {
    disconnect(client);
  }
}

export async function POST(request) {
  let body = await request.json();
  const client = connect();
  try {
    const database = client.db("stock");
    const inventory = database.collection("inventory");
    const product = await inventory.insertOne(body);
    return NextResponse.json({ product, ok: true });
  } finally {
    disconnect(client);
  }
}
