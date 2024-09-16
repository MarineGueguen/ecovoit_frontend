import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar/NavBar'

type Props = {
  token: string;
  setToken: () => void;
}

const MainLayout = ({ token, setToken }: Props) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <NavBar token={token} setToken={setToken} />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout