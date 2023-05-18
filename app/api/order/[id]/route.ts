import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from "next/server";
import { OrderTable } from '@/lib/drizzle'
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
       

    const order = await db.select().from(OrderTable)
   .where(eq(OrderTable.orderid,rid))  
   
    console.log('order:', order);

    return NextResponse.json( order );
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
    const { bookid,customerid,qty } = apiRequest.body

    if (!bookid && !customerid && !qty) {
      NextResponse.json({ error: 'At least one field is required to update' })
      return
    }
    const updatedOrder = await db.update(OrderTable)
      .set({ bookid,customerid,qty })
      .returning()

    if (updatedOrder.length > 0) {
      NextResponse.json({ order: updatedOrder[0] })
    } else {
      NextResponse.json({ error: `order with id ${rid} not found` })
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
    const deletedOrder = await db.delete(OrderTable).returning()

    if (deletedOrder.length > 0) {
     NextResponse.json({ order: deletedOrder[0] });
      } else {
       NextResponse.json({ error: 'Order not found' });
      }}
  }