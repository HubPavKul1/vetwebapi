import "./Modal.css";

interface ModalProps {
  active: boolean;
  setActive: CallableFunction;
  children?: React.ReactElement | React.ReactNode;
}

export function Modal({ active, setActive, children }: ModalProps) {
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className={
          active ? "modal__content active bg-slate-200" : "modal__content"
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
