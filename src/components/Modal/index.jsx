import React from "react";

export default function Modal({ handleClose, show, children }) {
  const showHideClassName = show ? "modal display-flex" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
          <button className="modal-button" onClick={handleClose}>X</button>
      </section>
    </div>
  );
}
