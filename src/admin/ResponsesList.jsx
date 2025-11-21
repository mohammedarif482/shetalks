import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { format } from 'date-fns';
import './ResponsesList.css';

export default function ResponsesList() {
  const navigate = useNavigate();
  const [responses, setResponses] = useState([]);
  const [filteredResponses, setFilteredResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    ageGroups: [],
    lifeStages: [],
    dateFrom: '',
    dateTo: ''
  });
  const itemsPerPage = 50;

  useEffect(() => {
    fetchResponses();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [responses, filters]);

  const fetchResponses = async () => {
    setLoading(true);
    try {
      const responsesRef = collection(db, 'survey_responses');
      const snapshot = await getDocs(responsesRef);
      
      const responsesData = [];
      snapshot.forEach((doc) => {
        responsesData.push({ id: doc.id, ...doc.data() });
      });

      // Sort by submission date (newest first)
      responsesData.sort((a, b) => {
        const dateA = a.submittedAt?.toDate ? a.submittedAt.toDate() : new Date(a.submittedAt || 0);
        const dateB = b.submittedAt?.toDate ? b.submittedAt.toDate() : new Date(b.submittedAt || 0);
        return dateB - dateA;
      });

      setResponses(responsesData);
    } catch (error) {
      console.error('Error fetching responses:', error);
    }
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...responses];

    // Filter by age groups
    if (filters.ageGroups.length > 0) {
      filtered = filtered.filter(r => filters.ageGroups.includes(r.answers?.['1']));
    }

    // Filter by life stages (Q28)
    if (filters.lifeStages.length > 0) {
      filtered = filtered.filter(r => filters.lifeStages.includes(r.answers?.['28']));
    }

    // Filter by date range
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      fromDate.setHours(0, 0, 0, 0);
      filtered = filtered.filter(r => {
        const responseDate = r.submittedAt?.toDate ? r.submittedAt.toDate() : new Date(r.submittedAt);
        return responseDate >= fromDate;
      });
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(r => {
        const responseDate = r.submittedAt?.toDate ? r.submittedAt.toDate() : new Date(r.submittedAt);
        return responseDate <= toDate;
      });
    }

    setFilteredResponses(filtered);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      if (filterType === 'ageGroups' || filterType === 'lifeStages') {
        const currentValues = prev[filterType];
        const newValues = currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value];
        return { ...prev, [filterType]: newValues };
      } else {
        return { ...prev, [filterType]: value };
      }
    });
  };

  const clearFilters = () => {
    setFilters({
      ageGroups: [],
      lifeStages: [],
      dateFrom: '',
      dateTo: ''
    });
  };

  const exportToCSV = () => {
    if (responses.length === 0) return;

    const headers = ['Response ID', 'Date Submitted', 'Completed'];
    
    // Add all question headers (Q1-Q30)
    for (let i = 1; i <= 30; i++) {
      headers.push(`Q${i}`);
    }

    const csvRows = [headers.join(',')];

    responses.forEach(response => {
      const row = [
        response.id || '',
        response.submittedAt ? format(response.submittedAt.toDate ? response.submittedAt.toDate() : new Date(response.submittedAt), 'yyyy-MM-dd HH:mm:ss') : '',
        response.completed ? 'Yes' : 'No'
      ];

      // Add answers for each question
      for (let i = 1; i <= 30; i++) {
        const answer = response.answers?.[String(i)];
        if (Array.isArray(answer)) {
          row.push(escapeCSV(answer.join('; ')));
        } else {
          row.push(escapeCSV(answer || ''));
        }
      }

      csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `survey_responses_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const escapeCSV = (value) => {
    if (value === null || value === undefined) return '';
    const stringValue = String(value);
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  // Pagination
  const totalPages = Math.ceil(filteredResponses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResponses = filteredResponses.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const ageGroups = ['18-24', '25-29', '30-34', '35-39', '40-44', '45+'];
  const lifeStages = [
    'Trying to conceive',
    'Pregnant',
    'Postpartum',
    'Perimenopause',
    'Menopause',
    'None of the above'
  ];

  if (loading) {
    return (
      <div className="responses-list">
        <div className="responses-loading">Loading responses...</div>
      </div>
    );
  }

  return (
    <div className="responses-list">
      <div className="responses-header">
        <div>
          <h1>All Survey Responses</h1>
          <p>Total: {filteredResponses.length} responses</p>
        </div>
        <div className="responses-header-actions">
          <button onClick={exportToCSV} className="btn-export">
            📥 Export CSV
          </button>
          <button onClick={() => navigate('/admin/dashboard')} className="btn-back">
            ← Back to Dashboard
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <h3>Age Groups</h3>
          <div className="checkbox-group">
            {ageGroups.map(age => (
              <label key={age} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.ageGroups.includes(age)}
                  onChange={() => handleFilterChange('ageGroups', age)}
                />
                {age}
              </label>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <h3>Life Stages</h3>
          <div className="checkbox-group">
            {lifeStages.map(stage => (
              <label key={stage} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.lifeStages.includes(stage)}
                  onChange={() => handleFilterChange('lifeStages', stage)}
                />
                {stage}
              </label>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <h3>Date Range</h3>
          <div className="date-inputs">
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              placeholder="From"
            />
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              placeholder="To"
            />
          </div>
        </div>

        <div className="filter-actions">
          <button onClick={clearFilters} className="btn-clear-filters">
            Clear Filters
          </button>
        </div>
      </div>

      {/* Responses Table */}
      <div className="table-container">
        <table className="responses-table">
          <thead>
            <tr>
              <th>Response ID</th>
              <th>Date</th>
              <th>Age</th>
              <th>Life Stage</th>
              <th>Has Partner</th>
              <th>Main Frustration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentResponses.map(response => {
              const hasPartner = response.answers?.['3'];
              const frustration = response.answers?.['18'];
              
              return (
                <tr key={response.id}>
                  <td className="response-id">{response.id.substring(0, 8)}</td>
                  <td>
                    {response.submittedAt
                      ? format(
                          response.submittedAt.toDate ? response.submittedAt.toDate() : new Date(response.submittedAt),
                          'MMM dd, yyyy'
                        )
                      : 'N/A'}
                  </td>
                  <td>{response.answers?.['1'] || 'N/A'}</td>
                  <td>{response.answers?.['28'] || 'N/A'}</td>
                  <td>{hasPartner === 'Yes' || hasPartner === 'Yes, in a relationship' ? 'Yes' : 'No'}</td>
                  <td className="frustration-cell">{frustration || 'N/A'}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/admin/dashboard/response/${response.id}`)}
                      className="btn-view"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {currentResponses.length === 0 && (
          <div className="no-results">No responses match your filters.</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            ← Previous
          </button>

          <div className="pagination-numbers">
            {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
              let pageNum;
              if (totalPages <= 10) {
                pageNum = i + 1;
              } else if (currentPage <= 5) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 4) {
                pageNum = totalPages - 9 + i;
              } else {
                pageNum = currentPage - 4 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
