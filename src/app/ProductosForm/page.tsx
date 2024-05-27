'use client'
import { Field, Form, Formik, FormikProps, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { number, object, string } from 'yup';
import { productoFormDto, productodto } from "../api/producto/producto.dto";

const addFetcher = async (url: string, data: productodto) => fetch(url, { method: "POST", body: JSON.stringify(data) }).then(r => r.json())
const getFetch = async (url: string) => fetch(url, { method: "GET" }).then(r => r.json())

const Add = () => {

    const router = useRouter()
    const formTicket = {
        Id: '',
        Nombre: '',
        Descripcion: '',
        Costo:''
    } as productoFormDto

    const submitAdd = async (values: productoFormDto) => {
        let newProducto = {
            Id: parseInt(values.Id),
            Nombre: values.Nombre,
            Descripcion: values.Descripcion,
            Costo: parseFloat(values.Costo),
        } as productodto

        console.log(newProducto)
        
        addFetcher('/api/producto', newProducto)
        .then((data) => {
            //router.push('/Productos')
        }).catch((e) => {

        })

    }
    return (<>
        <div style={{ height: '100vh' }} className="container">
            <div className="row d-flex justify-content-center">
                <div className="">
                    <div className="h4">Producto</div>
                    <Formik
                        initialValues={formTicket}
                        onSubmit={submitAdd}
                        validationSchema={addTicketSchema}
                    >
                        {
                            (props: FormikProps<any>) => (
                                <Form>
                                    <label>Id</label>
                                    <Field
                                        name="Id"
                                        className="form-control"
                                    ></Field>
                                    <ErrorMessage name="Id">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>

                                    <label>Nombre</label>
                                    <Field
                                        name="Nombre"
                                        className="form-control"
                                    ></Field>
                                    <ErrorMessage name="Nombre">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>
                                    
                                    <label>Descripcion</label>
                                    <Field
                                        name="Descripcion"
                                        className="form-control"
                                    ></Field>
                                    <ErrorMessage name="Descripcion">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>
                                    
                                    <label>Costo</label>
                                    <Field
                                        name="Costo"
                                        className="form-control"
                                    ></Field>
                                    <ErrorMessage name="Costo">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>
                                    
                                    <div className="row d-flex justify-content-center">
                                        <button type="submit" className="btn btn-primary col-8">Agregar</button>
                                    </div>
                                </Form>
                            )
                        }

                    </Formik>
                </div>
            </div>
        </div>
    </>)
}

export default Add


const addTicketSchema = object({
    Id: number().required('Campo Requerido').typeError('Tipo de dato no valido'),
    Nombre: string().required('Campo Requerido'),
    Descripcion: string().required('Campo Requerido'),
    Costo: number().min(1, 'Valor requerido positivo').typeError('Tipo de valor no valido').required('Campo Requerido')
})