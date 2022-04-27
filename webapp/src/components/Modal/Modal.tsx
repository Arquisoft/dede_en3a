import styles from "./Modal.module.scss";

type ModalProps = {
  element: JSX.Element;
  onClickOutside?: any;
  onExit?: any;
  onAccept?: any;
};

function Modal(props: ModalProps): JSX.Element {
  const onContainerClick = (event: any) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      props.onClickOutside();
    }
  };

  const preventDefaultClick = (event: any) => {
    event.preventDefault();
  };

  return (
    <>
      <div className={styles.container} onClick={onContainerClick}>
        <div className={styles.wrapper} onClick={preventDefaultClick}>
          {props.element}
        </div>
      </div>
    </>
  );
}

export default Modal;
