
import NavBar from '../components/partials/NavBar'
import Sidebar from '../components/partials/Sidebar';

export default function Welcome() {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
                <NavBar></NavBar>
            <p className='h1 m-5'>Alquiler de maquinaria</p>
            </div>
    </div>
    );
}
