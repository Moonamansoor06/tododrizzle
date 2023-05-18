import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from "next/server";
import {  BooksTable } from "@/lib/drizzle";
import { drizzle, } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres'
import { eq } from 'drizzle-orm'

type Book = {
  id: number
  bookname: string
  booktype: string
  author: string
  qty: number
  price: number
  isbn: string
  createdAt: Date
}

const db=drizzle(sql)
export async function GET(req: NextRequest,) {


    const books = await db.select().from(BooksTable)
    console.log("process db is",books)
    return NextResponse.json(books )

  } 

  export async function POST(request:NextRequest,req: NextApiRequest) {
  
    const { bookname, booktype, author, qty, price, isbn } = req.body

    if (!bookname || !booktype || !author || !qty || !price || !isbn) {
      NextResponse.json({ error: 'Missing required fields' })
      return
    }

    const newBook = await db.insert(BooksTable).values({
      bookname,
      booktype,
      author,
      qty,
      price,
      isbn,
    }).returning()

    NextResponse.json({ book: newBook })
  }
  