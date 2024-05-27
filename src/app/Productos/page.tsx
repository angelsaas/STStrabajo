'use client'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())
const deleteFetcher = async (url: string) => fetch(url, { method: "DELETE"}).then(r => r.json())

const Page = () => {
    const router = useRouter()

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

    const detailsProducto =(id: number)=>{
        router.push(`/Productos/${id}`)
    }


    return (<>
        <div>{
            ProductosArray.map((item, index)=>{
                return <p key={index}>
                    {item.Id} {item.Nombre} {item.Costo} 
                    <i onClick={()=>deleteProducto(item.Id)} className='m-4 bi bi-trash3-fill'></i>
                    <i onClick={()=>detailsProducto(item.Id)} className='m-4 bi bi-pencil-square'></i>
                    
                    </p>
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