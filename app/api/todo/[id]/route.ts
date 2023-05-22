import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from "next/server";
import { TodoTable } from '@/lib/drizzle'
import { db } from '@/lib/drizzle'
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
    const req = await request;
  console.log("request object is",req.nextUrl.pathname)
   
    const thePath=req.nextUrl.pathname
    const rid = thePath.substring(thePath.lastIndexOf('/') + 1)
     console.log("id is", rid)
    if(rid){
       

    const todo = await db.select().from(TodoTable).where(eq(TodoTable.id,rid))
   .where(eq(TodoTable.id,rid))  
   
    console.log('todo:', todo);

    return NextResponse.json( todo );
  }
}




export async function PUT(request: NextRequest,apiRequest:NextApiRequest ) {
    const req = await request;
    console.log("request object is",req.nextUrl.pathname)
     
      const thePath=req.nextUrl.pathname
      const rid = thePath.substring(thePath.lastIndexOf('/') + 1)

       console.log("id is",typeof rid)
      if(rid){
    if(apiRequest.body){
    const { name,completed} = apiRequest.body

    if (!name||!completed ) {
      NextResponse.json({ error: 'At least one field is required to update' })
      return
    }
    const updatedTodo = await db.update(TodoTable)
      .set({ name,completed })
      .returning()

    if (updatedTodo.length > 0) {
      NextResponse.json({ todo: updatedTodo[0] })
    } else {
      NextResponse.json({ error: `todo with id ${rid} not found` })
    }
}
}
}
export async function DELETE(request: NextRequest, ) {
    const req = await request;
    console.log("request object is",req.nextUrl.pathname)
     
      const thePath=req.nextUrl.pathname
      const rid = thePath.substring(thePath.lastIndexOf('/') + 1)
            console.log("id is",typeof rid)
      if(rid){
    const deletedTodo = await db.delete(TodoTable).returning().where(eq(TodoTable.id,rid))
    if (deletedTodo.length > 0) {
     NextResponse.json({ book: deletedTodo[0] });
      } else {
       NextResponse.json({ error: 'Todo not found' });
      }}
  }