import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    completionRate: 0,
    today: 0
  });
  const [ageDistribution, setAgeDistribution] = useState([]);
  const [frustrations, setFrustrations] = useState([]);
  const [partnerToolInterest, setPartnerToolInterest] = useState([]);
  const [paymentWillingness, setPaymentWillingness] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const responsesRef = collection(db, 'survey_responses');
      const snapshot = await getDocs(responsesRef);
      
      const responses = [];
      snapshot.forEach((doc) => {
        responses.push({ id: doc.id, ...doc.data() });
      });

      // Calculate stats
      const total = responses.length;
      const completed = responses.filter(r => r.completed === true).length;
      const completionRate = total > 0 ? ((completed / total) * 100).toFixed(1) : 0;
      
      // Count today's responses
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayCount = responses.filter(r => {
        if (!r.submittedAt) return false;
        const responseDate = r.submittedAt.toDate ? r.submittedAt.toDate() : new Date(r.submittedAt);
        return responseDate >= today;
      }).length;

      setStats({ total, completed, completionRate, today: todayCount });

      // Age Distribution
      const ageCounts = {};
      responses.forEach(r => {
        const age = r.answers?.['Q1'] || 'Not specified';
        ageCounts[age] = (ageCounts[age] || 0) + 1;
      });
      const ageData = Object.entries(ageCounts).map(([name, value]) => ({
        name,
        value,
        percentage: ((value / total) * 100).toFixed(1)
      }));
      setAgeDistribution(ageData);

      // Biggest Frustrations (Q18)
      const frustrationCounts = {};
      responses.forEach(r => {
        const frustration = r.answers?.['Q18'] || 'Not specified';
        frustrationCounts[frustration] = (frustrationCounts[frustration] || 0) + 1;
      });
      const frustrationData = Object.entries(frustrationCounts)
        .map(([name, value]) => ({ name: truncateText(name, 40), value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 7);
      setFrustrations(frustrationData);

      // Partner Tool Interest (Q15)
      const partnerResponses = responses.filter(r => {
        const q3 = r.answers?.['Q3'];
        return q3 === 'Yes' || q3 === 'Yes, in a relationship';
      });
      const partnerToolCounts = {};
      partnerResponses.forEach(r => {
        const interest = r.answers?.['Q15'] || 'Not specified';
        partnerToolCounts[interest] = (partnerToolCounts[interest] || 0) + 1;
      });
      const partnerToolData = Object.entries(partnerToolCounts).map(([name, value]) => ({
        name,
        value,
        percentage: partnerResponses.length > 0 ? ((value / partnerResponses.length) * 100).toFixed(1) : 0
      }));
      setPartnerToolInterest(partnerToolData);

      // Payment Willingness (Q27)
      const paymentCounts = {};
      responses.forEach(r => {
        const payment = r.answers?.['Q27'] || 'Not specified';
        paymentCounts[payment] = (paymentCounts[payment] || 0) + 1;
      });
      const paymentData = Object.entries(paymentCounts).map(([name, value]) => ({
        name: truncateText(name, 30),
        value
      }));
      setPaymentWillingness(paymentData);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
    setLoading(false);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const COLORS = ['#EB7470', '#D85D59', '#FDDDCF', '#F8A89E', '#F5C7C4', '#EFA5A1', '#E99491'];

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="dashboard-loading">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Survey Analytics & Insights</p>
        </div>
        <div className="dashboard-header-actions">
          <button onClick={fetchDashboardData} className="btn-refresh">
            🔄 Refresh
          </button>
          <button onClick={() => navigate('/admin/dashboard/responses')} className="btn-secondary">
            View All Responses
          </button>
          <button onClick={() => navigate('/admin/dashboard/insights')} className="btn-primary">
            🤖 AI Insights
          </button>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Total Responses</h3>
            <p className="stat-value">{stats.total}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Completed Surveys</h3>
            <p className="stat-value">{stats.completed}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>Completion Rate</h3>
            <p className="stat-value">{stats.completionRate}%</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>Responses Today</h3>
            <p className="stat-value">{stats.today}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Age Distribution */}
        {ageDistribution.length > 0 && (
          <div className="chart-card">
            <h2>Age Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ageDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={100}
                  fill="#EB7470"
                  dataKey="value"
                >
                  {ageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Biggest Frustrations */}
        {frustrations.length > 0 && (
          <div className="chart-card chart-card-wide">
            <h2>Biggest Frustrations (Top 7)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={frustrations} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={200} />
                <Tooltip />
                <Bar dataKey="value" fill="#EB7470" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Partner Tool Interest */}
        {partnerToolInterest.length > 0 && (
          <div className="chart-card">
            <h2>Partner Tool Interest</h2>
            <p className="chart-subtitle">(Among users with partners)</p>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={partnerToolInterest}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={100}
                  fill="#EB7470"
                  dataKey="value"
                >
                  {partnerToolInterest.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Payment Willingness */}
        {paymentWillingness.length > 0 && (
          <div className="chart-card">
            <h2>Payment Willingness</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={paymentWillingness}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#D85D59" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
