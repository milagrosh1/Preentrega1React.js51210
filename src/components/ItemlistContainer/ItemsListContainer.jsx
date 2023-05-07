import { useState, useEffect } from 'react'
//import { getProductos, getProductosPorCategoria } from '../../AsynMock'
import ItemList from '../ItemList/ItemList';
import { useParams } from 'react-router-dom';
//importamos nuevas funciones: 
import {collection, getDocs, where, query} from "firebase/firestore";
import { db } from '../../Services/firebase/config';

const ItemListContainer = ({ greeting }) => {

    const [productos, setProductos] = useState([]);

    const {idCategoria} = useParams();

    useEffect( ()=> {
        const misProductos = idCategoria ? query(collection(db, "productos"), where("idCat", "==", idCategoria)): collection(db, "productos");

        getDocs(misProductos)
            .then(res=> {
                const nuevosProductos = res.docs.map( doc => {
                    const data = doc.data()
                    return {id:doc.id, ...data}
                })
                setProductos(nuevosProductos);
            })
            .catch(error => console.log(error))
    },[idCategoria])



    /*useEffect(() => {

        const funcionProductos = idCategoria ? getProductosPorCategoria : getProductos;

        funcionProductos(idCategoria)
            .then(res => setProductos(res))
            .catch(error => console.error(error))
    }, [idCategoria])*/


    return (
        <>
            <h2 style={{ textAlign: "center" }}> {greeting} </h2>
            <ItemList productos={productos} />
        </>
    )
}

export default ItemListContainer