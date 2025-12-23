import React from 'react'
import { Outlet } from 'react-router-dom';
// importing Navbar and Footer
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Page_Layout() {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Page_Layout
