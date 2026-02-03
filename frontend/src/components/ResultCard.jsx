import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  AlertTriangle,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { cn } from '../lib/utils';

const ResultCard = ({ result, onClose }) => {
  if (!result) return null;

  const isRisk = result.prediction === 1;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'rounded-3xl p-8 shadow-xl border overflow-hidden relative',
        isRisk
          ? 'bg-gradient-to-br from-red-50 to-white border-red-100'
          : 'bg-gradient-to-br from-emerald-50 to-white border-emerald-100',
      )}
    >
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div
            className={cn(
              'p-4 rounded-2xl shadow-sm inline-flex',
              isRisk
                ? 'bg-red-100 text-red-600'
                : 'bg-emerald-100 text-emerald-600',
            )}
          >
            {isRisk ? <AlertTriangle size={32} /> : <CheckCircle2 size={32} />}
          </div>

          <span
            className={cn(
              'px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border',
              isRisk
                ? 'bg-red-100 border-red-200 text-red-700'
                : 'bg-emerald-100 border-emerald-200 text-emerald-700',
            )}
          >
            {isRisk ? 'Attention Needed' : 'Normal Results'}
          </span>
        </div>

        <h3
          className={cn(
            'text-3xl font-bold mb-2',
            isRisk ? 'text-red-900' : 'text-emerald-900',
          )}
        >
          {isRisk ? 'High Risk Detected' : 'Low Risk Detected'}
        </h3>

        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-slate-500 font-medium">Probability Score:</span>
          <span
            className={cn(
              'text-4xl font-extrabold',
              isRisk ? 'text-red-600' : 'text-emerald-600',
            )}
          >
            {(result.probability * 100).toFixed(1)}%
          </span>
        </div>

        {isRisk && (
          <div className="bg-white/80 p-5 rounded-2xl border border-red-100 shadow-sm backdrop-blur-sm">
            <div className="text-sm font-bold text-red-800 mb-2 flex items-center gap-2">
              <Activity size={16} />
              Recommendation
            </div>
            <p className="text-sm text-red-700 leading-relaxed">
              The model indicates a high probability of cardiovascular issues.
              Immediate consultation with a cardiologist is recommended.
            </p>
            {/* <div className="mt-4 pt-4 border-t border-red-100 flex justify-end">
              <button className="text-red-700 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Find a Specialist <ArrowRight size={16} />
              </button>
            </div> */}
          </div>
        )}
      </div>

      {/* Decorative Background */}
      <div
        className="absolute top-0 right-0 -mr-24 -mt-24 w-64 h-64 rounded-full bg-current opacity-5 blur-3xl pointer-events-none"
        style={{ color: isRisk ? '#EF4444' : '#10B981' }}
      />
    </motion.div>
  );
};

export default ResultCard;
