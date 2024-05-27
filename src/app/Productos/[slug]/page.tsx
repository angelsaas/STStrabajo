'use client'
import { productodto } from "@/app/api/producto/producto.dto"
import useSWR from "swr"
const fetcher = (url: string) => fetch(url).then(r => r.json())

const Page =({ params }: { params: { slug: string } })=>{
    const id = params.slug

    let productoDetails : productodto ={
        Id: 0,
        Descripcion: '',
        Nombre: '',
        Costo: 0
    }
    const { data: ProductosData, error, isLoading, mutate } = useSWR(`/api/producto/${id}`, fetcher)

    if(ProductosData) productoDetails = ProductosData

    return (<>
        <h1>Detalles del Producto: {productoDetails.Nombre}</h1>
    
    </>)
}

export default Page