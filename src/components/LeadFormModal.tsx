import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import LeadForm from "./LeadForm";

interface LeadFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LeadFormModal = ({ open, onOpenChange }: LeadFormModalProps) => {
  // -------- Ensure body scroll unlock on close --------
  useEffect(() => {
    if (!open) {
      document.body.classList.remove("overflow-hidden");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          sm:max-w-[500px]
          max-h-[90vh]
          overflow-y-auto
          p-6
          relative
          rounded-xl
          z-[9999]   /* ✅ FIX: Forces modal above all sections */
        "
      >
        {/* Mobile-friendly Close Button */}
        <DialogClose asChild>
          <button
            className="
              absolute right-4 top-4 
              text-gray-500 hover:text-gray-800 
              transition-colors
              text-2xl
            "
            aria-label="Close"
          >
            ✕
          </button>
        </DialogClose>

        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Find Your <span className="text-primary">Best Options</span>
          </DialogTitle>
        </DialogHeader>

        <LeadForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default LeadFormModal;
