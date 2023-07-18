import { NextResponse } from "next/server";
import { connect, disconnect } from "../mongo";

export async function GET(request) {
  const client = connect();
  try {
    const database = client.db("stock");
    const inventory = database.collection("inventory");

    // made slug unique
    // inventory.createIndex(
    //   { slug: 1 },
    //   { unique: true },
    //   function (err, result) {
    //     if (err) {
    //     } else {
    //     }
    //   }
    // );

    const query = {};
    const products = await inventory.find(query).toArray();
    return NextResponse.json({ success: true, products });
  } finally {
    disconnect(client);
  }
}

export async function POST(request) {
  const client = connect();
  try {
    let body = await request.json();
    const database = client.db("stock");
    const inventory = database.collection("inventory");
    const product = await inventory.insertOne(body);
    return NextResponse.json({ product, ok: true });
  } catch (err) {
    return NextResponse.json({}, { status: 400, statusText: err.message });
  } finally {
    disconnect(client);
  }
}
