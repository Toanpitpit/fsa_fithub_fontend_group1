import { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Search, 
  User,
  Calendar,
  FileText,
  Link as LinkIcon
} from 'lucide-react';
import '../style/TrainerApplicationsReview.css';

export default function TrainerApplicationsReview() {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view'); 
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [rejectFeedback, setRejectFeedback] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

  // Mock data theo schema - thay bằng API call thực tế
  useEffect(() => {
    const mockApplications = [
      { id: 1, user_id: 101, name: 'Nguyễn Văn An',  qualifications: 'ISSA CPT; FNS', experience_details: '5 năm làm PT, 120+ học viên.', document_urls: [{ label: 'CV.pdf', url: 'https://example.com/cv-a.pdf' }], status: 'pending', admin_feedback: null, created_at: '2024-01-15T08:00:00Z', updated_at: '2024-01-15T08:00:00Z', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
      { id: 2, user_id: 102, name: 'Trần Thị Bích', qualifications: 'NASM CPT', experience_details: '3 năm dẫn lớp HIIT, Strength.', document_urls: [], status: 'pending', admin_feedback: null, created_at: '2024-01-14T07:00:00Z', updated_at: '2024-01-14T07:00:00Z', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
      { id: 3, user_id: 103, name: 'Lê Văn Cường', username: 'levancuong', qualifications: 'ACSM CPT; S&C', experience_details: '7 năm Strength.', document_urls: [], status: 'approved', admin_feedback: 'Hồ sơ xuất sắc!', created_at: '2024-01-13T09:30:00Z', updated_at: '2024-01-13T10:00:00Z', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
      { id: 4, user_id: 104, name: 'Phạm Thị Dung', username: 'phamthidung', qualifications: 'Basic Fitness Certificate', experience_details: null, document_urls: [], status: 'rejected', admin_feedback: 'Thiếu kinh nghiệm tối thiểu 1 năm.', created_at: '2024-01-12T06:00:00Z', updated_at: '2024-01-12T06:15:00Z', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
      { id: 5, user_id: 105, name: 'Đỗ Minh Em', username: 'dominhem', qualifications: 'ACE CPT', experience_details: '2 năm PT cá nhân.', document_urls: [], status: 'pending', admin_feedback: null, created_at: '2024-01-11T06:00:00Z', updated_at: '2024-01-11T06:15:00Z', avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=100&h=100&fit=crop' },
      { id: 6, user_id: 106, name: 'Phan Hà Vy', username: 'phanhavy', qualifications: 'CrossFit L1', experience_details: 'HLV CrossFit 1 năm.', document_urls: [], status: 'pending', admin_feedback: null, created_at: '2024-01-10T06:00:00Z', updated_at: '2024-01-10T06:15:00Z', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' }
    ];
    setApplications(mockApplications);
    setFilteredApplications(mockApplications);
  }, []);

  // Filter + Search
  useEffect(() => {
    let filtered = applications;

    if (filterStatus !== 'all') {
      filtered = filtered.filter(app => app.status === filterStatus);
    }

    if (searchTerm) {
      const keyword = searchTerm.toLowerCase();
      filtered = filtered.filter(app =>
        (app.name || '').toLowerCase().includes(keyword) ||
        (app.username || '').toLowerCase().includes(keyword)
      );
    }

    setFilteredApplications(filtered);
    setPage(1); // reset page khi filter/search
  }, [searchTerm, filterStatus, applications]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(filteredApplications.length / pageSize)), [filteredApplications, pageSize]);
  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredApplications.slice(start, start + pageSize);
  }, [filteredApplications, page, pageSize]);

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setRejectFeedback('');
    setModalMode('view');
    setShowModal(true);
  };

  const handleRejectClick = (application) => {
    setSelectedApplication(application);
    setRejectFeedback(application.admin_feedback || '');
    setModalMode('reject');
    setShowModal(true);
  };

  const handleApprove = async (id) => {
    setApplications(prev => prev.map(app =>
      app.id === id ? { ...app, status: 'approved', updated_at: new Date().toISOString() } : app
    ));
    setShowModal(false);
    alert('Application approved successfully!');
  };

  const handleReject = async (id, feedback) => {
    const trimmed = (feedback || '').trim();
    if (!trimmed) {
      alert('Please enter rejection reason/feedback.');
      return;
    }
    setApplications(prev => prev.map(app =>
      app.id === id ? { ...app, status: 'rejected', admin_feedback: trimmed, updated_at: new Date().toISOString() } : app
    ));
    setShowModal(false);
    alert('Application rejected.');
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'Pending', class: 'status-pending' },
      approved: { label: 'Approved', class: 'status-approved' },
      rejected: { label: 'Rejected', class: 'status-rejected' }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return <span className={`status-badge ${config.class}`}>{config.label}</span>;
  };

  const goPrev = () => setPage(p => Math.max(1, p - 1));
  const goNext = () => setPage(p => Math.min(totalPages, p + 1));

  return (
    <div className="trainer-applications-container">
      <div className="applications-header">
        <div>
          <h1 className="page-title gradient-text">Review Trainer Applications</h1>
          <p className="page-subtitle">Manage trainer registration requests by status and timeline</p>
        </div>
      </div>

      <div className="applications-filters gradient-card">
        <div className="search-box">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-buttons">
          <button className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`} onClick={() => setFilterStatus('all')}>All ({applications.length})</button>
          <button className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`} onClick={() => setFilterStatus('pending')}>Pending ({applications.filter(a => a.status === 'pending').length})</button>
          <button className={`filter-btn ${filterStatus === 'approved' ? 'active' : ''}`} onClick={() => setFilterStatus('approved')}>Approved ({applications.filter(a => a.status === 'approved').length})</button>
          <button className={`filter-btn ${filterStatus === 'rejected' ? 'active' : ''}`} onClick={() => setFilterStatus('rejected')}>Rejected ({applications.filter(a => a.status === 'rejected').length})</button>
        </div>
      </div>

      {/* Table */}
      <div className="applications-table-wrapper">
        <table className="applications-table">
          <thead>
            <tr>
              <th style={{ width: '22%' }}>Applicant</th>
              <th style={{ width: '28%' }}>Qualifications</th>
              <th style={{ width: '11%' }}>Created</th>
              <th style={{ width: '12%' }}>Status</th>
              <th style={{ width: '27%' }} className="th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <div className="empty-state">
                    <FileText size={64} className="empty-icon" />
                    <p className="empty-text">No applications found</p>
                  </div>
                </td>
              </tr>
            ) : (
              pageItems.map((app) => (
                <tr key={app.id}>
                  <td>
                    <div className="td-user">
                      <img 
                        src={app.avatar || 'https://via.placeholder.com/48'} 
                        alt={app.name || `User ${app.user_id}`} 
                        className="td-avatar" 
                      />
                      <div className="td-user-info">
                        <div className="td-name">{app.name || `User #${app.user_id}`}</div>
                        <div className="td-sub">@{app.username || `user${app.user_id}`}</div>
                      </div>
                    </div>
                  </td>
                  <td className="td-qual" title={app.qualifications}>{app.qualifications}</td>
                  <td style={{ fontSize: '0.9rem', color: '#666' }}>
                    {new Date(app.created_at).toLocaleDateString('vi-VN')}
                  </td>
                  <td>{getStatusBadge(app.status)}</td>
                  <td className="td-actions">
                    {app.status === 'pending' ? (
                      <>
                        <button className="btn-action approve" onClick={() => handleApprove(app.id)}>
                          <CheckCircle2 size={16} />
                          <span>Approve</span>
                        </button>
                        <button className="btn-action reject" onClick={() => handleRejectClick(app)}>
                          <XCircle size={16} />
                          <span>Reject</span>
                        </button>
                        <button className="btn-action view" onClick={() => handleViewDetails(app)}>
                          <Eye size={16} />
                          <span>View</span>
                        </button>
                      </>
                    ) : (
                      <button className="btn-action view" onClick={() => handleViewDetails(app)}>
                        <Eye size={16} />
                        <span>View</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button className="page-btn" disabled={page === 1} onClick={goPrev}>Previous</button>
        <span className="page-info">Page {page}/{totalPages}</span>
        <button className="page-btn" disabled={page === totalPages} onClick={goNext}>Next</button>
      </div>

      {/* Detail Modal */}
      {showModal && selectedApplication && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title gradient-text">Application Details</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <XCircle size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-section">
                <div className="detail-header">
                  <img 
                    src={selectedApplication.avatar} 
                    alt={selectedApplication.name || `User ${selectedApplication.user_id}`}
                    className="detail-avatar"
                  />
                  <div>
                    <h3 className="detail-name">{selectedApplication.name || `User #${selectedApplication.user_id}`}</h3>
                    {getStatusBadge(selectedApplication.status)}
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4 className="section-title">
                  <User size={20} />
                  Application Information
                </h4>
                <div className="detail-info">
                  <div className="info-row">Created: {new Date(selectedApplication.created_at).toLocaleString('en-US')}</div>
                </div>
              </div>

              <div className="detail-section">
                <h4 className="section-title">
                  <FileText size={20} />
                  Qualifications & Certifications
                </h4>
                <p className="detail-text">{selectedApplication.qualifications || '—'}</p>
              </div>

              {selectedApplication.experience_details && (
                <div className="detail-section">
                  <h4 className="section-title">
                    <FileText size={20} />
                    Experience Details
                  </h4>
                  <p className="detail-text">{selectedApplication.experience_details}</p>
                </div>
              )}

              <div className="detail-section">
                <h4 className="section-title">
                  <LinkIcon size={20} />
                  Attached Documents
                </h4>
                {selectedApplication.document_urls?.length ? (
                  <ul className="certifications-list">
                    {selectedApplication.document_urls.map((doc, idx) => (
                      <li key={idx} className="certification-item">
                        <LinkIcon size={16} />
                        <a href={doc.url} target="_blank" rel="noreferrer">{doc.label || doc.url}</a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="detail-text">No documents attached</p>
                )}
              </div>

              {selectedApplication.status !== 'pending' && selectedApplication.admin_feedback && (
                <div className="detail-section">
                  <h4 className="section-title">
                    <FileText size={20} />
                    Admin Feedback
                  </h4>
                  <p className="detail-text">{selectedApplication.admin_feedback}</p>
                </div>
              )}

              {selectedApplication.status === 'pending' && modalMode === 'reject' && (
                <div className="detail-section">
                  <h4 className="section-title">
                    <FileText size={20} />
                    Rejection Reason (required)
                  </h4>
                  <textarea
                    className="search-input"
                    placeholder="Enter rejection reason..."
                    value={rejectFeedback}
                    onChange={(e) => setRejectFeedback(e.target.value)}
                    style={{ minHeight: 100 }}
                  />
                  <small style={{ color: '#6b7280', fontSize: '12px', marginTop: '8px', display: 'block' }}>
                    💡 Rejection reason is required.
                  </small>
                </div>
              )}
            </div>

            {selectedApplication.status === 'pending' && modalMode === 'reject' && (
              <div className="modal-footer">
                <button className="modal-btn btn-outline" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="modal-btn btn-outline danger" onClick={() => handleReject(selectedApplication.id, rejectFeedback)}>
                  <XCircle size={18} />
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
