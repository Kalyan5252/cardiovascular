import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, LineChart, PieChart, Activity } from 'lucide-react';

const ModelAccuracy = () => {
  // Manually listed to match what we verified earlier
  const images = [
    {
      src: '/images/ROC curve ANN.png',
      title: 'ROC Curve Analysis',
      icon: Activity,
      desc: 'Trade-off between sensitivity and specificity.',
    },
    {
      src: '/images/confusion matrix ANN.png',
      title: 'Confusion Matrix',
      icon: BarChart2,
      desc: 'Visualizing the performance of the classification algorithm.',
    },
    {
      src: '/images/precision recall curve.png',
      title: 'Precision-Recall',
      icon: PieChart,
      desc: 'Shows the trade-off between precision and recall.',
    },
    {
      src: '/images/training vs validation.png',
      title: 'Training History',
      icon: LineChart,
      desc: 'Model accuracy and loss over training epochs.',
    },
  ];

  return (
    <div className="space-y-10">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Model Performance
          </h2>
          <p className="text-slate-500 mt-2 text-lg">
            Comprehensive evaluation metrics and visualization plots.
          </p>
        </div>
        <div className="hidden md:flex gap-4">
          <div className="text-center px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="text-2xl font-bold text-emerald-600">92.4%</div>
            <div className="text-xs font-bold text-slate-400 uppercase">
              Accuracy
            </div>
          </div>
          <div className="text-center px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="text-2xl font-bold text-blue-600">0.89</div>
            <div className="text-xs font-bold text-slate-400 uppercase">
              AUC Score
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="p-6 border-b border-slate-50 flex items-start justify-between bg-slate-50/30">
              <div>
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <img.icon size={18} className="text-primary" />
                  {img.title}
                </h3>
                <p className="text-sm text-slate-500 mt-1">{img.desc}</p>
              </div>
            </div>

            <div className="p-6">
              <div className="w-full aspect-auto bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden border border-slate-100 relative">
                <img
                  src={img.src}
                  alt={img.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://via.placeholder.com/600x400?text=Visualization+Not+Found';
                  }}
                  className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ModelAccuracy;
