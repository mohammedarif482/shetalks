import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { format } from 'date-fns';
import './InsightsPage.css';

export default function InsightsPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [error, setError] = useState('');

  const generateInsights = async () => {
    setLoading(true);
    setError('');

    try {
      // Fetch all survey responses
      const responsesRef = collection(db, 'survey_responses');
      const snapshot = await getDocs(responsesRef);
      
      const responses = [];
      snapshot.forEach((doc) => {
        responses.push({ id: doc.id, ...doc.data() });
      });

      if (responses.length === 0) {
        setError('No survey responses available for analysis.');
        setLoading(false);
        return;
      }

      // Aggregate data
      const aggregatedData = aggregateResponses(responses);

      // Call Gemini API
      const aiInsights = await callGeminiAPI(aggregatedData, responses.length);

      setInsights(aiInsights);
      setMetadata({
        lastGenerated: new Date(),
        responseCount: responses.length,
        isCached: false
      });

    } catch (error) {
      console.error('Error generating insights:', error);
      setError('Failed to generate insights. Please try again.');
    }

    setLoading(false);
  };

  const aggregateResponses = (responses) => {
    // Demographics
    const ageCounts = {};
    const relationshipCounts = {};
    const lifeStageCounts = {};
    
    // Frustrations
    const frustrationCounts = {};
    
    // Partner data
    const partnerResponses = responses.filter(r => {
      const q3 = r.answers?.['3'];
      return q3 === 'Yes' || q3 === 'Yes, in a relationship';
    });
    const partnerToolInterest = {};
    const comfortLevels = { q10_1: [], q10_2: [], q10_3: [], q10_4: [], q10_5: [] };
    const partnerUnderstanding = {};
    const partnerDismisses = {};
    const conflicts = {};
    
    // Impact ratings
    const impacts = { q19_1: [], q19_2: [], q19_3: [], q19_4: [], q19_5: [] };
    
    // AI & Payment
    const aiTrust = {};
    const paymentWillingness = {};
    const paymentAmounts = [];
    
    // Sample quotes
    const partnerStories = [];
    const oneThingEasier = [];
    const perfectCompanion = [];

    responses.forEach(r => {
      const answers = r.answers || {};
      
      // Demographics
      ageCounts[answers['1']] = (ageCounts[answers['1']] || 0) + 1;
      relationshipCounts[answers['2']] = (relationshipCounts[answers['2']] || 0) + 1;
      lifeStageCounts[answers['28']] = (lifeStageCounts[answers['28']] || 0) + 1;
      
      // Frustrations
      frustrationCounts[answers['18']] = (frustrationCounts[answers['18']] || 0) + 1;
      
      // Impacts
      if (answers['19_1']) impacts.q19_1.push(parseInt(answers['19_1']));
      if (answers['19_2']) impacts.q19_2.push(parseInt(answers['19_2']));
      if (answers['19_3']) impacts.q19_3.push(parseInt(answers['19_3']));
      if (answers['19_4']) impacts.q19_4.push(parseInt(answers['19_4']));
      if (answers['19_5']) impacts.q19_5.push(parseInt(answers['19_5']));
      
      // AI & Payment
      aiTrust[answers['24']] = (aiTrust[answers['24']] || 0) + 1;
      paymentWillingness[answers['27']] = (paymentWillingness[answers['27']] || 0) + 1;
      if (answers['27_amount']) {
        const amount = parseFloat(answers['27_amount'].replace(/[^0-9.]/g, ''));
        if (!isNaN(amount)) paymentAmounts.push(amount);
      }
      
      // Quotes
      if (answers['17'] && answers['17'].length > 10) {
        partnerStories.push({ text: answers['17'], age: answers['1'], stage: answers['28'], frustration: answers['18'] });
      }
      if (answers['23'] && answers['23'].length > 10) {
        oneThingEasier.push({ text: answers['23'], age: answers['1'], stage: answers['28'], frustration: answers['18'] });
      }
      if (answers['29'] && answers['29'].length > 10) {
        perfectCompanion.push({ text: answers['29'], age: answers['1'], stage: answers['28'], frustration: answers['18'] });
      }
    });

    // Partner-specific data
    partnerResponses.forEach(r => {
      const answers = r.answers || {};
      
      partnerToolInterest[answers['15']] = (partnerToolInterest[answers['15']] || 0) + 1;
      partnerUnderstanding[answers['11']] = (partnerUnderstanding[answers['11']] || 0) + 1;
      partnerDismisses[answers['12']] = (partnerDismisses[answers['12']] || 0) + 1;
      conflicts[answers['13']] = (conflicts[answers['13']] || 0) + 1;
      
      if (answers['10_1']) comfortLevels.q10_1.push(parseInt(answers['10_1']));
      if (answers['10_2']) comfortLevels.q10_2.push(parseInt(answers['10_2']));
      if (answers['10_3']) comfortLevels.q10_3.push(parseInt(answers['10_3']));
      if (answers['10_4']) comfortLevels.q10_4.push(parseInt(answers['10_4']));
      if (answers['10_5']) comfortLevels.q10_5.push(parseInt(answers['10_5']));
    });

    const average = arr => arr.length > 0 ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2) : 0;

    return {
      totalResponses: responses.length,
      demographics: { ageCounts, relationshipCounts, lifeStageCounts },
      frustrations: Object.entries(frustrationCounts).sort((a, b) => b[1] - a[1]).slice(0, 10),
      partnerData: {
        totalWithPartners: partnerResponses.length,
        toolInterest: partnerToolInterest,
        averageComfortLevels: {
          menstrualCycle: average(comfortLevels.q10_1),
          moodChanges: average(comfortLevels.q10_2),
          physicalSymptoms: average(comfortLevels.q10_3),
          sexualHealth: average(comfortLevels.q10_4),
          mentalHealth: average(comfortLevels.q10_5)
        },
        understanding: partnerUnderstanding,
        dismisses: partnerDismisses,
        conflicts: conflicts
      },
      impacts: {
        dailyActivities: average(impacts.q19_1),
        relationships: average(impacts.q19_2),
        workProductivity: average(impacts.q19_3),
        mentalHealth: average(impacts.q19_4),
        healthcareAccess: average(impacts.q19_5)
      },
      aiAndPayment: {
        trust: aiTrust,
        willingness: paymentWillingness,
        averageAmount: paymentAmounts.length > 0 ? average(paymentAmounts) : 0,
        amounts: paymentAmounts
      },
      quotes: {
        partnerStories: partnerStories.slice(0, 20),
        oneThingEasier: oneThingEasier.slice(0, 20),
        perfectCompanion: perfectCompanion.slice(0, 20)
      }
    };
  };

  const callGeminiAPI = async (data, responseCount) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'your_gemini_api_key') {
      throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file');
    }

    const prompt = `You are a product strategy analyst for women's health tech.

Here's survey data from ${responseCount} women:

DEMOGRAPHICS:
${JSON.stringify(data.demographics, null, 2)}

TOP FRUSTRATIONS:
${data.frustrations.map(([f, c]) => `- ${f}: ${c} responses (${((c/responseCount)*100).toFixed(1)}%)`).join('\n')}

PARTNER COMMUNICATION DATA:
Total with partners: ${data.partnerData.totalWithPartners}
Average comfort levels (1-5 scale):
- Menstrual cycle: ${data.partnerData.averageComfortLevels.menstrualCycle}
- Mood changes: ${data.partnerData.averageComfortLevels.moodChanges}
- Physical symptoms: ${data.partnerData.averageComfortLevels.physicalSymptoms}
- Sexual health: ${data.partnerData.averageComfortLevels.sexualHealth}
- Mental health: ${data.partnerData.averageComfortLevels.mentalHealth}

Partner tool interest: ${JSON.stringify(data.partnerData.toolInterest)}
Partner understanding: ${JSON.stringify(data.partnerData.understanding)}
Conflicts: ${JSON.stringify(data.partnerData.conflicts)}

CHALLENGE IMPACTS (average 1-5 scale):
- Daily activities: ${data.impacts.dailyActivities}
- Relationships: ${data.impacts.relationships}
- Work/productivity: ${data.impacts.workProductivity}
- Mental health: ${data.impacts.mentalHealth}
- Healthcare access: ${data.impacts.healthcareAccess}

AI & PAYMENT:
AI Trust: ${JSON.stringify(data.aiAndPayment.trust)}
Payment willingness: ${JSON.stringify(data.aiAndPayment.willingness)}
Average payment amount: ₹${data.aiAndPayment.averageAmount}

SAMPLE QUOTES (first 5 of each):
Partner stories: ${data.quotes.partnerStories.slice(0, 5).map(q => q.text).join(' | ')}
One thing easier: ${data.quotes.oneThingEasier.slice(0, 5).map(q => q.text).join(' | ')}
Perfect companion: ${data.quotes.perfectCompanion.slice(0, 5).map(q => q.text).join(' | ')}

Analyze this data and provide a comprehensive report in the following JSON format:

{
  "primaryGap": {
    "name": "string",
    "affectedPercentage": number,
    "severityScore": number (1-10),
    "whyExistingFail": "string",
    "evidence": ["string", "string", ...]
  },
  "secondaryGaps": [
    {
      "name": "string",
      "affectedPercentage": number,
      "severityScore": number,
      "description": "string"
    }
  ],
  "targetAudience": {
    "name": "string",
    "marketSize": number,
    "painPoints": ["string", ...],
    "willingnessToPay": "string"
  },
  "partnerGapValidation": {
    "isValidated": boolean,
    "confidence": number,
    "evidence": {
      "uncomfortablePercentage": number,
      "conflictPercentage": number,
      "averageImpactScores": object,
      "interestedPercentage": number
    },
    "severityScore": number,
    "topFeatures": ["string", ...],
    "mvpFeatures": ["string", ...]
  },
  "featurePrioritization": {
    "mustHave": [{"feature": "string", "demand": number}],
    "differentiating": ["string", ...],
    "niceToHave": ["string", ...]
  },
  "monetization": {
    "recommendedModel": "string",
    "optimalPrice": "string",
    "priceRange": "string",
    "willingToPayPercentage": number,
    "estimatedConversion": number
  },
  "aiAdoption": {
    "trustLevel": number,
    "barriers": ["string", ...],
    "positioning": "string",
    "topFeatures": ["string", ...]
  },
  "recommendations": [
    {
      "what": "string",
      "why": "string",
      "target": "string",
      "outcome": "string"
    }
  ],
  "quotes": [
    {
      "text": "string",
      "context": "string"
    }
  ],
  "executiveSummary": {
    "paragraph1": "string",
    "paragraph2": "string",
    "paragraph3": "string"
  }
}

Be specific, cite data, and prioritize actionable insights. Return ONLY valid JSON, no markdown formatting.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 8000,
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error('Failed to call Gemini API');
    }

    const result = await response.json();
    const generatedText = result.candidates[0].content.parts[0].text;
    
    // Extract JSON from response (in case it's wrapped in markdown)
    let jsonText = generatedText.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '').replace(/```\n?$/g, '');
    }
    
    const insights = JSON.parse(jsonText);
    return insights;
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const expandAll = () => {
    const allSections = {
      primaryGap: true,
      secondaryGaps: true,
      targetAudience: true,
      partnerValidation: true,
      features: true,
      monetization: true,
      aiAdoption: true,
      recommendations: true,
      quotes: true,
      summary: true
    };
    setExpandedSections(allSections);
  };

  const collapseAll = () => {
    setExpandedSections({});
  };

  const copyToClipboard = () => {
    const text = JSON.stringify(insights, null, 2);
    navigator.clipboard.writeText(text);
    alert('Insights copied to clipboard!');
  };

  const exportToPDF = () => {
    alert('PDF export: Use your browser\'s print function (Cmd/Ctrl+P) and save as PDF.');
  };

  return (
    <div className="insights-page">
      <div className="insights-header">
        <div>
          <h1>🤖 AI Gap Analysis</h1>
          <p>Product strategy insights powered by AI</p>
        </div>
        <button onClick={() => navigate('/admin/dashboard')} className="btn-back">
          ← Back to Dashboard
        </button>
      </div>

      {/* Top Section */}
      <div className="insights-top-section">
        {!insights && (
          <div className="generate-section">
            <button
              onClick={() => generateInsights(false)}
              className="btn-generate"
              disabled={loading}
            >
              {loading ? '🔄 Analyzing...' : '🤖 Generate AI Gap Analysis'}
            </button>
            {loading && (
              <p className="loading-message">
                Analyzing survey responses... This may take 30-60 seconds
              </p>
            )}
            {error && <p className="error-message">{error}</p>}
          </div>
        )}

        {insights && metadata && (
          <>
            <div className="metadata-section">
              <div className="metadata-item">
                <span className="metadata-label">Last Generated:</span>
                <span className="metadata-value">
                  {format(metadata.lastGenerated, 'MMM dd, yyyy • hh:mm a')}
                </span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">Based on:</span>
                <span className="metadata-value">{metadata.responseCount} responses</span>
              </div>
            </div>

            <div className="action-buttons">
              <button onClick={() => generateInsights(true)} className="btn-regenerate" disabled={loading}>
                {loading ? 'Regenerating...' : '🔄 Regenerate Analysis'}
              </button>
              <button onClick={expandAll} className="btn-action">
                Expand All
              </button>
              <button onClick={collapseAll} className="btn-action">
                Collapse All
              </button>
              <button onClick={copyToClipboard} className="btn-action">
                📋 Copy to Clipboard
              </button>
              <button onClick={exportToPDF} className="btn-action">
                📄 Export as PDF
              </button>
            </div>
          </>
        )}
      </div>

      {/* Insights Display */}
      {insights && (
        <div className="insights-content">
          {/* Executive Summary */}
          <InsightSection
            title="Executive Summary"
            id="summary"
            expanded={expandedSections.summary}
            toggle={() => toggleSection('summary')}
          >
            <p>{insights.executiveSummary.paragraph1}</p>
            <p>{insights.executiveSummary.paragraph2}</p>
            <p>{insights.executiveSummary.paragraph3}</p>
          </InsightSection>

          {/* Primary Gap */}
          <InsightSection
            title="1. Primary Market Gap"
            id="primaryGap"
            expanded={expandedSections.primaryGap}
            toggle={() => toggleSection('primaryGap')}
          >
            <div className="gap-header">
              <h3>{insights.primaryGap.name}</h3>
              <div className="gap-metrics">
                <span className="metric">
                  <strong>{insights.primaryGap.affectedPercentage}%</strong> affected
                </span>
                <span className="metric">
                  Severity: <strong>{insights.primaryGap.severityScore}/10</strong>
                </span>
              </div>
            </div>
            <div className="gap-section">
              <h4>Why Existing Solutions Fail:</h4>
              <p>{insights.primaryGap.whyExistingFail}</p>
            </div>
            <div className="gap-section">
              <h4>Evidence from Survey Data:</h4>
              <ul>
                {insights.primaryGap.evidence.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </InsightSection>

          {/* Secondary Gaps */}
          <InsightSection
            title="2. Secondary Gaps (Top 3)"
            id="secondaryGaps"
            expanded={expandedSections.secondaryGaps}
            toggle={() => toggleSection('secondaryGaps')}
          >
            {insights.secondaryGaps.map((gap, i) => (
              <div key={i} className="secondary-gap">
                <h3>{gap.name}</h3>
                <div className="gap-metrics">
                  <span className="metric">
                    <strong>{gap.affectedPercentage}%</strong> affected
                  </span>
                  <span className="metric">
                    Severity: <strong>{gap.severityScore}/10</strong>
                  </span>
                </div>
                <p>{gap.description}</p>
              </div>
            ))}
          </InsightSection>

          {/* Target Audience */}
          <InsightSection
            title="3. Best Target Audience"
            id="targetAudience"
            expanded={expandedSections.targetAudience}
            toggle={() => toggleSection('targetAudience')}
          >
            <h3>{insights.targetAudience.name}</h3>
            <p><strong>Market Size:</strong> {insights.targetAudience.marketSize}% of respondents</p>
            <div className="gap-section">
              <h4>Specific Pain Points:</h4>
              <ul>
                {insights.targetAudience.painPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
            <p><strong>Willingness to Pay:</strong> {insights.targetAudience.willingnessToPay}</p>
          </InsightSection>

          {/* Partner Gap Validation */}
          <InsightSection
            title="4. Partner Communication Gap Validation"
            id="partnerValidation"
            expanded={expandedSections.partnerValidation}
            toggle={() => toggleSection('partnerValidation')}
          >
            <div className="validation-header">
              <h3>
                {insights.partnerGapValidation.isValidated ? '✅ Validated' : '❌ Not Validated'}
              </h3>
              <p>Confidence: {insights.partnerGapValidation.confidence}%</p>
              <p>Severity: {insights.partnerGapValidation.severityScore}/10</p>
            </div>
            <div className="gap-section">
              <h4>Evidence:</h4>
              <ul>
                <li>{insights.partnerGapValidation.evidence.uncomfortablePercentage}% uncomfortable discussing topics</li>
                <li>{insights.partnerGapValidation.evidence.conflictPercentage}% reporting conflicts</li>
                <li>{insights.partnerGapValidation.evidence.interestedPercentage}% interested in partner tool</li>
              </ul>
            </div>
            <div className="gap-section">
              <h4>Top 5 Desired Features:</h4>
              <ol>
                {insights.partnerGapValidation.topFeatures.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ol>
            </div>
            <div className="gap-section">
              <h4>Recommended MVP Feature Set:</h4>
              <ul>
                {insights.partnerGapValidation.mvpFeatures.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          </InsightSection>

          {/* Feature Prioritization */}
          <InsightSection
            title="5. Feature Prioritization"
            id="features"
            expanded={expandedSections.features}
            toggle={() => toggleSection('features')}
          >
            <div className="feature-group">
              <h3>Must-Have Features (Build First):</h3>
              <ul>
                {insights.featurePrioritization.mustHave.map((item, i) => (
                  <li key={i}>
                    <strong>{item.feature}</strong> - {item.demand}% demand
                  </li>
                ))}
              </ul>
            </div>
            <div className="feature-group">
              <h3>Differentiating Features:</h3>
              <ul>
                {insights.featurePrioritization.differentiating.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="feature-group">
              <h3>Nice-to-Have (Build Later):</h3>
              <ul>
                {insights.featurePrioritization.niceToHave.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          </InsightSection>

          {/* Monetization */}
          <InsightSection
            title="6. Monetization Insights"
            id="monetization"
            expanded={expandedSections.monetization}
            toggle={() => toggleSection('monetization')}
          >
            <div className="monetization-grid">
              <div className="mono-item">
                <h4>Recommended Model:</h4>
                <p className="highlight">{insights.monetization.recommendedModel}</p>
              </div>
              <div className="mono-item">
                <h4>Optimal Price Point:</h4>
                <p className="highlight">{insights.monetization.optimalPrice}</p>
              </div>
              <div className="mono-item">
                <h4>Price Range:</h4>
                <p>{insights.monetization.priceRange}</p>
              </div>
              <div className="mono-item">
                <h4>Willing to Pay:</h4>
                <p>{insights.monetization.willingToPayPercentage}%</p>
              </div>
              <div className="mono-item">
                <h4>Est. Conversion Rate:</h4>
                <p>{insights.monetization.estimatedConversion}%</p>
              </div>
            </div>
          </InsightSection>

          {/* AI Adoption */}
          <InsightSection
            title="7. AI Adoption Readiness"
            id="aiAdoption"
            expanded={expandedSections.aiAdoption}
            toggle={() => toggleSection('aiAdoption')}
          >
            <p><strong>Overall AI Trust Level:</strong> {insights.aiAdoption.trustLevel}%</p>
            <div className="gap-section">
              <h4>Barriers to Adoption:</h4>
              <ul>
                {insights.aiAdoption.barriers.map((barrier, i) => (
                  <li key={i}>{barrier}</li>
                ))}
              </ul>
            </div>
            <div className="gap-section">
              <h4>How to Position AI:</h4>
              <p>{insights.aiAdoption.positioning}</p>
            </div>
            <div className="gap-section">
              <h4>Top 5 AI Features to Build:</h4>
              <ol>
                {insights.aiAdoption.topFeatures.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ol>
            </div>
          </InsightSection>

          {/* Recommendations */}
          <InsightSection
            title="8. Product Strategy Recommendations"
            id="recommendations"
            expanded={expandedSections.recommendations}
            toggle={() => toggleSection('recommendations')}
          >
            {insights.recommendations.map((rec, i) => (
              <div key={i} className="recommendation">
                <h4>{i + 1}. {rec.what}</h4>
                <p><strong>Why:</strong> {rec.why}</p>
                <p><strong>Target:</strong> {rec.target}</p>
                <p><strong>Expected Outcome:</strong> {rec.outcome}</p>
              </div>
            ))}
          </InsightSection>

          {/* Supporting Quotes */}
          <InsightSection
            title="9. Supporting Quotes"
            id="quotes"
            expanded={expandedSections.quotes}
            toggle={() => toggleSection('quotes')}
          >
            {insights.quotes.map((quote, i) => (
              <div key={i} className="quote-box">
                <p className="quote-text">"{quote.text}"</p>
                <p className="quote-context">{quote.context}</p>
              </div>
            ))}
          </InsightSection>
        </div>
      )}
    </div>
  );
}

function InsightSection({ title, id, expanded, toggle, children }) {
  return (
    <div className="insight-section">
      <div className="section-header" onClick={toggle}>
        <h2>{title}</h2>
        <button className="toggle-btn">
          {expanded ? '−' : '+'}
        </button>
      </div>
      {expanded && (
        <div className="section-content">
          {children}
        </div>
      )}
    </div>
  );
}
