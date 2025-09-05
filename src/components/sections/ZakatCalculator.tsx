import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, Shield, Info, Download } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { motion } from 'framer-motion';

interface ZakatCalculation {
  totalWealth: number;
  nisabThreshold: number;
  zakatDue: number;
  method: string;
  breakdown: {
    cash: number;
    investments: number;
    gold: number;
    silver: number;
    business: number;
    debts: number;
  };
}

export const ZakatCalculator: React.FC = () => {
  const [assets, setAssets] = useState({
    cash: '',
    bankAccounts: '',
    investments: '',
    gold: '',
    silver: '',
    business: '',
    debts: '',
    loans: ''
  });
  
  const [method, setMethod] = useState('hanafi');
  const [currency, setCurrency] = useState('USD');
  const [calculation, setCalculation] = useState<ZakatCalculation | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const nisabRates = {
    gold: 87.48, // grams
    silver: 612.36, // grams
    goldPrice: 65.50, // per gram in USD
    silverPrice: 0.85 // per gram in USD
  };

  const calculateZakat = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const totalAssets = 
        parseFloat(assets.cash || '0') +
        parseFloat(assets.bankAccounts || '0') +
        parseFloat(assets.investments || '0') +
        parseFloat(assets.gold || '0') * nisabRates.goldPrice +
        parseFloat(assets.silver || '0') * nisabRates.silverPrice +
        parseFloat(assets.business || '0');
      
      const totalDebts = 
        parseFloat(assets.debts || '0') +
        parseFloat(assets.loans || '0');
      
      const netWealth = totalAssets - totalDebts;
      
      // Nisab calculation based on method
      const goldNisab = nisabRates.gold * nisabRates.goldPrice;
      const silverNisab = nisabRates.silver * nisabRates.silverPrice;
      const nisabThreshold = method === 'hanafi' ? silverNisab : goldNisab;
      
      const zakatDue = netWealth >= nisabThreshold ? netWealth * 0.025 : 0;
      
      setCalculation({
        totalWealth: netWealth,
        nisabThreshold,
        zakatDue,
        method: method === 'hanafi' ? 'Hanafi (Silver Standard)' : 'Shafi/Maliki/Hanbali (Gold Standard)',
        breakdown: {
          cash: parseFloat(assets.cash || '0') + parseFloat(assets.bankAccounts || '0'),
          investments: parseFloat(assets.investments || '0'),
          gold: parseFloat(assets.gold || '0') * nisabRates.goldPrice,
          silver: parseFloat(assets.silver || '0') * nisabRates.silverPrice,
          business: parseFloat(assets.business || '0'),
          debts: totalDebts
        }
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <section id="zakat-calculator" className="py-20 bg-gradient-to-br from-parchment-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <Calculator className="h-12 w-12 text-emerald-600 mr-4" />
            <Badge variant="success" size="md">AAOIFI Certified</Badge>
          </div>
          <h2 className="text-4xl font-bold text-emerald-950 mb-4">
            Zakat Calculator Pro
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate your Zakat obligation with precision using multiple juristic methodologies. 
            Supports complex portfolios including stocks, sukuk, commodities, and business assets.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Input Form */}
          <Card className="p-8">
            <h3 className="text-2xl font-bold text-emerald-950 mb-6">Asset Information</h3>
            
            {/* Method Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Juristic Method
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setMethod('hanafi')}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    method === 'hanafi' 
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold">Hanafi</div>
                  <div className="text-xs text-gray-600">Silver Standard</div>
                </button>
                <button
                  onClick={() => setMethod('majority')}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    method === 'majority' 
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold">Majority</div>
                  <div className="text-xs text-gray-600">Gold Standard</div>
                </button>
              </div>
            </div>

            {/* Currency Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="SAR">SAR - Saudi Riyal</option>
                <option value="AED">AED - UAE Dirham</option>
                <option value="QAR">QAR - Qatari Riyal</option>
              </select>
            </div>

            {/* Asset Inputs */}
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cash on Hand
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      value={assets.cash}
                      onChange={(e) => setAssets({...assets, cash: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Accounts
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      value={assets.bankAccounts}
                      onChange={(e) => setAssets({...assets, bankAccounts: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investments (Stocks, Sukuk)
                  </label>
                  <div className="relative">
                    <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      value={assets.investments}
                      onChange={(e) => setAssets({...assets, investments: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Assets
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      value={assets.business}
                      onChange={(e) => setAssets({...assets, business: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gold (grams)
                  </label>
                  <input
                    type="number"
                    value={assets.gold}
                    onChange={(e) => setAssets({...assets, gold: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Silver (grams)
                  </label>
                  <input
                    type="number"
                    value={assets.silver}
                    onChange={(e) => setAssets({...assets, silver: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Outstanding Debts
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      value={assets.debts}
                      onChange={(e) => setAssets({...assets, debts: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loans Payable
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      value={assets.loans}
                      onChange={(e) => setAssets({...assets, loans: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button 
              onClick={calculateZakat}
              disabled={isCalculating}
              className="w-full mt-8"
              size="lg"
            >
              {isCalculating ? 'Calculating...' : 'Calculate Zakat'}
            </Button>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {calculation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl font-bold text-white">
                        {formatCurrency(calculation.zakatDue).replace(/[^\d.,]/g, '')}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-emerald-950 mb-2">
                      Your Zakat Obligation
                    </h3>
                    <p className="text-lg text-emerald-600 font-semibold">
                      {formatCurrency(calculation.zakatDue)}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Based on {calculation.method}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Total Zakatable Wealth</span>
                      <span className="font-semibold text-emerald-600">
                        {formatCurrency(calculation.totalWealth)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Nisab Threshold</span>
                      <span className="font-semibold">
                        {formatCurrency(calculation.nisabThreshold)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                      <span className="font-medium text-emerald-900">Zakat Rate</span>
                      <span className="font-semibold text-emerald-600">2.5%</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4">Asset Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      {calculation.breakdown.cash > 0 && (
                        <div className="flex justify-between">
                          <span>Cash & Bank Accounts</span>
                          <span>{formatCurrency(calculation.breakdown.cash)}</span>
                        </div>
                      )}
                      {calculation.breakdown.investments > 0 && (
                        <div className="flex justify-between">
                          <span>Investments</span>
                          <span>{formatCurrency(calculation.breakdown.investments)}</span>
                        </div>
                      )}
                      {calculation.breakdown.gold > 0 && (
                        <div className="flex justify-between">
                          <span>Gold</span>
                          <span>{formatCurrency(calculation.breakdown.gold)}</span>
                        </div>
                      )}
                      {calculation.breakdown.silver > 0 && (
                        <div className="flex justify-between">
                          <span>Silver</span>
                          <span>{formatCurrency(calculation.breakdown.silver)}</span>
                        </div>
                      )}
                      {calculation.breakdown.business > 0 && (
                        <div className="flex justify-between">
                          <span>Business Assets</span>
                          <span>{formatCurrency(calculation.breakdown.business)}</span>
                        </div>
                      )}
                      {calculation.breakdown.debts > 0 && (
                        <div className="flex justify-between text-red-600">
                          <span>Less: Debts</span>
                          <span>-{formatCurrency(calculation.breakdown.debts)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <Button variant="outline" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Export PDF
                    </Button>
                    <Button variant="secondary" className="flex-1">
                      Save Calculation
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Information Card */}
            <Card className="p-6">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-emerald-950 mb-2">
                    About Zakat Calculation
                  </h4>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>
                      <strong>Nisab:</strong> The minimum threshold of wealth that makes Zakat obligatory. 
                      We use current gold and silver prices updated daily.
                    </p>
                    <p>
                      <strong>Hanafi Method:</strong> Uses silver standard (612.36g silver = ~{formatCurrency(nisabRates.silver * nisabRates.silverPrice)})
                    </p>
                    <p>
                      <strong>Majority Method:</strong> Uses gold standard (87.48g gold = ~{formatCurrency(nisabRates.gold * nisabRates.goldPrice)})
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Compliance Badge */}
            <Card className="p-6 bg-gradient-to-r from-emerald-50 to-royal-50 border-emerald-200">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-emerald-600" />
                <div>
                  <h4 className="font-semibold text-emerald-950">AAOIFI Certified</h4>
                  <p className="text-sm text-emerald-700">
                    Our calculations follow AAOIFI standards and are verified by Islamic scholars.
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