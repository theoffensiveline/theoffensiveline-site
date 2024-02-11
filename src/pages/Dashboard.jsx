import React, { useState } from "react";
import { Header, Sidebar, MainContent, Footer } from "../components/dashboard";

const Dashboard = () => {
    // State to keep track of the current page
    const [currentPage, setCurrentPage] = useState('home'); // 'home', 'analytics', 'settings', etc.

    // Function to handle changing the current page
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="dashboard">
            <Header />
            <div className="dashboard-content">
                <Sidebar onPageChange={handlePageChange} />
                <MainContent currentPage={currentPage} />
            </div>
            <Footer currentPage={currentPage} onPageChange={handlePageChange} />
            <style jsx>{`
        .dashboard {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }

        .dashboard-content {
          display: flex;
          flex: 1;
        }
      `}</style>
        </div>
    );
};

export default Dashboard