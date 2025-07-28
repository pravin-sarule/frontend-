import React, { useState } from 'react';

import { ArrowLeft, Search, BarChart3, ExternalLink, BookOpen, Scale, Filter } from 'lucide-react';

interface CaseLawResearchProps {
  onBack: () => void;
}

const CaseLawResearch: React.FC<CaseLawResearchProps> = ({ onBack }) => {
  // const navigate = useNavigate(); // No longer needed as onBack prop is used
  const [searchQuery, setSearchQuery] = useState('');
  const [jurisdiction, setJurisdiction] = useState('federal');
  const [dateRange, setDateRange] = useState('all');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const jurisdictions = [
    { value: 'federal', label: 'Federal Courts' },
    { value: 'supreme', label: 'Supreme Court' },
    { value: 'circuit', label: 'Circuit Courts' },
    { value: 'district', label: 'District Courts' },
    { value: 'state', label: 'State Courts' },
    { value: 'all', label: 'All Jurisdictions' }
  ];

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: '1year', label: 'Past Year' },
    { value: '5years', label: 'Past 5 Years' },
    { value: '10years', label: 'Past 10 Years' }
  ];

  const performSearch = async () => {
    if (!searchQuery.trim()) {
      alert('Please enter a search query');
      return;
    }

    setIsSearching(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const sampleResults = [
        {
          id: 1,
          title: 'Bell Atlantic Corp. v. Twombly',
          citation: '550 U.S. 544 (2007)',
          court: 'Supreme Court',
          date: '2007-05-21',
          relevanceScore: 95,
          summary: 'Established the plausibility standard for federal civil procedure, requiring factual allegations that raise a right to relief above the speculative level.',
          keyPoints: [
            'Plausibility standard for Rule 12(b)(6) motions',
            'Replaced Conley v. Gibson notice pleading standard',
            'Requires more than conclusory allegations'
          ],
          citedBy: 15420,
          url: '#'
        },
        {
          id: 2,
          title: 'Ashcroft v. Iqbal',
          citation: '556 U.S. 662 (2009)',
          court: 'Supreme Court',
          date: '2009-05-18',
          relevanceScore: 92,
          summary: 'Clarified the Twombly plausibility standard, establishing a two-pronged approach for evaluating complaints under Rule 12(b)(6).',
          keyPoints: [
            'Two-pronged approach to motion to dismiss',
            'Legal conclusions not entitled to presumption of truth',
            'Factual allegations must be plausible'
          ],
          citedBy: 12850,
          url: '#'
        },
        {
          id: 3,
          title: 'Matrixx Initiatives, Inc. v. Siracusano',
          citation: '563 U.S. 27 (2011)',
          court: 'Supreme Court',
          date: '2011-03-22',
          relevanceScore: 88,
          summary: 'Applied Twombly/Iqbal standard to securities fraud claims, addressing materiality and statistical significance requirements.',
          keyPoints: [
            'Statistical significance not required for materiality',
            'Context-specific analysis required',
            'Plausibility standard applies to securities claims'
          ],
          citedBy: 3240,
          url: '#'
        },
        {
          id: 4,
          title: 'Tellabs, Inc. v. Makor Issues & Rights, Ltd.',
          citation: '551 U.S. 308 (2007)',
          court: 'Supreme Court',
          date: '2007-06-21',
          relevanceScore: 85,
          summary: 'Interpreted the Private Securities Litigation Reform Act\'s "strong inference" standard for scienter in securities fraud cases.',
          keyPoints: [
            'Strong inference standard for scienter',
            'Holistic evaluation of allegations',
            'Inference must be cogent and compelling'
          ],
          citedBy: 2890,
          url: '#'
        },
        {
          id: 5,
          title: 'Swierkiewicz v. Sorema N.A.',
          citation: '534 U.S. 506 (2002)',
          court: 'Supreme Court',
          date: '2002-03-26',
          relevanceScore: 82,
          summary: 'Held that employment discrimination complaints need not include specific facts establishing a prima facie case under McDonnell Douglas.',
          keyPoints: [
            'No heightened pleading standard for discrimination',
            'McDonnell Douglas not pleading requirement',
            'Notice pleading sufficient for Title VII claims'
          ],
          citedBy: 4560,
          url: '#'
        }
      ];

      setSearchResults(sampleResults);
    } catch (error) {
      alert('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const getRelevanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-orange-600 bg-orange-50';
    return 'text-gray-600 bg-gray-50';
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
          <h1 className="text-3xl font-bold text-gray-900">Case Law Research</h1>
          <p className="text-gray-600 mt-2">Find relevant cases and precedents with AI-powered legal research.</p>
        </div>
      </div>

      {/* Search Interface */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for cases, legal concepts, or citations..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
              onKeyPress={(e) => e.key === 'Enter' && performSearch()}
            />
          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Jurisdiction</label>
              <select
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {jurisdictions.map(j => (
                  <option key={j.value} value={j.value}>{j.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {dateRanges.map(d => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={performSearch}
                disabled={isSearching || !searchQuery.trim()}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 disabled:scale-100"
              >
                {isSearching ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Search Cases</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Search Results ({searchResults.length} cases found)
            </h2>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                <option value="relevance">Sort by Relevance</option>
                <option value="date">Sort by Date</option>
                <option value="citations">Sort by Citations</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {searchResults.map((result) => (
              <div key={result.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-orange-600 cursor-pointer">
                        {result.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRelevanceColor(result.relevanceScore)}`}>
                        {result.relevanceScore}% relevant
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center space-x-1">
                        <Scale className="w-4 h-4" />
                        <span>{result.citation}</span>
                      </span>
                      <span>{result.court}</span>
                      <span>{new Date(result.date).toLocaleDateString()}</span>
                      <span className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{result.citedBy.toLocaleString()} citations</span>
                      </span>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <ExternalLink className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">{result.summary}</p>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Key Points:</h4>
                  <ul className="space-y-1">
                    {result.keyPoints.map((point: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                      View Full Case
                    </button>
                    <button className="text-sm text-gray-600 hover:text-gray-700 font-medium">
                      Save to Research
                    </button>
                    <button className="text-sm text-gray-600 hover:text-gray-700 font-medium">
                      Find Similar Cases
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Relevance: {result.relevanceScore}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Research Tips */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Research Tips</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">Use specific legal terms</h4>
                <p className="text-sm text-gray-600">Include relevant legal concepts and terminology</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">Filter by jurisdiction</h4>
                <p className="text-sm text-gray-600">Narrow results to relevant courts and jurisdictions</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">Check citation analysis</h4>
                <p className="text-sm text-gray-600">Review how often cases are cited for authority</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">Use date filters</h4>
                <p className="text-sm text-gray-600">Focus on recent cases for current legal standards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseLawResearch;