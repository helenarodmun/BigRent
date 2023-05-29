import { usePage } from '@inertiajs/react';
import NavBar from '../../components/partials/NavBar'
import Sidebar from '../../components/partials/Sidebar';
import FormLogin from '../../components/partials/FormLogin'
export default function InicioSesion() {
    const { auth } = usePage().props;
    return (
        <div style={{ display: 'flex'}}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <NavBar></NavBar>
<FormLogin></FormLogin>
            </div>
        </div>
    );
}
