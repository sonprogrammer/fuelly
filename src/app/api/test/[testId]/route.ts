import { NextResponse } from "next/server"

export async function POST(request: Request, {params}: {params: {testId: string}} ){
    const userData = await request.json()
    console.log('server' ,userData)
    console.log('server para', params.testId)

    return NextResponse.json({message: 'succvha;klfhdalsflkds'})
}