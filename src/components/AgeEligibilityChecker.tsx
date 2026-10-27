import React, { useState } from 'react';
import { ExamRecord } from '../types/exam';
import { CheckCircle2, AlertTriangle, Calculator } from 'lucide-react';

interface AgeEligibilityCheckerProps {
  exam: ExamRecord;
}

export const AgeEligibilityChecker: React.FC<AgeEligibilityCheckerProps> = ({ exam }) => {
  const [birthDate, setBirthDate] = useState<string>('2000-01-01');
  const [category, setCategory] = useState<'general' | 'obc' | 'sc_st' | 'pwd'>('general');
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateEligibility = () => {
    if (!birthDate) return null;
    const dob = new Date(birthDate);
    const today = new Date();
    
    // Calculate exact age in years
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    let relaxedMaxAge = exam.maxAge;
    if (category === 'obc') relaxedMaxAge += 3;
    if (category === 'sc_st') relaxedMaxAge += 5;
    if (category === 'pwd') relaxedMaxAge += 10;

    const isEligible = age >= exam.minAge && age <= relaxedMaxAge;

    return {
      age,
      isEligible,
      minAge: exam.minAge,
      maxAge: relaxedMaxAge,
    };
  };

  const result = hasCalculated ? calculateEligibility() : null;

  return (
    <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="w-4 h-4 text-orange-600 dark:text-orange-400" />
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
          Interactive Age Eligibility Calculator
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
        <div>
          <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium">Your Date of Birth</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => {
              setBirthDate(e.target.value);
              setHasCalculated(true);
            }}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-orange-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value as any);
              setHasCalculated(true);
            }}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-orange-500 focus:outline-none"
          >
            <option value="general">General / EWS (No relaxation)</option>
            <option value="obc">OBC (Non-Creamy Layer) (+3 yrs)</option>
            <option value="sc_st">SC / ST (+5 yrs)</option>
            <option value="pwd">PwBD (+10 yrs)</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setHasCalculated(true)}
          className="px-3 py-1.5 bg-slate-900 dark:bg-orange-600 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 dark:hover:bg-orange-700 transition-colors"
        >
          Check Eligibility
        </button>

        {result && (
          <div className="flex items-center gap-2">
            {result.isEligible ? (
              <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                Eligible! Age: {result.age} yrs (Limit: {result.minAge}-{result.maxAge} yrs)
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-semibold text-xs">
                <AlertTriangle className="w-4 h-4" />
                Not Eligible. Age: {result.age} yrs (Required: {result.minAge}-{result.maxAge} yrs)
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
