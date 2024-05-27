'use client'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())
const deleteFetcher = async (url: string) => fetch(url, { method: "DELETE"}).then(r => r.json())

const Page = () => {
    let ProductosArray = [] as Array<producto>

    const { data: ProductosData, error, isLoading, mutate } = useSWR('/api/producto', fetcher)

    if (ProductosData) ProductosArray = ProductosData

    const deleteProducto =(id: number)=>{
        deleteFetcher(`/api/producto?id=${id}`)
        .then((data) => {
                //router.push('/Productos')
        }).catch((e) => {
            
        })
        mutate()
    }
    return (<>
        <div>{
            ProductosArray.map((item, index)=>{
                return <p key={index}>{item.Id} {item.Nombre} {item.Costo} <i onClick={()=>deleteProducto(item.Id)} className='bi bi-trash3-fill'></i></p>
            })
        }</div>
    </>)
}

export default Page

interface producto {
    Id: number,
    Nombre: string,
    Descripcion: string,
    Costo: number
}