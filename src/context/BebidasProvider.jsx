import axios from "axios"
import { useState, useEffect, createContext } from 'react'
const BebidasContext = createContext() 

const BebidasProvider = ({children}) => {
   const [bebidas, setBebidas] = useState([]);
   const [modal, setModal] = useState(false);
   const [bebidaId, setBebidaId] = useState(null);
   const [receta, setReceta] = useState({});
   const [cargandoReceta, setCargandoReceta] = useState(false);
   const [cargandoListado, setCargandoListado] = useState(false);

   useEffect(() => {
      setCargandoReceta(true)
      const obtenerReceta = async () => {
         if(!bebidaId) return
         try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`
            const { data } = await axios(url)
            setReceta(data.drinks[0]);
         } catch (error) {
            console.log(error);
         } finally {
            setCargandoReceta(false)
         }
      }
      obtenerReceta()       
   }, [bebidaId]);
   const consultarBebidas = async datos => {
      setCargandoListado(true)
      try {
         const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`
         const { data } = await axios(url)
         setBebidas(data.drinks);
      } catch (error) {
         console.log(error);
      } finally {
         setCargandoListado(false)
      }
   }
   const handleModalClick = () => {
      setModal(!modal)
   }
   const handleBebidaIdClick = id => {
      setBebidaId(id)
   }
   return (
      <BebidasContext.Provider
         value={{
            consultarBebidas,
            bebidas,
            modal,
            handleModalClick,
            handleBebidaIdClick,
            receta,
            cargandoReceta,
            cargandoListado
         }}
      >{children}</BebidasContext.Provider>
   )
}
export {
   BebidasProvider
}
export default BebidasContext