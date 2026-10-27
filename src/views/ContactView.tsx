import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Info, ShieldCheck, Copy } from 'lucide-react';
import { useExam } from '../context/ExamContext';

export const ContactView: React.FC = () => {
  const { addToast } = useExam();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-bot honeypot
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const editorialEmail = 'contact@examguideindia.in';

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(editorialEmail);
      addToast('Editorial contact email copied to clipboard.', 'info');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Spam honeypot check
    if (honeypot.trim()) {
      return;
    }

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (!subject.trim()) {
      setErrorMsg('Please specify the subject or exam name.');
      return;
    }

    if (!message.trim() || message.trim().length < 15) {
      setErrorMsg('Please write a message with at least 15 characters.');
      return;
    }

    // Prepare direct mailto link as reliable real fallback
    const mailtoUrl = `mailto:${editorialEmail}?subject=${encodeURIComponent(
      `[ExamGuide India Inquiry] ${subject}`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    // Store in submitted state
    setSubmitted(true);
    addToast('Message validated. You can launch your mail client to send directly.', 'success');

    // Trigger direct mailto
    window.location.href = mailtoUrl;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Contact Editorial Desk
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Have an update regarding an exam notification, noticed an unverified parameter,
          or wish to suggest an upcoming recruitment? Reach out directly to our editorial desk.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Direct Contact Info */}
        <div className="md:col-span-5 space-y-5">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-orange-600" />
              <span>Direct Communication</span>
            </h2>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              We respond to notification corrections, broken official link reports, and candidate inquiries.
            </p>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Editorial Email</span>
                <span className="font-mono text-xs font-semibold text-slate-900 dark:text-white truncate block">
                  {editorialEmail}
                </span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-1.5 text-slate-500 hover:text-orange-600 transition-colors"
                title="Copy email address"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>

            <div className="text-[11px] text-slate-500 space-y-1">
              <p>• Standard response window: 24–48 hours</p>
              <p>• For official grievance redressals, please contact the respective examination board directly.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 text-xs text-orange-900 dark:text-orange-200 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed text-[11px]">
              <strong>Note on Official Inquiries:</strong> ExamGuide India does not conduct exams, issue admit cards,
              or verify applicant registrations. For questions regarding your personal candidate application status,
              please visit the respective conducting authority's official portal.
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="md:col-span-7">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 rounded-2xl shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Send a Verification or Feedback Note
            </h2>

            {submitted ? (
              <div className="p-6 text-center space-y-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h3 className="font-bold text-sm text-emerald-950 dark:text-emerald-100">
                  Form Validated
                </h3>
                <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed max-w-sm mx-auto">
                  Your inquiry has been prepared for dispatch to <code>{editorialEmail}</code>.
                  If your mail application did not open automatically, you can send an email directly using the copy button on the left.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setSubject('');
                    setMessage('');
                  }}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {errorMsg && (
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Honeypot field for anti-bot protection */}
                <input
                  type="text"
                  name="website_url_check"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Rajesh Kumar"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g., rajesh@example.com"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Subject / Exam Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Correction regarding UPSC CSE Prelims schedule"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please include details, official notification references, or specific questions..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-orange-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Minimum 15 characters</span>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Editorial Team</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
