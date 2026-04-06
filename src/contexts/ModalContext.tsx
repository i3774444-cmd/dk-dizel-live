import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type ModalType = "individual" | "b2b" | "calculator" | null;

interface ModalContextValue {
  activeModal: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue>({
  activeModal: null,
  openModal: () => {},
  closeModal: () => {},
});

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = useCallback((type: ModalType) => setActiveModal(type), []);
  const closeModal = useCallback(() => setActiveModal(null), []);

  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
