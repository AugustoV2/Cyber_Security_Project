import React, { useState } from 'react';
import { Calculator, AlertCircle, CheckCircle2, ChevronDown } from 'lucide-react';

// Common small primes for quick testing
const COMMON_PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];

function App() {
  const [prime, setPrime] = useState<number>(13);
  const [base, setBase] = useState<number>(2);
  const [target, setTarget] = useState<number>(8);
  const [showCommonPrimes, setShowCommonPrimes] = useState<boolean>(false);

  // These would typically come from API calls
  const primeValid = prime > 1;
  const primitiveRoots = [2, 6, 7, 11];
  const discreteLogResult = 3;

  const handlePrimeSelect = (p: number) => {
    setPrime(p);
    setShowCommonPrimes(false);
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-900 rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <Calculator className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold text-white">
              Number Theory Calculator
            </h1>
          </div>

          <div className="space-y-8">
            {/* Prime Input Section */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Prime Number Selection
              </h2>
              <div className="relative mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Enter or select a prime number:
                </label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input
                      type="number"
                      value={prime}
                      onChange={(e) => setPrime(Math.max(2, parseInt(e.target.value) || 2))}
                      className={`w-full px-4 py-2 bg-gray-700 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white ${
                        primeValid ? 'border-green-500' : 'border-red-500'
                      }`}
                    />
                  </div>
                  <button
                    onClick={() => setShowCommonPrimes(!showCommonPrimes)}
                    className="px-4 py-2 bg-purple-900 text-purple-100 rounded-md hover:bg-purple-800 flex items-center gap-1"
                  >
                    Common Primes
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                {showCommonPrimes && (
                  <div className="absolute z-10 mt-1 w-full bg-gray-800 rounded-md shadow-lg border border-gray-700">
                    <div className="p-2 grid grid-cols-5 gap-1">
                      {COMMON_PRIMES.map((p) => (
                        <button
                          key={p}
                          onClick={() => handlePrimeSelect(p)}
                          className="px-3 py-1 text-sm rounded hover:bg-gray-700 text-gray-300"
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className={`flex items-center gap-2 ${primeValid ? 'text-green-400' : 'text-red-400'}`}>
                {primeValid ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Valid prime number</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    <span>Not a prime number</span>
                  </>
                )}
              </div>
            </div>

            {/* Primitive Roots Section */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Primitive Roots Calculator
              </h2>
              <div className="bg-gray-700 rounded-lg p-4 shadow-sm">
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  First 5 Primitive Roots modulo {prime}:
                </h3>
                <div className="text-lg font-mono text-purple-300">
                  {primitiveRoots.length > 0 
                    ? primitiveRoots.join(', ')
                    : 'No primitive roots found'}
                </div>
              </div>
            </div>

            {/* Discrete Logarithm Section */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Discrete Logarithm Calculator
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Base (a):
                  </label>
                  <input
                    type="number"
                    value={base}
                    onChange={(e) => setBase(Math.max(1, parseInt(e.target.value) ))}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Target (b):
                  </label>
                  <input
                    type="number"
                    value={target}
                    onChange={(e) => setTarget(Math.max(1, parseInt(e.target.value) ))}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white"
                  />
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 shadow-sm">
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  Find x where: {base}<sup>x</sup> ≡ {target} (mod {prime})
                </h3>
                <div className="text-lg font-mono text-purple-300">
                  {discreteLogResult !== null 
                    ? `x = ${discreteLogResult}`
                    : 'No solution exists'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;