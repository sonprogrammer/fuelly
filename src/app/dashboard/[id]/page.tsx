export default async function Page({params}: {params: {id: string}}) {
    const { id } = await params
    const res = await fetch('http://localhost:3000/api/test')
    const data = await res.json()

    return <>Dynamic route {id}{data}</>
    
}