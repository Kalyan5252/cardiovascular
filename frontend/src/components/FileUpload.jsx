import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileSpreadsheet, X, FileCheck } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles?.length > 0) {
        setFile(acceptedFiles[0]);
        onFileUpload(acceptedFiles[0]);
      }
    },
    [onFileUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
  });

  const removeFile = (e) => {
    e.stopPropagation();
    setFile(null);
    onFileUpload(null);
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={cn(
          'relative border-2 border-dashed rounded-3xl p-12 transition-all cursor-pointer text-center group bg-slate-50',
          isDragActive
            ? 'border-primary bg-primary/5 scale-[1.01]'
            : 'border-slate-200 hover:border-primary/50 hover:bg-slate-100/50',
        )}
      >
        <input {...getInputProps()} />

        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <div
                className={cn(
                  'p-5 rounded-full bg-white shadow-sm text-slate-400 group-hover:text-primary group-hover:scale-110 transition-all duration-300',
                  isDragActive ? 'text-primary scale-110' : '',
                )}
              >
                <UploadCloud size={40} />
              </div>
              <div className="space-y-1">
                <p className="text-xl font-bold text-slate-700 group-hover:text-primary transition-colors">
                  {isDragActive ? 'Drop file here' : 'Upload Dataset'}
                </p>
                <p className="text-sm text-slate-500">
                  Drag & drop Excel or CSV file here, or click to select
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="file"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center justify-between bg-white p-5 rounded-2xl shadow-md border border-slate-100 w-full max-w-md mx-auto"
            >
              <div className="flex items-center gap-4">
                <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
                  <FileSpreadsheet size={28} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-slate-800 truncate max-w-[200px]">
                    {file.name}
                  </p>
                  <p className="text-xs text-slate-500 font-medium">
                    {(file.size / 1024).toFixed(1)} KB • Ready to process
                  </p>
                </div>
              </div>
              <button
                onClick={removeFile}
                className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                title="Remove file"
              >
                <X size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FileUpload;
