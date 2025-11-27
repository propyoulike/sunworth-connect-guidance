import { useEffect } from "react";
import {
  Dialog,
  DialogPortal,
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
      {/* FORCE MODAL TO RENDER AT ROOT LEVEL */}
      <DialogPortal>
        <DialogContent
          className="
            fixed 
            top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2
            
            sm:max-w-[500px]
            w-[92%]
            max-h-[90vh]
            overflow-y-auto
            p-6
            rounded-xl

            bg-background
            shadow-xl

            z-[999999]   /* TOPMOST LAYER */
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
                z-[10000000]
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
      </DialogPortal>
    </Dialog>
  );
};

export default LeadFormModal;
