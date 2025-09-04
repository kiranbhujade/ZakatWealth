import React, { useState } from 'react';
import { Search, TrendingUp, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { motion } from 'framer-motion';

export const HalalMeter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sampleAnalyses = {
    'tesla': {
      name: 'Tesla Inc. (TSLA)',
      score: 85,
      grade: 'A',
      factors: {
        ribaFree: true,
        ghararLevel: 'low',
        haram: false,
        ethicalScore: 90,
        environmentalScore: 95
      },
      details: {
        business: 'Electric vehicles and clean energy',
        concerns: 'Minor: Small interest income from treasury',
        recommendation: 'Highly recommended for Islamic portfolio'
      }
    },
    'apple': {
      name: 'Apple Inc. (AAPL)',
      score: 92,
      grade: 'A+',
      factors: {
        ribaFree: true,
        ghararLevel: 'low',
        haram: false,
        ethicalScore: 85,
        environmentalScore: 80
      },
      details: {
        business: 'Technology hardware and services',
        concerns: 'None significant',
        recommendation: 'Excellent choice for halal investment'
      }
    },
    'microsoft': {
      name: 'Microsoft Corp. (MSFT)',
      score: 88,
      grade: 'A',
      factors: {
        ribaFree: true,
        ghararLevel: 'low',
        haram: false,
        ethicalScore: 88,
        environmentalScore: 85
      },
      details: {
        business: 'Software and cloud services',
        concerns: 'Minimal interest income',
        recommendation: 'Strong halal investment option'
      }
    }
  };

  const handleAnalyze = () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const key = searchTerm.toLowerCase();
      const result = sampleAnalyses[key as keyof typeof sampleAnalyses] || {
        name: searchTerm.toUpperCase(),
        score: Math.floor(Math.random() * 40) + 60,
        grade: 'B',
        factors: {
          ribaFree: Math.random() > 0.3,
          ghararLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
          haram: Math.random() > 0.7,
          ethicalScore: Math.floor(Math.random() * 40) + 60,
          environmentalScore: Math.floor(Math.random() * 40) + 60
        },
        details: {
          business: 'Analysis based on available data',
          concerns: 'Please verify with Islamic scholars',
          recommendation: 'Requires further research'
        }
      };
      
      setAnalysis(result);
      setIsLoading(false);
    }, 1500);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600';
    if (score >= 70) return 'text-gold-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 85) return 'from-emerald-500 to-emerald-600';
    if (score >= 70) return 'from-gold-500 to-gold-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <section id="tools" className="py-20 bg-gradient-to-br from-parchment-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-emerald-950 mb-4">
            Halal-o-Meter™
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Instantly analyze any investment through the lens of Islamic principles. 
            Our AI-powered tool evaluates stocks, bonds, and businesses for Sharia compliance.
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
                  placeholder="Enter company name or stock symbol (e.g., Tesla, AAPL, Microsoft)"
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
                {isLoading ? 'Analyzing...' : 'Analyze'}
              </Button>
            </div>
          </Card>

          {/* Analysis Results */}
          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Score Circle */}
                  <div className="text-center">
                    <div className="relative inline-block">
                      <div className="w-48 h-48 mx-auto relative">
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
                            stroke="url(#gradient)"
                            strokeWidth="8"
                            fill="transparent"
                            strokeLinecap="round"
                            strokeDasharray={`${analysis.score * 2.51}, 251`}
                            className="transition-all duration-1000 ease-out"
                          />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" className={getScoreBackground(analysis.score).split(' ')[0].replace('from-', 'stop-')} />
                              <stop offset="100%" className={getScoreBackground(analysis.score).split(' ')[1].replace('to-', 'stop-')} />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className={`text-4xl font-bold ${getScoreColor(analysis.score)}`}>
                              {analysis.score}
                            </div>
                            <div className="text-sm text-gray-500">Halal Score</div>
                            <div className={`text-2xl font-bold ${getScoreColor(analysis.score)} mt-1`}>
                              {analysis.grade}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-emerald-950 mt-4">
                      {analysis.name}
                    </h3>
                  </div>

                  {/* Compliance Factors */}
                  <div className="space-y-6">
                    <h4 className="text-xl font-semibold text-emerald-950 mb-4">
                      Islamic Compliance Analysis
                    </h4>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <span className="font-medium">Riba (Interest) Free</span>
                        {analysis.factors.ribaFree ? (
                          <div className="flex items-center gap-2 text-emerald-600">
                            <CheckCircle className="h-5 w-5" />
                            <span>Compliant</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-red-600">
                            <XCircle className="h-5 w-5" />
                            <span>Non-Compliant</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <span className="font-medium">Gharar (Uncertainty) Level</span>
                        <Badge 
                          variant={
                            analysis.factors.ghararLevel === 'low' ? 'success' : 
                            analysis.factors.ghararLevel === 'medium' ? 'warning' : 'error'
                          }
                        >
                          {analysis.factors.ghararLevel.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <span className="font-medium">Haram Industries</span>
                        {!analysis.factors.haram ? (
                          <div className="flex items-center gap-2 text-emerald-600">
                            <CheckCircle className="h-5 w-5" />
                            <span>Clean</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-red-600">
                            <AlertTriangle className="h-5 w-5" />
                            <span>Involved</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <span className="font-medium">Ethical Practices</span>
                        <span className={`font-semibold ${getScoreColor(analysis.factors.ethicalScore)}`}>
                          {analysis.factors.ethicalScore}%
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <span className="font-medium">Environmental Impact</span>
                        <span className={`font-semibold ${getScoreColor(analysis.factors.environmentalScore)}`}>
                          {analysis.factors.environmentalScore}%
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                      <h5 className="font-semibold text-emerald-900 mb-2">Recommendation</h5>
                      <p className="text-emerald-800">{analysis.details.recommendation}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Business Overview</h5>
                      <p className="text-gray-600">{analysis.details.business}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Islamic Concerns</h5>
                      <p className="text-gray-600">{analysis.details.concerns}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Sample Analyses */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-emerald-950 mb-6 text-center">
              Try These Popular Stocks
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {Object.entries(sampleAnalyses).map(([key, data]) => (
                <Button
                  key={key}
                  variant="outline"
                  onClick={() => {
                    setSearchTerm(key);
                    setTimeout(() => handleAnalyze(), 100);
                  }}
                  className="p-4 h-auto flex flex-col items-center"
                >
                  <TrendingUp className="h-6 w-6 mb-2" />
                  <span className="font-semibold">{data.name.split('(')[0].trim()}</span>
                  <span className="text-xs text-gray-500">Score: {data.score}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
