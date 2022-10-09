import '../styles/globals.css'
import {Toaster} from 'react-hot-toast'
import { UserContext } from './libs/context';
import { useUserData } from './libs/hooks';

function MyApp({ Component, pageProps }) {

  const userData = useUserData();

  return (
    <>
    <UserContext.Provider value={userData}>
      
      <Component  {...pageProps} />
      <Toaster/>
    </UserContext.Provider>
    </>
  )
}

export default MyApp
