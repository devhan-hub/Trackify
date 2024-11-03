 import Myday from "../side/Myday"
 import Planned from "../side/Planned"
import { useSelector  } from "react-redux"


 import TodoDisplay from './TodoDisplay'
 const Main = () => {
  const typeSelecter = useSelector(state => state.typeCatagory.type)
  
   return (
     <div className="flex-1 ">
      
      {typeSelecter ==='myday'  &&  <Myday/>}
      {typeSelecter ==='taskes'  &&  <Myday/>}
      {typeSelecter ==='important'  &&  <Myday/>}
       {typeSelecter ==='planned' && <Planned/>}
     </div>
   )
 }
 

 export default Main
 