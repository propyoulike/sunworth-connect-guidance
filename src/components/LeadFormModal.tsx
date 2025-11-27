import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import LeadForm from "./LeadForm";

interface LeadFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LeadFormModal = ({ open, onOpenChange }: LeadFormModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Find Your <span className="text-primary">Best Options</span>
          </DialogTitle>
        </DialogHeader>

        {/* LeadForm closes modal on success */}
        <LeadForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default LeadFormModal;

