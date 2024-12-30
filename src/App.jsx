import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './layout/Navbar';
import Login from './pages/Login';
import Upload from './pages/Upload';

const App = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route element={<AppLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/upload" element={<Upload />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

function AppLayout() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/upload" element={<Upload />} />
            </Routes>
        </>
    );
}

export default App;