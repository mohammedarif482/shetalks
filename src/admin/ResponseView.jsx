import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { format } from 'date-fns';
import './ResponseView.css';

export default function ResponseView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResponse();
  }, [id]);

  const fetchResponse = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, 'survey_responses', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setResponse({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.error('Response not found');
      }
    } catch (error) {
      console.error('Error fetching response:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="response-view">
        <div className="response-loading">Loading response...</div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="response-view">
        <div className="response-not-found">
          <h2>Response Not Found</h2>
          <button onClick={() => navigate('/admin/dashboard/responses')} className="btn-back">
            ← Back to List
          </button>
        </div>
      </div>
    );
  }

  const answers = response.answers || {};
  const hasPartner = answers['3'] === 'Yes' || answers['3'] === 'Yes, in a relationship';

  return (
    <div className="response-view">
      <div className="response-header">
        <div>
          <h1>Response Details</h1>
          <p className="response-id">ID: {response.id}</p>
          {response.submittedAt && (
            <p className="response-date">
              Submitted: {format(
                response.submittedAt.toDate ? response.submittedAt.toDate() : new Date(response.submittedAt), 
                'MMMM dd, yyyy • hh:mm a'
              )}
            </p>
          )}
        </div>
        <button onClick={() => navigate('/admin/dashboard/responses')} className="btn-back">
          ← Back to List
        </button>
      </div>

      <div className="response-content">
        {/* Demographics Section */}
        <section className="response-section">
          <h2>👤 Demographics</h2>
          <div className="response-fields">
            <Field label="Age Group (Q1)" value={answers['1']} />
            <Field label="Relationship Status (Q2)" value={answers['2']} />
            <Field label="Has Partner (Q3)" value={answers['3']} />
            {hasPartner && <Field label="Relationship Duration (Q4)" value={answers['4']} />}
          </div>
        </section>

        {/* Health Tracking Section */}
        <section className="response-section">
          <h2>📊 Health Tracking</h2>
          <div className="response-fields">
            <Field label="Currently Tracks Health (Q5)" value={answers['5']} />
            {answers['6'] && <Field label="What They Track (Q6)" value={answers['6']} />}
            {answers['7'] && <Field label="Why Stopped Tracking (Q7)" value={answers['7']} />}
            <Field label="Importance of Understanding Body Patterns (Q8)" value={answers['8']} />
            <Field label="Dismissed by Healthcare Providers (Q9)" value={answers['9']} />
          </div>
        </section>

        {/* Partner Communication Section */}
        {hasPartner && (
          <section className="response-section">
            <h2>💬 Partner Communication</h2>
            <div className="response-fields">
              <h3>Comfort Levels Discussing Topics (Q10):</h3>
              <RatingField label="Menstrual Cycle" value={answers['10_1']} />
              <RatingField label="Mood Changes" value={answers['10_2']} />
              <RatingField label="Physical Symptoms" value={answers['10_3']} />
              <RatingField label="Sexual Health" value={answers['10_4']} />
              <RatingField label="Mental Health" value={answers['10_5']} />
              
              <Field label="Partner Understanding Level (Q11)" value={answers['11']} />
              <Field label="Partner Dismisses Concerns (Q12)" value={answers['12']} />
              <Field label="Conflicts Due to Misunderstanding (Q13)" value={answers['13']} />
              {answers['14'] && <Field label="Types of Conflicts (Q14)" value={answers['14']} isLong />}
              <Field label="Would Use Partner Tool (Q15)" value={answers['15']} highlight />
              {answers['16'] && <Field label="Desired Partner Features (Q16)" value={answers['16']} isLong />}
              {answers['17'] && <Field label="Partner Story (Q17)" value={answers['17']} isLong />}
            </div>
          </section>
        )}

        {/* Pain Points Section */}
        <section className="response-section">
          <h2>😔 Pain Points</h2>
          <div className="response-fields">
            <Field label="Biggest Frustration (Q18)" value={answers['18']} highlight />
            
            <h3>Challenge Impacts (1-5 scale) (Q19):</h3>
            <RatingField label="Daily Activities" value={answers['19_1']} />
            <RatingField label="Relationships" value={answers['19_2']} />
            <RatingField label="Work/Productivity" value={answers['19_3']} />
            <RatingField label="Mental Health" value={answers['19_4']} />
            <RatingField label="Healthcare Access" value={answers['19_5']} />
            
            <Field label="Need to Prove Symptoms (Q20)" value={answers['20']} />
            <Field label="Biggest Desired Impact (Q21)" value={answers['21']} highlight />
            <Field label="Communication Tool Usage Frequency (Q22)" value={answers['22']} />
            {answers['23'] && <Field label="One Thing to Make Easier (Q23)" value={answers['23']} isLong />}
          </div>
        </section>

        {/* AI & Technology Section */}
        <section className="response-section">
          <h2>🤖 AI & Technology</h2>
          <div className="response-fields">
            <Field label="Trust AI (Q24)" value={answers['24']} />
            {answers['25'] && <Field label="Most Valuable AI Features (Q25)" value={answers['25']} isLong />}
            <Field label="Privacy Importance (Q26)" value={answers['26']} />
            <Field label="Payment Willingness (Q27)" value={answers['27']} highlight />
            {answers['27_amount'] && <Field label="Payment Amount" value={answers['27_amount']} />}
          </div>
        </section>

        {/* Final Section */}
        <section className="response-section">
          <h2>🌸 Final Questions</h2>
          <div className="response-fields">
            <Field label="Reproductive Health Stage (Q28)" value={answers['28']} />
            {answers['29'] && <Field label="Perfect Companion Vision (Q29)" value={answers['29']} isLong />}
            <Field label="Follow-up Consent (Q30)" value={answers['30']} />
            {answers['31'] && <Field label="Contact Information (Q31)" value={answers['31']} highlight />}
          </div>
        </section>
      </div>
    </div>
  );
}

function Field({ label, value, isLong, highlight }) {
  if (!value) return null;
  
  const displayValue = Array.isArray(value) ? value.join(', ') : value;
  
  return (
    <div className={`field ${isLong ? 'field-long' : ''} ${highlight ? 'field-highlight' : ''}`}>
      <div className="field-label">{label}</div>
      <div className="field-value">{displayValue}</div>
    </div>
  );
}

function RatingField({ label, value }) {
  if (!value) return null;
  
  const numValue = parseInt(value);
  if (isNaN(numValue)) return null;
  
  return (
    <div className="rating-field">
      <div className="field-label">{label}</div>
      <div className="rating-value">
        <div className="rating-bar">
          <div 
            className="rating-fill" 
            style={{ width: `${(numValue / 5) * 100}%` }}
          />
        </div>
        <span className="rating-number">{numValue}/5</span>
      </div>
    </div>
  );
}
