Element.prototype.appendAfter = function(el) {
  el.parentNode.insertBefore(this, el.nextSibling);
};

function noop() {}

function _createModalFooter(buttons = []) {
  if (buttons.length === 0) return document.createElement("div");
  const wrap = document.createElement("div");
  wrap.classList.add("modal-footer");
  buttons.forEach(btn => {
    const $btn = document.createElement("button");
    $btn.textContent = btn.text;
    $btn.classList.add("btn");
    $btn.classList.add(`btn-${btn.type || "secondary"}`);
    $btn.onclick = btn.handler || noop;
    wrap.appendChild($btn);
  });
  return wrap;
}

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
        </div>
      </div>
    </div>`
  );
  const footer = _createModalFooter(options.footerButtons);
  footer.appendAfter(modal.querySelector("[data-content]"));
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
