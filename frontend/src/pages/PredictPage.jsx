import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, UploadCloud, Database } from 'lucide-react';
import PredictionForm from '../components/PredictionForm';
import FileUpload from '../components/FileUpload';
import ResultCard from '../components/ResultCard';
import api from '../lib/api';

const PredictPage = () => {
  const [activeTab, setActiveTab] = useState('manual');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [batchResults, setBatchResults] = useState(null);
  const [error, setError] = useState(null);

  const handleManualSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await api.post('/predict/single', data);
      setResult(response.data);
    } catch (err) {
      setError('Analysis failed. Please check your inputs and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) {
      setBatchResults(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.post('/predict/batch', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setBatchResults(response.data.results);
    } catch (err) {
      setError('Batch analysis failed. Ensure the file format is correct.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 p-10 text-white shadow-xl">
        <div className="relative z-10">
          <h2 className="text-4xl font-bold">New Assessment</h2>
          <p className="mt-3 text-slate-300 max-w-xl text-lg">
            Use advanced AI to analyze key cardiovascular metrics. Enter data
            manually for single patients or upload datasets for bulk processing.
          </p>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/20 to-transparent"></div>
        <div className="absolute -right-10 -bottom-20 opacity-10">
          <Activity size={300} />
        </div>
      </div>

      {/* Main Mode Switch */}
      <div className="flex justify-center py-1.5 px-2.5 bg-slate-200/50 backdrop-blur-sm rounded-full w-fit mx-auto border border-white/50 shadow-inner">
        {[
          { id: 'manual', label: 'Manual Diagnosis', icon: Activity },
          { id: 'batch', label: 'Batch Processing', icon: Database },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-white text-slate-900 shadow-md transform scale-105'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium flex items-center justify-center shadow-sm"
          >
            {error}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'manual' ? (
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-12 xl:col-span-7">
                  <PredictionForm
                    onSubmit={handleManualSubmit}
                    isLoading={loading}
                  />
                </div>

                <div className="lg:col-span-12 xl:col-span-5 sticky top-24">
                  <AnimatePresence mode="wait">
                    {result ? (
                      <ResultCard result={result} />
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white/50 border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center text-slate-400 min-h-[400px]"
                      >
                        <div className="w-20 h-20 bg-white rounded-full mb-6 flex items-center justify-center shadow-sm">
                          <Activity size={40} className="text-slate-300" />
                        </div>
                        <h4 className="text-xl font-semibold text-slate-500">
                          Analysis Pending
                        </h4>
                        <p className="mt-2 text-center max-w-xs">
                          Fill out the clinical data form to generate a
                          real-time risk assessment.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="space-y-8 max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                  <FileUpload onFileUpload={handleFileUpload} />
                </div>

                {loading && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-slate-500 font-medium">
                      Processing large dataset...
                    </p>
                  </div>
                )}

                {batchResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
                  >
                    <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                      <h3 className="font-bold text-slate-700">
                        Analysis Results
                      </h3>
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                        {batchResults.length} Records Processed
                      </span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-slate-50">
                          <tr>
                            {[
                              'Row',
                              'Age',
                              'Sex',
                              'Risk Probability',
                              'Diagnosis',
                            ].map((h) => (
                              <th
                                key={h}
                                className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider"
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-50">
                          {batchResults.slice(0, 10).map((row, idx) => (
                            <tr
                              key={idx}
                              className="hover:bg-slate-50/80 transition-colors"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">
                                #{idx + 1}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-medium">
                                {row.age || '-'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                                {row.sex || '-'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <div className="flex items-center gap-2">
                                  <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full ${row.probability > 0.5 ? 'bg-red-500' : 'bg-green-500'}`}
                                      style={{
                                        width: `${(row.probability || 0) * 100}%`,
                                      }}
                                    ></div>
                                  </div>
                                  <span className="font-medium text-slate-600">
                                    {row.probability
                                      ? (row.probability * 100).toFixed(0) + '%'
                                      : '-'}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
                                    row.prediction === 1
                                      ? 'bg-red-100 text-red-600'
                                      : 'bg-green-100 text-green-600'
                                  }`}
                                >
                                  {row.prediction === 1
                                    ? 'HIGH RISK'
                                    : 'LOW RISK'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {batchResults.length > 10 && (
                      <div className="p-4 text-center text-sm text-slate-500 bg-slate-50 border-t border-slate-100">
                        Showing first 10 of {batchResults.length} records
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PredictPage;
