import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingMenu from './FloatingMenu';

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
            <Navbar />
            <main className="flex-grow pt-20">
                <Outlet />
            </main>
            <FloatingMenu />
            <Footer />
        </div>
    );
}
