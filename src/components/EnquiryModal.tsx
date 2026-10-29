import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  MapPin,
  AlertCircle,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { Provider, Enquiry, UserSession } from '../types';
import { saveNewEnquiry } from '../utils/storage';

interface EnquiryModalProps {
  provider: Provider | null;
  onClose: () => void;
  onEnquirySuccess: (newEnquiry: Enquiry) => void;
  userSession: UserSession;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  provider,
  onClose,
  onEnquirySuccess,
  userSession,
}) => {
  const [customerName, setCustomerName] = useState(userSession.name || '');
  const [customerPhone, setCustomerPhone] = useState(
    userSession.phone?.replace('+91 ', '') || ''
  );
  const [customerLocality, setCustomerLocality] = useState(
    userSession.locality || (provider ? provider.locality : '')
  );
  const [preferredDate, setPreferredDate] = useState('Tomorrow');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('Morning (9:00 AM - 12:00 PM)');
  const [selectedService, setSelectedService] = useState(
    provider?.servicesOffered[0]?.name || 'General Inspection & Service'
  );
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEnquiry, setSubmittedEnquiry] = useState<Enquiry | null>(null);

  if (!provider) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!customerName.trim()) {
      errs.customerName = 'Please enter your name';
    }

    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.customerPhone = 'Please enter a valid 10-digit Indian mobile number';
    }

    if (!customerLocality.trim()) {
      errs.customerLocality = 'Please provide your house/apartment or neighbourhood locality';
    }

    if (!preferredDate) {
      errs.preferredDate = 'Please select a preferred date';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const created = saveNewEnquiry({
        providerId: provider.id,
        providerName: provider.name,
        providerCategory: provider.category,
        providerLocality: provider.locality,
        customerName: customerName.trim(),
        customerPhone: `+91 ${customerPhone.trim()}`,
        customerLocality: customerLocality.trim(),
        preferredDate,
        preferredTimeSlot,
        notes: notes.trim() || 'Standard enquiry for local home service.',
        serviceRequested: selectedService,
      });

      setIsSubmitting(false);
      setSubmittedEnquiry(created);
      onEnquirySuccess(created);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="bg-cream-100 w-full max-w-xl rounded-3xl shadow-float border border-surface-border overflow-hidden my-6 max-h-[92vh] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-forest-900 text-cream-100 p-5 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-forest-800 hover:bg-forest-700 text-cream-200 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-lime text-xs font-bold uppercase tracking-wider block mb-1">
            Service Booking & Enquiry
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-cream-50">
            Enquire with {provider.name}
          </h2>
          <p className="text-xs text-cream-300 mt-0.5">
            {provider.category} • {provider.locality} • Starts ₹{provider.priceStarting}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {submittedEnquiry ? (
            /* Success State */
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-3xl bg-lime/30 border border-lime text-forest-900 mx-auto flex items-center justify-center shadow-subtle">
                <CheckCircle2 className="w-10 h-10 text-forest-800" />
              </div>

              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-forest-100 text-forest-800 text-[11px] font-bold mb-2">
                  Reference #{submittedEnquiry.id}
                </span>
                <h3 className="font-display font-extrabold text-2xl text-forest-900">
                  Enquiry Sent Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-surface-dark/75 mt-1 max-w-md mx-auto">
                  Your request has been forwarded directly to <strong>{provider.name}</strong>. They typically respond within 15–30 minutes during working hours.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-cream-50 p-4 rounded-2xl border border-surface-border text-left text-xs space-y-2.5 max-w-md mx-auto">
                <div className="flex justify-between pb-2 border-b border-surface-border">
                  <span className="text-surface-dark/60">Service Requested:</span>
                  <span className="font-bold text-forest-950 text-right">{submittedEnquiry.serviceRequested}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-surface-border">
                  <span className="text-surface-dark/60">Preferred Time:</span>
                  <span className="font-bold text-forest-950 text-right">
                    {submittedEnquiry.preferredDate}, {submittedEnquiry.preferredTimeSlot.split('(')[0]}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-surface-border">
                  <span className="text-surface-dark/60">Client Contact:</span>
                  <span className="font-bold text-forest-950 text-right">
                    {submittedEnquiry.customerName} ({submittedEnquiry.customerPhone})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-dark/60">Service Address:</span>
                  <span className="font-bold text-forest-950 text-right max-w-[200px] truncate">
                    {submittedEnquiry.customerLocality}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-forest-50 rounded-xl border border-forest-200 text-xs text-forest-800 max-w-md mx-auto flex items-center gap-2 text-left">
                <ShieldCheck className="w-5 h-5 text-forest-700 shrink-0" />
                <span>
                  <strong>Saved locally:</strong> You can review or track this booking anytime from the <em>"My Enquiries"</em> tab in the top bar.
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-forest-800 hover:bg-forest-900 text-cream-100 font-bold text-sm shadow-card"
                >
                  Done & Back to Services
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-cream-50 rounded-xl border border-surface-border text-xs text-surface-dark/75 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-forest-600"></span>
                <span>
                  No online payment needed now. You pay directly to <strong>{provider.name}</strong> after the service is done.
                </span>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  Select Specific Service
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-surface-border text-sm text-surface-dark focus:outline-none focus:ring-2 focus:ring-forest-700"
                >
                  {provider.servicesOffered.map((srv, idx) => (
                    <option key={idx} value={srv.name}>
                      {srv.name} — {srv.rate}
                    </option>
                  ))}
                  <option value="General Inspection / Other issue">
                    General Inspection / Other issue
                  </option>
                </select>
              </div>

              {/* Customer Name */}
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-surface-dark/40">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. Rohan Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-cream-50 border text-sm text-surface-dark focus:outline-none focus:ring-2 ${
                      errors.customerName
                        ? 'border-red-400 focus:ring-red-300'
                        : 'border-surface-border focus:ring-forest-700'
                    }`}
                  />
                </div>
                {errors.customerName && (
                  <p className="text-[11px] text-red-600 font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.customerName}</span>
                  </p>
                )}
              </div>

              {/* Phone & Locality Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-surface-dark/40 text-xs font-bold">
                      +91
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="98765 43210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className={`w-full pl-11 pr-3.5 py-2.5 rounded-xl bg-cream-50 border text-sm text-surface-dark focus:outline-none focus:ring-2 ${
                        errors.customerPhone
                          ? 'border-red-400 focus:ring-red-300'
                          : 'border-surface-border focus:ring-forest-700'
                      }`}
                    />
                  </div>
                  {errors.customerPhone && (
                    <p className="text-[11px] text-red-600 font-medium mt-1">
                      {errors.customerPhone}
                    </p>
                  )}
                </div>

                {/* Locality */}
                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    Address / Flat / Area <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-surface-dark/40">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Flat 302, Green Glen Layout"
                      value={customerLocality}
                      onChange={(e) => setCustomerLocality(e.target.value)}
                      className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-cream-50 border text-sm text-surface-dark focus:outline-none focus:ring-2 ${
                        errors.customerLocality
                          ? 'border-red-400 focus:ring-red-300'
                          : 'border-surface-border focus:ring-forest-700'
                      }`}
                    />
                  </div>
                  {errors.customerLocality && (
                    <p className="text-[11px] text-red-600 font-medium mt-1">
                      {errors.customerLocality}
                    </p>
                  )}
                </div>
              </div>

              {/* Date & Slot Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Date */}
                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    Preferred Day <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-surface-dark/40">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <select
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-cream-50 border border-surface-border text-sm text-surface-dark focus:outline-none focus:ring-2 focus:ring-forest-700"
                    >
                      <option value="Today (Urgent)">Today (Urgent)</option>
                      <option value="Tomorrow">Tomorrow</option>
                      <option value="Within 2 Days">Within 2 Days</option>
                      <option value="This Weekend">This Weekend</option>
                      <option value="Flexible / Next Week">Flexible / Next Week</option>
                    </select>
                  </div>
                </div>

                {/* Time Slot */}
                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    Preferred Time Slot
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-surface-dark/40">
                      <Clock className="w-4 h-4" />
                    </div>
                    <select
                      value={preferredTimeSlot}
                      onChange={(e) => setPreferredTimeSlot(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-cream-50 border border-surface-border text-sm text-surface-dark focus:outline-none focus:ring-2 focus:ring-forest-700"
                    >
                      <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                      <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                      <option value="Evening (4:00 PM - 8:00 PM)">Evening (4:00 PM - 8:00 PM)</option>
                      <option value="Anytime">Anytime during day</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Problem description / notes */}
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  Describe what you need help with (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Kitchen sink faucet is dripping continuously, please bring replacement washer..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 rounded-xl bg-cream-50 border border-surface-border text-sm text-surface-dark placeholder-surface-dark/40 focus:outline-none focus:ring-2 focus:ring-forest-700"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-surface-border">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-surface-dark/70 hover:bg-cream-200 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 active:scale-98 text-cream-100 font-bold text-xs sm:text-sm shadow-card flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-lime" />
                      <span>Confirm & Send Enquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
