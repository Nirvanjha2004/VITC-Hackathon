import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute1() {
    //@ts-expect-error
    const {isAuthenticated}= useSelector((state)=>state.user);
  return (
    
    <div>
        {isAuthenticated? ( <Outlet/> ) : ( <Navigate to='/login'/>) }
    </div>
  )
}


export const  PrivateRoute2=()=>{
  //@ts-expect-error
  const {isAuthenticated}= useSelector((state)=>state.admin);
  return(
    <div>
      {!isAuthenticated? (<Navigate to= '/admin'/>) : ( <Outlet/> )}
    </div>
  )
}

export default PrivateRoute1