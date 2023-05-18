import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from "next/server";
import { AuthorTable } from '@/lib/drizzle'
import { db } from '@/lib/drizzle'
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
    const req = await request;
  console.log("request object is",req.nextUrl.pathname)
   
    const thePath=req.nextUrl.pathname
    const idstr = thePath.substring(thePath.lastIndexOf('/') + 1)
    const rid =parseInt(idstr,10)
     console.log("id is",typeof rid)
    if(rid){
       

    const author = await db.select().from(AuthorTable).where(eq(AuthorTable.id,rid))
   .where(eq(AuthorTable.id,rid))  
   
    console.log('Author:', author);

    return NextResponse.json( author );
  }
}




export async function PUT(request: NextRequest,apiRequest:NextApiRequest ) {
    const req = await request;
    console.log("request object is",req.nextUrl.pathname)
     
      const thePath=req.nextUrl.pathname
      const idstr = thePath.substring(thePath.lastIndexOf('/') + 1)
      const rid =parseInt(idstr,10)
       console.log("id is",typeof rid)
      if(rid){
    if(apiRequest.body){
    const { authorname} = apiRequest.body

    if (!authorname ) {
      NextResponse.json({ error: 'At least one field is required to update' })
      return
    }
    const updatedAuthor = await db.update(AuthorTable)
      .set({ authorname })
      .returning()

    if (updatedAuthor.length > 0) {
      NextResponse.json({ book: updatedAuthor[0] })
    } else {
      NextResponse.json({ error: `Author with id ${rid} not found` })
    }
}
}
}
export async function DELETE(request: NextRequest, ) {
    const req = await request;
    console.log("request object is",req.nextUrl.pathname)
     
      const thePath=req.nextUrl.pathname
      const idstr = thePath.substring(thePath.lastIndexOf('/') + 1)
      const rid =parseInt(idstr,10)
       console.log("id is",typeof rid)
      if(rid){
    const deletedAuthor = await db.delete(AuthorTable).returning().where(eq(AuthorTable.id,rid))
    if (deletedAuthor.length > 0) {
     NextResponse.json({ book: deletedAuthor[0] });
      } else {
       NextResponse.json({ error: 'Author not found' });
      }}
  }