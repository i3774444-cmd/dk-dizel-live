import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useModal } from "@/contexts/ModalContext";
import IndividualForm from "./IndividualForm";
import B2BForm from "./B2BForm";
import CalculatorForm from "./CalculatorForm";

const LeadModals = () => {
  const { activeModal, closeModal } = useModal();

  return (
    <>
      <Dialog open={activeModal === "individual"} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="sm:max-w-[480px] rounded-2xl border-0 bg-card/95 backdrop-blur-[20px] shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
          <IndividualForm onClose={closeModal} />
        </DialogContent>
      </Dialog>

      <Dialog open={activeModal === "b2b"} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="sm:max-w-[520px] rounded-2xl border-0 bg-card/95 backdrop-blur-[20px] shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
          <B2BForm onClose={closeModal} />
        </DialogContent>
      </Dialog>

      <Dialog open={activeModal === "calculator"} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="sm:max-w-[480px] rounded-2xl border-0 bg-card/95 backdrop-blur-[20px] shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
          <CalculatorForm onClose={closeModal} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LeadModals;
