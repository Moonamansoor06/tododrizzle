import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from "next/server";
import {  TodoTable } from "@/lib/drizzle";
import { drizzle, } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres'
import { eq } from 'drizzle-orm'


const db=drizzle(sql)
export async function GET(req: NextRequest,) {


    const todos = await db.select().from(TodoTable)
    console.log("process db is",todos)
    return NextResponse.json(todos )

  } 

  export async function POST(request:NextRequest,req: NextApiRequest) {
  
    const {name,completed } = req.body

    if (!name||!completed ) {
      NextResponse.json({ error: 'Missing required fields' })
      return
    }

    const newTodo = await db.insert(TodoTable).values({
      name,
      completed
    })
    .returning()

    NextResponse.json({ author: newTodo })
  }