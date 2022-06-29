import { Modal, Image } from 'react-bootstrap'
import useBebidas from "../hooks/useBebidas"
import Spinner from "./Spinner"
const ModalBebida = () => {
   const { modal, handleModalClick, receta, cargandoReceta } = useBebidas()
   const { strDrinkThumb, strDrink, strInstructions } = receta
   const mostrarIngredientes = () => {
      let ingredientes = []
      for(let i = 1; i < 16; i++) {
         if( receta[`strIngredient${i}`] ) {
            ingredientes.push(
               <li key={i}>{receta[`strIngredient${i}`]} {receta[`strMeasure${i}`]}</li>
            )
         }
      }
      return ingredientes
   }
   return (
      <Modal show={modal} onHide={handleModalClick}>
         {cargandoReceta ? (
            <Spinner />
         ) : ( <>
            <Image 
               src={strDrinkThumb}
               alt={`Imagen receta ${strDrink}`}
            />
            <Modal.Header>{strDrink}</Modal.Header>
            <Modal.Body>
               <div className="p-3">
                  <h2>Instrucciones</h2>
                  {strInstructions}
                  <h2>Instrucciones y Cantidades</h2>
                  {mostrarIngredientes()}
               </div>
            </Modal.Body>
         </> ) }
      </Modal>
   )
}
export default ModalBebida