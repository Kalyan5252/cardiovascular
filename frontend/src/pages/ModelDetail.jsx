import React from 'react';
import { Cpu, Layers, GitMerge, CheckCircle2 } from 'lucide-react';

const ModelDetail = () => {
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-10 text-white shadow-xl">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold">Model Architecture</h2>
          <p className="mt-2 text-slate-300 text-lg">
            Deep Learning Neural Network optimized for tabular health data.
          </p>
        </div>
        <Cpu
          className="absolute right-10 top-1/2 -translate-y-1/2 opacity-20"
          size={120}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Layers className="text-primary" />
              Network Configuration
            </h3>

            <div className="space-y-6">
              <div className="relative pl-8 border-l-2 border-primary/20 space-y-8">
                <div className="relative">
                  <span className="absolute -left-[40px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm"></span>
                  <h4 className="font-bold text-slate-800">Input Layer</h4>
                  <p className="text-sm text-slate-500 mt-1">
                    Accepts 13 standardized features including vitals and lab
                    results.
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[40px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white shadow-sm"></span>
                  <h4 className="font-bold text-slate-800">
                    Hidden Dense Layers
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">
                    Multi-layer perceptron with ReLU activation functions for
                    non-linear pattern recognition. Includes Dropout (0.3) for
                    regularization.
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[40px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm"></span>
                  <h4 className="font-bold text-slate-800">Output Layer</h4>
                  <p className="text-sm text-slate-500 mt-1">
                    Sigmoid activation function producing a probability score
                    (0-1) for binary classification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <GitMerge className="text-indigo-500" />
              Preprocessing Pipeline
            </h3>
            <ul className="space-y-3">
              {[
                'Standard Scaling (Numerical)',
                'One-Hot Encoding (Categorical)',
                'Binary Mapping',
                'Missing Value Imputation',
              ].map((step) => (
                <li
                  key={step}
                  className="flex items-center gap-3 text-sm font-medium text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100"
                >
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  {step}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-primary to-pink-600 rounded-3xl p-8 shadow-lg shadow-primary/25 text-white">
            <h3 className="text-lg font-bold mb-2">Confidence Score</h3>
            <div className="text-5xl font-extrabold mb-1">92%</div>
            <p className="text-white/80 text-sm">
              Average accuracy on test validation sets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetail;
