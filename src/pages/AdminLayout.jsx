import { useState } from 'react';
import Sidebar from '../components/sidebar';
import Dashboard from '../components/Dashboard';  
import TrainerApplicationsReview from '../components/TrainerApplicationsReview';
import '../style/AdminLayout.css';

export default function AdminLayout({ role = 'adminContent' }) {
  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem('adminCurrentPage') || 'dashboard';
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    localStorage.setItem('adminCurrentPage', page);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'pt-applications':
        return <TrainerApplicationsReview />;
  
      // default:
      //   return <Dashboard />;
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar role={role} currentPage={currentPage} onPageChange={handlePageChange} />
      <div className="admin-main-content">
        {renderContent()}
      </div>
    </div>
  );
}
