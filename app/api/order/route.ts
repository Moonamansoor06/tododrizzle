import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from "next/server";
import {  OrderTable } from "@/lib/drizzle";
import { drizzle, } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres'
import { eq } from 'drizzle-orm'


const db=drizzle(sql)
export async function GET(req: NextRequest,) {


    const order = await db.select().from(OrderTable)
    console.log("process db is",order)
    return NextResponse.json({order} )

  } 

  export async function POST(request:NextRequest,req: NextApiRequest) {
  
    const { bookid,customerid,authorid,qty } = req.body

    if (!bookid || !customerid || !authorid || !qty ) {
      NextResponse.json({ error: 'Missing required fields' })
      return
    }

    const newOrder = await db.insert(OrderTable).values({
      bookid,customerid,authorid,qty
    }).returning()

    NextResponse.json({ order: newOrder })
  }
 