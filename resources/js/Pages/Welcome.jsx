
import { usePage } from '@inertiajs/react';
import NavBar from '../components/partials/NavBar'
import Sidebar from '../components/partials/Sidebar';
export default function Welcome() {
    const { auth } = usePage().props;
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
                <NavBar></NavBar>
           
            </div>
    </div>
    );
}
