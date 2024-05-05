import { NextResponse } from 'next/server';
import  {get2AllNews}  from '../../services/get2AllNews';
import data from '../../data2.json';

export async function GET(params:Request) {
  await get2AllNews();
  // return new Response(JSON.stringify(await get2AllNews()));

}

// export async function GET(request: Request) {
//   const {searchParams} = new URL(request.url);

//   const query = searchParams.get('q');

//   let currentPosts = data;

//   if (query) {
//     return NextResponse.json(currentPosts);
//   }
// }