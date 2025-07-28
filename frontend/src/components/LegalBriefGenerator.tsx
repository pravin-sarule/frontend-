import React, { useState } from 'react';
import { ArrowLeft, Download, Copy, Zap, CheckCircle } from 'lucide-react';

interface LegalBriefGeneratorProps {
  onBack: () => void;
}

const LegalBriefGenerator: React.FC<LegalBriefGeneratorProps> = ({ onBack }) => {
  const [briefType, setBriefType] = useState('motion-to-dismiss');
  const [caseTitle, setCaseTitle] = useState('');
  const [courtName, setCourtName] = useState('');
  const [caseNumber, setCaseNumber] = useState('');
  const [briefArguments, setBriefArguments] = useState('');
  const [generatedBrief, setGeneratedBrief] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const briefTypes = [
    { value: 'motion-to-dismiss', label: 'Motion to Dismiss' },
    { value: 'summary-judgment', label: 'Motion for Summary Judgment' },
    { value: 'preliminary-injunction', label: 'Motion for Preliminary Injunction' },
    { value: 'discovery-motion', label: 'Discovery Motion' },
    { value: 'appeal-brief', label: 'Appeal Brief' },
    { value: 'response-brief', label: 'Response Brief' }
  ];

  const templates = [
    { name: 'Federal Court Motion', description: 'Standard federal court motion format' },
    { name: 'State Court Brief', description: 'State court brief template' },
    { name: 'Appellate Brief', description: 'Court of appeals brief format' },
    { name: 'Emergency Motion', description: 'Expedited motion template' }
  ];

  const generateBrief = async () => {
    if (!caseTitle || !courtName || !briefArguments) {
      alert('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const sampleBrief = `IN THE ${courtName.toUpperCase()}

${caseTitle}
Case No. ${caseNumber}

${briefTypes.find(type => type.value === briefType)?.label.toUpperCase()}

TO THE HONORABLE COURT:

I. INTRODUCTION

Plaintiff respectfully submits this ${briefTypes.find(type => type.value === briefType)?.label.toLowerCase()} pursuant to Federal Rule of Civil Procedure 12(b)(6). This motion seeks dismissal of the complaint for failure to state a claim upon which relief can be granted.

II. STATEMENT OF FACTS

${briefArguments}

III. ARGUMENT

A. Standard for Motion to Dismiss

A motion to dismiss under Rule 12(b)(6) tests the legal sufficiency of the complaint. To survive a motion to dismiss, a complaint must contain sufficient factual matter, accepted as true, to "state a claim to relief that is plausible on its face." Bell Atlantic Corp. v. Twombly, 550 U.S. 544, 570 (2007).

B. The Complaint Fails to State a Valid Claim

The complaint fails to meet the pleading standards established in Twombly and Iqbal. The allegations are conclusory and lack the factual specificity required to state a plausible claim for relief.

IV. CONCLUSION

For the foregoing reasons, Defendant respectfully requests that this Court grant the motion to dismiss with prejudice.

Respectfully submitted,

[Attorney Name]
[Bar Number]
[Law Firm]
[Address]
[Phone]
[Email]

Attorney for Defendant`;

      setGeneratedBrief(sampleBrief);
    } catch (error) {
      alert('Error generating brief. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedBrief);
  };

  const downloadBrief = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedBrief], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${briefType}-${caseTitle.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-3 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-200 hover:scale-105 group"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Legal Brief Generator</h1>
          <p className="text-gray-600 mt-2">Create professional legal briefs and motions with AI assistance.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Brief Configuration */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Brief Configuration</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brief Type</label>
                <select
                  value={briefType}
                  onChange={(e) => setBriefType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {briefTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Case Title *</label>
                <input
                  type="text"
                  value={caseTitle}
                  onChange={(e) => setCaseTitle(e.target.value)}
                  placeholder="e.g., Smith v. Johnson Corporation"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Court Name *</label>
                <input
                  type="text"
                  value={courtName}
                  onChange={(e) => setCourtName(e.target.value)}
                  placeholder="e.g., United States District Court for the Southern District of New York"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Case Number</label>
                <input
                  type="text"
                  value={caseNumber}
                  onChange={(e) => setCaseNumber(e.target.value)}
                  placeholder="e.g., CV-2024-001234"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Arguments Section */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Arguments & Facts *</h3>
            <textarea
              value={briefArguments}
              onChange={(e) => setBriefArguments(e.target.value)}
              placeholder="Enter the key arguments, facts, and legal reasoning for your brief..."
              rows={8}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              required
            />
            <div className="mt-2 text-sm text-gray-500">
              {briefArguments.length} characters
            </div>
          </div>

          {/* Generate Button */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <button
              onClick={generateBrief}
              disabled={isGenerating || !caseTitle || !courtName || !briefArguments}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 disabled:scale-100"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating Brief...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>Generate Legal Brief</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Template Library */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Template Library</h3>
            <div className="space-y-3">
              {templates.map((template, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                  <h4 className="font-medium text-gray-900">{template.name}</h4>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Generated Brief */}
          {generatedBrief && (
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Generated Brief</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    title="Copy brief"
                  >
                    <Copy className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    onClick={downloadBrief}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    title="Download brief"
                  >
                    <Download className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <textarea
                  value={generatedBrief}
                  onChange={(e) => setGeneratedBrief(e.target.value)}
                  className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none font-mono text-sm"
                />
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Brief generated successfully</span>
                </div>
                <div className="text-sm text-gray-500">
                  {generatedBrief.length} characters
                </div>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Professional formatting and structure</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Proper legal citation formatting</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Argument structure optimization</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Multiple brief types supported</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalBriefGenerator;