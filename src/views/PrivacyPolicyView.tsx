import React from 'react';
import { ShieldCheck, Lock, EyeOff, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicyView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-slate-800 dark:text-slate-200">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Last Updated: October 2026 · Transparent Data Practices for Indian Students
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            1. Overview & Commitment to Student Privacy
          </h2>
          <p>
            ExamGuide India (accessible via this website) is committed to protecting your privacy.
            We believe educational guidance should not require invasive surveillance, mandatory password
            storage, or unnecessary collection of personal documents.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            2. What Data We Store & How It Is Handled
          </h2>
          <p>
            ExamGuide India operates with a client-first architecture:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
            <li>
              <strong>Local Bookmarks & Preferences:</strong> When you bookmark an exam, check age eligibility,
              or select your target exam category, this information is stored locally within your browser using{' '}
              <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-xs">localStorage</code>.
              It does not get transmitted to any private tracking database.
            </li>
            <li>
              <strong>No Password Collection:</strong> We never collect, store, or process passwords, Aadhaar numbers,
              PAN details, or bank credentials.
            </li>
            <li>
              <strong>Contact Inquiries:</strong> If you voluntarily contact our editorial desk via email or the
              contact form, your name and email are used solely to reply to your inquiry.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            3. Cookies & Advertising Preparation (Google AdSense)
          </h2>
          <p>
            Currently, ExamGuide India does not run third-party tracking cookies for user profiling.
            In the future, when third-party advertising partners such as Google AdSense are integrated:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
            <li>
              Google, as a third-party vendor, may use cookies to serve ads based on prior visits to this website
              or other websites on the internet.
            </li>
            <li>
              Users may opt out of personalized advertising by visiting{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noreferrer"
                className="text-orange-600 underline"
              >
                Google Ads Settings
              </a>.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            4. External Links to Government & Conducting Portals
          </h2>
          <p>
            ExamGuide India provides links to official examination portals (e.g., upsc.gov.in, ssc.gov.in, nta.ac.in).
            Once you leave our site and navigate to an external official authority's website, their privacy policy and
            terms of service govern your interaction.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            5. Contact Information
          </h2>
          <p>
            For any inquiries or privacy-related questions, please write to our editorial desk at{' '}
            <code className="font-mono text-slate-900 dark:text-white font-semibold">contact@examguideindia.in</code>.
          </p>
        </section>
      </div>
    </div>
  );
};
