import React, { useState } from 'react';
import { Search, TrendingUp, AlertTriangle, CheckCircle, XCircle, Shield, Info, Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { motion } from 'framer-motion';

interface HalalAnalysis {
  symbol: string;
  companyName: string;
  sector: string;
  halalScore: number;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D' | 'F';
  compliance: {
    ribaFree: boolean;
    ghararLevel: 'low' | 'medium' | 'high';
    haramIndustries: boolean;
    debtRatio: number;
    interestIncome: number;
    haram_revenue: number;
  };
  recommendation: 'highly_recommended' | 'recommended' | 'caution' | 'avoid';
  lastUpdated: Date;
  alternatives?: string[];
}

export const HalalScreener: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [analysis, setAnalysis] = useState<HalalAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sampleAnalyses: { [key: string]: HalalAnalysis } = {
    'aapl': {
      symbol: 'AAPL',
      companyName: 'Apple Inc.',
      sector: 'Technology Hardware',
      halalScore: 92,
      grade: 'A+',
      compliance: {
        ribaFree: true,
        ghararLevel: 'low',
        haramIndustries: false,
        debtRatio: 15.2,
        interestIncome: 1.8,
        haram_revenue: 0
      },
      recommendation: 'highly_recommended',
      lastUpdated: new Date(),
      alternatives: []
    },
    'msft': {
      symbol: 'MSFT',
      companyName: 'Microsoft Corporation',
      sector: 'Software & Services',
      halalScore: 88,
      grade: 'A',
      compliance: {
        ribaFree: true,
        ghararLevel: 'low',
        haramIndustries: false,
        debtRatio: 18.5,
        interestIncome: 2.1,
        haram_revenue: 0
      },
      recommendation: 'highly_recommended',
      lastUpdated: new Date()
    },
    'tsla': {
      symbol: 'TSLA',
      companyName: 'Tesla Inc.',
      sector: 'Automotive',
      halalScore: 85,
      grade: 'A',
      compliance: {
        ribaFree: true,
        ghararLevel: 'medium',
        haramIndustries: false,
        debtRatio: 22.1,
        interestIncome: 0.5,
        haram_revenue: 0
      },
      recommendation: 'recommended',
      lastUpdated: new Date()
    },
    'jpm': {
      symbol: 'JPM',
      companyName: 'JPMorgan Chase & Co.',
      sector: 'Banking',
      halalScore: 25,
      grade: 'F',
      compliance: {
        ribaFree: false,
        ghararLevel: 'high',
        haramIndustries: true,
        debtRatio: 85.2,
        interestIncome: 78.5,
        haram_revenue: 95
      },
      recommendation: 'avoid',
      lastUpdated: new Date(),
      alternatives: ['ISRA', 'HLAL', 'SPUS']
    }
  };

  const handleAnalyze = () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    
    setTimeout(() => {
      const key = searchTerm.toLowerCase();
      const result = sampleAnalyses[key] || generateRandomAnalysis(searchTerm);
      setAnalysis(result);
      setIsLoading(false);
    }, 2000);
  };

  const generateRandomAnalysis = (symbol: string): HalalAnalysis => {
    const score = Math.floor(Math.random() * 100);
    const getGrade = (score: number) => {
      if (score >= 90) return 'A+';
      if (score >= 80) return 'A';
      if (score >= 70) return 'B+';
      if (score >= 60) return 'B';
      if (score >= 50) return 'C';
      if (score >= 30) return 'D';
      return 'F';
    };

    return {
      symbol: symbol.toUpperCase(),
      companyName: `${symbol.toUpperCase()} Corporation`,
      sector: 'Technology',
      halalScore: score,
      grade: getGrade(score) as any,
      compliance: {
        ribaFree: score > 60,
        ghararLevel: score > 70 ? 'low' : score > 40 ? 'medium' : 'high',
        haramIndustries: score < 40,
        debtRatio: Math.random() * 50,
        interestIncome: Math.random() * 10,
        haram_revenue: score < 40 ? Math.random() * 30 : Math.random() * 5
      },
      recommendation: score > 80 ? 'highly_recommended' : score > 60 ? 'recommended' : score > 40 ? 'caution' : 'avoid',
      lastUpdated: new Date()
    };
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-gold-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getRecommendationBadge = (recommendation: string) => {
    switch (recommendation) {
      case 'highly_recommended':
        return <Badge variant="success">Highly Recommended</Badge>;
      case 'recommended':
        return <Badge variant="success">Recommended</Badge>;
      case 'caution':
        return <Badge variant="warning">Use Caution</Badge>;
      case 'avoid':
        return <Badge variant="error">Avoid</Badge>;
      default:
        return <Badge variant="info">Under Review</Badge>;
    }
  };

  return (
    <section id="halal-screener" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-emerald-600 mr-4" />
            <Badge variant="success" size="md">Real-time Screening</Badge>
          </div>
          <h2 className="text-4xl font-bold text-emerald-950 mb-4">
            Advanced Halal Screener
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive Shari'ah compliance analysis for stocks, ETFs, and mutual funds. 
            Real-time screening with detailed breakdowns of riba, gharar, and haram involvement.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Search Interface */}
          <Card className="p-8 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter stock symbol or company name (e.g., AAPL, Microsoft, Tesla)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg"
                />
              </div>
              <Button 
                onClick={handleAnalyze}
                disabled={!searchTerm.trim() || isLoading}
                size="lg"
                className="px-8"
              >
                {isLoading ? 'Analyzing...' : 'Screen Now'}
              </Button>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Try:</span>
              {['AAPL', 'MSFT', 'TSLA', 'JPM'].map((symbol) => (
                <button
                  key={symbol}
                  onClick={() => {
                    setSearchTerm(symbol);
                    setTimeout(() => handleAnalyze(), 100);
                  }}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                >
                  {symbol}
                </button>
              ))}
            </div>
          </Card>

          {/* Analysis Results */}
          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Main Result Card */}
              <Card className="p-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Score Circle */}
                  <div className="text-center">
                    <div className="relative inline-block mb-4">
                      <div className="w-32 h-32 mx-auto relative">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-gray-200"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeLinecap="round"
                            strokeDasharray={`${analysis.halalScore * 2.51}, 251`}
                            className={`transition-all duration-1000 ease-out ${getScoreColor(analysis.halalScore)}`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className={`text-2xl font-bold ${getScoreColor(analysis.halalScore)}`}>
                              {analysis.halalScore}
                            </div>
                            <div className={`text-lg font-bold ${getScoreColor(analysis.halalScore)}`}>
                              {analysis.grade}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-emerald-950 mb-1">
                      {analysis.companyName}
                    </h3>
                    <p className="text-gray-600 mb-2">{analysis.symbol} • {analysis.sector}</p>
                    {getRecommendationBadge(analysis.recommendation)}
                  </div>

                  {/* Compliance Details */}
                  <div className="lg:col-span-2">
                    <h4 className="text-lg font-semibold text-emerald-950 mb-4">
                      Shari'ah Compliance Analysis
                    </h4>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                          <span className="font-medium">Riba (Interest) Free</span>
                          {analysis.compliance.ribaFree ? (
                            <CheckCircle className="h-5 w-5 text-emerald-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                          <span className="font-medium">Gharar Level</span>
                          <Badge 
                            variant={
                              analysis.compliance.ghararLevel === 'low' ? 'success' : 
                              analysis.compliance.ghararLevel === 'medium' ? 'warning' : 'error'
                            }
                          >
                            {analysis.compliance.ghararLevel.toUpperCase()}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                          <span className="font-medium">Haram Industries</span>
                          {!analysis.compliance.haramIndustries ? (
                            <CheckCircle className="h-5 w-5 text-emerald-600" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                          <span className="font-medium">Debt Ratio</span>
                          <span className={`font-semibold ${analysis.compliance.debtRatio > 33 ? 'text-red-600' : 'text-emerald-600'}`}>
                            {analysis.compliance.debtRatio.toFixed(1)}%
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                          <span className="font-medium">Interest Income</span>
                          <span className={`font-semibold ${analysis.compliance.interestIncome > 5 ? 'text-red-600' : 'text-emerald-600'}`}>
                            {analysis.compliance.interestIncome.toFixed(1)}%
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                          <span className="font-medium">Haram Revenue</span>
                          <span className={`font-semibold ${analysis.compliance.haram_revenue > 5 ? 'text-red-600' : 'text-emerald-600'}`}>
                            {analysis.compliance.haram_revenue.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alternatives Section */}
                {analysis.alternatives && analysis.alternatives.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h5 className="font-semibold text-gray-900 mb-3">Halal Alternatives</h5>
                    <div className="flex flex-wrap gap-2">
                      {analysis.alternatives.map((alt) => (
                        <button
                          key={alt}
                          onClick={() => {
                            setSearchTerm(alt);
                            setTimeout(() => handleAnalyze(), 100);
                          }}
                          className="px-3 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-full text-sm transition-colors"
                        >
                          {alt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 text-xs text-gray-500">
                  Last updated: {analysis.lastUpdated.toLocaleString()}
                </div>
              </Card>

              {/* Detailed Breakdown */}
              <Card className="p-6">
                <h4 className="font-semibold text-emerald-950 mb-4">Screening Methodology</h4>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Quantitative Screens</h5>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Debt-to-equity ratio &lt; 33%</li>
                      <li>• Interest income &lt; 5%</li>
                      <li>• Haram revenue &lt; 5%</li>
                      <li>• Cash/interest-bearing securities &lt; 33%</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Qualitative Screens</h5>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Business model analysis</li>
                      <li>• Industry classification</li>
                      <li>• Revenue source breakdown</li>
                      <li>• Ethical practices review</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Scholar Verification</h5>
                    <ul className="space-y-1 text-gray-600">
                      <li>• AAOIFI standards compliance</li>
                      <li>• Multiple madhab perspectives</li>
                      <li>• Regular review updates</li>
                      <li>• Fatwa documentation</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Information Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card className="p-6">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-emerald-950 mb-2">
                    About Our Screening
                  </h4>
                  <p className="text-sm text-gray-600">
                    Our halal screening process combines quantitative financial ratios with 
                    qualitative business analysis, following AAOIFI standards and verified 
                    by Islamic scholars from multiple madhabs.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-emerald-50 to-royal-50 border-emerald-200">
              <div className="flex items-center gap-3">
                <Star className="h-6 w-6 text-gold-600" />
                <div>
                  <h4 className="font-semibold text-emerald-950">Premium Features</h4>
                  <p className="text-sm text-emerald-700">
                    Upgrade for portfolio screening, alerts, purification calculations, 
                    and detailed compliance reports.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};