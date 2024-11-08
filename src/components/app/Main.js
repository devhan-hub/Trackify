 import Myday from "../side/Myday"
 import Planned from "../side/Planned"
import {Routes , Route} from 'react-router-dom'
 const Main = () => {
  
   return (
     <div className="flex-1 ">
      <Routes>
       <Route path='/todo/myday' element={<Myday />} />
       <Route path='/todo/important' element={<Myday/>} />
       <Route path='/todo/planned' element={<Planned/>} />
       <Route path='/todo/:catagory' element={<Myday/>} />
       </Routes>
     </div>
   )
 }
 

 export default Main
 