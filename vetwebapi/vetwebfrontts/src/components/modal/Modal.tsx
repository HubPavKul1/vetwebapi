// import styles from "./Modal.module.css"


import styles from "./Modal.module.scss"

interface ModalProps {
    active: boolean;
    setActive: CallableFunction;
    children?: React.ReactElement | React.ReactNode;
}



export function Modal({active , setActive, children}: ModalProps) {

    return (
        <div className={ active ? `${styles.active}` : `${styles.modal}` } onClick={() => setActive(false)}>
            <div className={ active ? `${styles.contentActive}` : `${styles.content}` } onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}