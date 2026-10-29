import React from 'react';
import {
  X,
  ClipboardList,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { Enquiry } from '../types';
import { updateEnquiryStatus } from '../utils/storage';

interface EnquiriesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  enquiries: Enquiry[];
  setEnquiries: React.Dispatch<React.SetStateAction<Enquiry[]>>;
  onViewProviderById: (providerId: string) => void;
}

export const EnquiriesDrawer: React.FC<EnquiriesDrawerProps> = ({
  isOpen,
  onClose,
  enquiries,
  setEnquiries,
  onViewProviderById,
}) => {
  if (!isOpen) return null;

  const handleStatusChange = (id: string, status: Enquiry['status']) => {
    const updated = updateEnquiryStatus(id, status);
    setEnquiries(updated);
  };

  const getStatusBadge = (status: Enquiry['status']) => {
    switch (status) {
      case 'Acknowledged':
        return 'bg-blue-100 text-blue-900 border-blue-200';
      case 'Completed':
        return 'bg-lime/50 text-forest-950 border-lime';
      case 'Cancelled':
        return 'bg-red-100 text-red-900 border-red-200';
      default:
        return 'bg-amber-100 text-amber-900 border-amber-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div
        className="bg-cream-100 w-full max-w-lg h-full shadow-2xl border-l border-surface-border flex flex-col relative animate-in slide-in-from-right duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="bg-forest-900 text-cream-100 p-5 sm:p-6 shrink-0 flex items-center justify-between border-b border-forest-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-forest-800 flex items-center justify-center text-lime">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-cream-50">
                My Bookings & Enquiries
              </h2>
              <p className="text-xs text-cream-300">
                {enquiries.length} {enquiries.length === 1 ? 'request' : 'requests'} saved in browser storage
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-forest-800 hover:bg-forest-700 text-cream-200 transition-colors"
            aria-label="Close enquiries drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer List */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {enquiries.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-cream-200 border border-surface-border mx-auto flex items-center justify-center text-surface-dark/40">
                <ClipboardList className="w-7 h-7" />
              </div>
              <h3 className="font-display font-bold text-base text-forest-900">
                No active enquiries yet
              </h3>
              <p className="text-xs text-surface-dark/70 max-w-xs mx-auto">
                Explore local providers on KaamConnect and tap "Book / Enquire" to send service requests.
              </p>
            </div>
          ) : (
            enquiries.map((enq) => (
              <div
                key={enq.id}
                className="bg-cream-50 p-4 rounded-2xl border border-surface-border shadow-subtle space-y-3 transition-all hover:border-forest-300"
              >
                {/* Header & Status */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-forest-700 uppercase tracking-wider block">
                      {enq.providerCategory}
                    </span>
                    <button
                      onClick={() => onViewProviderById(enq.providerId)}
                      className="font-display font-bold text-base text-forest-950 hover:text-forest-700 text-left flex items-center gap-1 group"
                    >
                      <span>{enq.providerName}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(
                      enq.status
                    )}`}
                  >
                    {enq.status}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-1.5 text-xs text-surface-dark/80 bg-cream-100/70 p-3 rounded-xl border border-surface-border/50">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-forest-900">Service:</span>
                    <span>{enq.serviceRequested || 'General Home Service'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                    <span>{enq.preferredDate}</span>
                    <span className="text-surface-dark/40">•</span>
                    <Clock className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                    <span>{enq.preferredTimeSlot.split('(')[0]}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                    <span className="truncate">{enq.customerLocality}</span>
                  </div>

                  {enq.notes && (
                    <p className="text-[11px] text-surface-dark/70 italic pt-1 border-t border-surface-border/60">
                      "{enq.notes}"
                    </p>
                  )}
                </div>

                {/* Status action toggle buttons */}
                <div className="pt-2 flex items-center justify-between border-t border-surface-border/60 text-[11px]">
                  <span className="text-[10px] text-surface-dark/50">
                    Ref #{enq.id.slice(-6)}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {enq.status !== 'Completed' && enq.status !== 'Cancelled' && (
                      <button
                        onClick={() => handleStatusChange(enq.id, 'Completed')}
                        className="px-2.5 py-1 rounded-lg bg-lime/40 hover:bg-lime text-forest-950 font-bold border border-lime/80 transition-colors"
                      >
                        Mark Done
                      </button>
                    )}

                    {enq.status === 'Pending Response' && (
                      <button
                        onClick={() => handleStatusChange(enq.id, 'Acknowledged')}
                        className="px-2.5 py-1 rounded-lg bg-forest-100 hover:bg-forest-200 text-forest-800 font-bold transition-colors"
                      >
                        Acknowledge
                      </button>
                    )}

                    {enq.status !== 'Cancelled' && (
                      <button
                        onClick={() => handleStatusChange(enq.id, 'Cancelled')}
                        className="px-2.5 py-1 rounded-lg hover:bg-red-50 text-red-600 font-semibold transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-cream-50 border-t border-surface-border text-center text-xs text-surface-dark/60 shrink-0">
          <span>Persisted in your local browser storage • Refreshes preserve this list</span>
        </div>
      </div>
    </div>
  );
};
