import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from "next/server";
import {  CustomerTable } from "@/lib/drizzle";
import { drizzle, } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres'
import { eq } from 'drizzle-orm'

const db=drizzle(sql)
export async function GET(req: NextRequest,) {


    const customer = await db.select().from(CustomerTable)
    console.log("process db is",customer)
    return NextResponse.json({customer} )

  } 

  export async function POST(request:NextRequest,req: NextApiRequest) {
  
    const { customername,customeremail} = req.body

    if (!customername || !customeremail ) {
      NextResponse.json({ error: 'Missing required fields' })
      return
    }

    const newCustomer = await db.insert(CustomerTable).values({
      customername,
      customeremail
    }).returning()

    NextResponse.json({ customer: newCustomer })
  }
  