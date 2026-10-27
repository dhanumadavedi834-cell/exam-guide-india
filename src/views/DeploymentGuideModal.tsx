import React, { useState } from 'react';
import {
  X,
  Cloud,
  Globe,
  Terminal,
  ShieldCheck,
  Search,
  CheckCircle2,
  Copy,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { useExam } from '../context/ExamContext';

interface DeploymentGuideModalProps {
  onClose: () => void;
}

export const DeploymentGuideModal: React.FC<DeploymentGuideModalProps> = ({ onClose }) => {
  const { addToast } = useExam();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedCode(label);
      addToast(`Copied ${label} to clipboard`, 'info');
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 shrink-0 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white">
              <Cloud className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                ExamGuide India · Deployment & Operations Guide
              </h2>
              <p className="text-xs text-slate-400">
                Beginner-friendly step-by-step instructions for Cloudflare Pages, custom domains, and SEO.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-200 text-xs leading-relaxed">
          {/* STEP 1: PREVIEW IN AI STUDIO */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center text-[10px]">1</span>
                <span>Run & Preview in Google AI Studio</span>
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Your app runs locally on Vite at port 3000. In AI Studio, the live interactive preview
              automatically displays the application. You can test searching, filters, bookmarks, and age calculators
              instantly without any external servers.
            </p>
          </div>

          {/* STEP 2: DOWNLOAD SOURCE CODE */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center text-[10px]">2</span>
              <span>Export Source Code to GitHub or Local Disk</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Download the project files from AI Studio or push directly to a Git repository:
            </p>
            <div className="bg-slate-900 text-slate-200 p-3 rounded-lg font-mono text-[11px] flex items-center justify-between">
              <span>git init && git add . && git commit -m "Initial ExamGuide India"</span>
              <button
                onClick={() => copyToClipboard('git init && git add . && git commit -m "Initial ExamGuide India"', 'Git Command')}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* STEP 3: DEPLOY ON CLOUDFLARE PAGES */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center text-[10px]">3</span>
              <span>Deploy on Cloudflare Pages (Free & Ultra Fast)</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Cloudflare Pages provides global edge distribution, free SSL certificates, and zero cold starts:
            </p>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-700 dark:text-slate-300 pl-1">
              <li>Log in to your <strong>Cloudflare Dashboard</strong> at <a href="https://dash.cloudflare.com" target="_blank" rel="noreferrer" className="text-orange-600 underline">dash.cloudflare.com</a>.</li>
              <li>Navigate to <strong>Workers & Pages</strong> &gt; <strong>Create application</strong> &gt; <strong>Pages</strong>.</li>
              <li>Connect your GitHub repository containing the ExamGuide India code.</li>
              <li>Configure the Build Settings:</li>
            </ol>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Framework preset</span>
                <p className="font-mono font-bold text-slate-800 dark:text-slate-200">Vite</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Build command</span>
                <p className="font-mono font-bold text-slate-800 dark:text-slate-200">npm run build</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Build output directory</span>
                <p className="font-mono font-bold text-slate-800 dark:text-slate-200">dist</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Node.js Version</span>
                <p className="font-mono font-bold text-slate-800 dark:text-slate-200">20.x or higher</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              Click <strong>Save and Deploy</strong>. Cloudflare Pages builds and deploys your site to an active <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">*.pages.dev</code> URL within 60 seconds.
            </p>
          </div>

          {/* STEP 4: CUSTOM DOMAIN */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center text-[10px]">4</span>
              <span>Connect Custom Domain (e.g., examguideindia.in)</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              In Cloudflare Pages, go to <strong>Custom domains</strong> &gt; <strong>Set up a custom domain</strong>.
              Enter your registered domain. Cloudflare automatically generates DNS records and issues free universal SSL certificates.
            </p>
          </div>

          {/* STEP 5: GOOGLE SEARCH CONSOLE */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center text-[10px]">5</span>
              <span>Submit Sitemap to Google Search Console</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              ExamGuide India includes configured <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">/sitemap.xml</code> and <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">/robots.txt</code> files in the public directory.
              In Google Search Console, add your domain property and submit:
            </p>
            <div className="bg-slate-900 text-slate-200 p-2.5 rounded-lg font-mono text-[11px] flex items-center justify-between">
              <span>https://yourdomain.com/sitemap.xml</span>
              <button
                onClick={() => copyToClipboard('https://yourdomain.com/sitemap.xml', 'Sitemap URL')}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* STEP 6 & 7: EDITORIAL INTEGRITY & FUTURE AUTH */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Editorial Responsibility</span>
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Never publish fictional or unverified dates as official. Always cite conducting body notifications
                and verify gazette PDF releases.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-orange-600" />
                <span>Future Secure Auth Path</span>
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                When scaling to user-specific SMS alerts or paid mock tests, add a secure backend (e.g., Supabase Auth or Cloudflare D1 with OAuth).
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 dark:bg-orange-600 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
