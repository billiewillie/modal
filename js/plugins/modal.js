function _createModal(options) {
  const modal = document.createElement("div");
  modal.classList.add("vmodal");
  modal.insertAdjacentHTML(
    "beforeend",
    `<div class="vmodal">
      <div class="modal-overlay" data-close="true">
        <div class="modal-window">
          <div class="modal-header">
            <span class="modal-title">${options.title || "Заголовок"}</span>
            ${
              options.closable
                ? `<span class="modal-close" data-close="true">&times;</span>`
                : ""
            }
          </div>
          <div class="modal-body" data-content>${options.text || ""}</div>
          <div class="modal-footer">
            <button>OK</button>
            <button>Cancel</button>
          </div>
        </div>
      </div>
    </div>`
  );
  document.body.appendChild(modal);
  return modal;
}

$.modal = function(options) {
  const ANIMATION__SPEED = 2000;
  const $modal = _createModal(options);
  let closing = false;
  let destroyed = false;
  const modal = {
    open() {
      if (destroyed) return console.log("modal is destroyed!");
      !closing && $modal.classList.add("open");
    },
    close() {
      closing = true;
      $modal.classList.remove("open");
      $modal.classList.add("hide");
      setTimeout(() => {
        $modal.classList.remove("hide");
        closing = false;
      }, ANIMATION__SPEED);
    }
  };
  const listener = e => {
    if (e.target.dataset.close) modal.close();
  };
  $modal.addEventListener("click", listener);
  if (options.width) {
    document.querySelector(
      ".modal-window"
    ).style.maxWidth = `${options.width}px`;
  }
  return Object.assign(modal, {
    destroy() {
      $modal.parentNode.removeChild($modal);
      $modal.removeEventListener("click", listener);
      destroyed = true;
    },
    setContent(html) {
      document.querySelector("[data-content]").innerHTML = html;
    }
  });
};
