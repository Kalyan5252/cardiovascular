import React, { useState } from 'react';
import { FIELD_METADATA } from '../lib/constants';
import { cn } from '../lib/utils';
import { ChevronDown, Sparkles } from 'lucide-react';

const PredictionForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-pink-500 rounded-full"></span>
          Patient Vitals
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {FIELD_METADATA.map((field) => (
            <div key={field.name} className="space-y-2 group">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 group-focus-within:text-primary transition-colors">
                {field.label}
              </label>
              {field.type === 'select' ? (
                <div className="relative">
                  <select
                    name={field.name}
                    required
                    className="input-modern appearance-none cursor-pointer"
                    onChange={handleChange}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select option
                    </option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-3.5 pointer-events-none text-slate-400 group-hover:text-primary transition-colors">
                    <ChevronDown size={18} />
                  </div>
                </div>
              ) : (
                <input
                  type={field.type === 'number' ? 'number' : 'text'}
                  step={field.step || '1'}
                  name={field.name}
                  placeholder={field.placeholder}
                  required
                  className="input-modern placeholder:text-slate-300"
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            'btn-primary flex items-center gap-2 text-base',
            isLoading && 'opacity-70 cursor-wait',
          )}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Analyze Risk Factors
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default PredictionForm;
