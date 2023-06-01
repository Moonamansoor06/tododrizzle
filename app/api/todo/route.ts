import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { TodoTable, Todo } from '@/lib/drizzle';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { eq } from 'drizzle-orm';

const db = drizzle(sql);

export async function GET(req: NextRequest) {
  try {
    const todos = await db.select().from(TodoTable);
    console.log("process db is", todos);
    return NextResponse.json(todos);
  } catch (error) {
    console.error("Error retrieving todos:", error);
    return NextResponse.json({ error: "Error retrieving todos" });
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("request is ", request);
    const body = await request.json();
    console.log("body is ", body);

    const { name, completed } = body;
    console.log("extracted", name);

    if (name || completed) {
      const newTodo = await db.insert(TodoTable).values({
        name,
        completed,
      })
      .returning();

      return NextResponse.json({ todo: newTodo });
    } else {
      throw new Error("Required fields are missing");
    }
  } catch (error) {
    console.error("Error creating todo:", error);
    return NextResponse.json({ error: (error as { message: string }).message });
  }
}
