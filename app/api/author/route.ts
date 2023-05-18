import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from "next/server";
import {  AuthorTable } from "@/lib/drizzle";
import { drizzle, } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres'
import { eq } from 'drizzle-orm'


const db=drizzle(sql)
export async function GET(req: NextRequest,) {


    const authors = await db.select().from(AuthorTable)
    console.log("process db is",authors)
    return NextResponse.json(authors )

  } 

  export async function POST(request:NextRequest,req: NextApiRequest) {
  
    const {authorname } = req.body

    if (!authorname ) {
      NextResponse.json({ error: 'Missing required fields' })
      return
    }

    const newAuthor = await db.insert(AuthorTable).values({
      authorname
    })
    .returning()

    NextResponse.json({ author: newAuthor })
  }