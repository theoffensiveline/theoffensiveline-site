export const Header = () => {
    return (
        <header className="dashboard-header">
            <h1>Dashboard Title</h1>
            <style jsx>{`
        .dashboard-header {
          background-color: #007bff;
          color: #fff;
          padding: 20px;
          text-align: center;
        }

        h1 {
          margin: 0;
          font-size: 24px;
          font-weight: bold;
        }
      `}</style>
        </header>
    );
};

export const Footer = ({ currentPage, onPageChange }) => {
    return (
        <footer className="dashboard-footer">
            <div className="bottom-navigation">
                <button className={currentPage === 'home' ? 'active' : ''} onClick={() => onPageChange('home')}>Home</button>
                <button className={currentPage === 'analytics' ? 'active' : ''} onClick={() => onPageChange('analytics')}>Analytics</button>
                <button className={currentPage === 'settings' ? 'active' : ''} onClick={() => onPageChange('settings')}>Settings</button>
            </div>
            <style jsx>{`
        .dashboard-footer {
          width: 100%;
          background-color: #f0f0f0;
          padding: 8px;
          box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
          position: fixed;
          bottom: 0;
          left: 0;
          z-index: 1000;
        }

        .bottom-navigation {
          display: flex;
          justify-content: center;
        }

        .bottom-navigation button {
          background-color: transparent;
          border: none;
          padding: 10px 20px;
          margin: 0 10px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .bottom-navigation button.active {
          background-color: #007bff;
          color: #fff;
          border-radius: 5px;
        }

        .bottom-navigation button:hover {
          background-color: #e9ecef;
        }
      `}</style>
        </footer>
    );
};

export const Sidebar = ({ onPageChange }) => {
    return (
        <aside className="dashboard-sidebar">
            <ul>
                <li onClick={() => onPageChange('home')}>Home</li>
                <li onClick={() => onPageChange('analytics')}>Analytics</li>
                <li onClick={() => onPageChange('settings')}>Settings</li>
            </ul>
            <style jsx>{`
        .dashboard-sidebar {
          max-width: 150px;
          width: 15%; /* Adjust the width according to your design */
          background-color: #f0f0f0;
        }

        ul {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }

        li {
          padding: 10px;
          cursor: pointer;
        }

        li:hover {
          background-color: #ddd;
        }
      `}</style>
        </aside>
    );
};

export const MainContent = ({ currentPage }) => {
    // Define content for each page
    const pageContent = {
        home: <div>Home Page Content</div>,
        analytics: <div>Analytics Page Content</div>,
        settings: <div>Settings Page Content</div>
    };

    return (
        <main className="dashboard-main">
            {pageContent[currentPage]}
        </main>
    );
}