import Header from './Header';
import SideBar from './Sidebar';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <SideBar />
            <div>{children}</div>
        </div>
    );
}

export default DefaultLayout;
