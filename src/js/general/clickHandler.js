import { refs } from "./refs";

("use strict");

export function my(n) {
  return n + 4;
}

export function handleClicks(evt) {
  const target = evt.target;
  switch (target) {
    case refs.modal.logInButton:
      modalShowLogIn();
      break;
    case refs.modal.registerButton:
      modalShowRegister();
      break;
    case refs.modal.closeElement:
      hide(refs.modal.pageModal);
      break;
    case refs.site.registerButtonNav:
      modalShowRegister();
      show(refs.modal.pageModal);
      break;
    case refs.site.logInButtonNav:
      modalShowLogIn();
      show(refs.modal.pageModal);
      break;
    // case refs.site.registerButtonMain:
    //   modalShowRegister();
    //   show(refs.modal.pageModal);
    //   break;
  }

  if (Array.from(refs.site.registerButtonMain).includes(target)) {
    modalShowRegister();
    show(refs.modal.pageModal);
  }
}

function hide(elem) {
  if (elem.classList.contains("visually-hidden")) return;
  elem.classList.add("visually-hidden");
}

function show(elem) {
  if (!elem.classList.contains("visually-hidden")) return;
  elem.classList.remove("visually-hidden");
}

function modalShowRegister() {
  if (
    !refs.modal.logInButton.parentNode.classList.contains(
      "page-modal__tab--modal-tab-active"
    )
  )
    return;
  if (
    refs.modal.registerButton.parentNode.classList.contains(
      "page-modal__tab--modal-tab-active"
    )
  )
    return;
  refs.modal.logInButton.parentNode.classList.remove(
    "page-modal__tab--modal-tab-active"
  );
  refs.modal.registerButton.parentNode.classList.add(
    "page-modal__tab--modal-tab-active"
  );
  hide(refs.modal.loginTabContent);
  show(refs.modal.registerTabContent);
}

function modalShowLogIn() {
  if (
    refs.modal.logInButton.parentNode.classList.contains(
      "page-modal__tab--modal-tab-active"
    )
  )
    return;
  if (
    !refs.modal.registerButton.parentNode.classList.contains(
      "page-modal__tab--modal-tab-active"
    )
  )
    return;
  refs.modal.logInButton.parentNode.classList.add(
    "page-modal__tab--modal-tab-active"
  );
  refs.modal.registerButton.parentNode.classList.remove(
    "page-modal__tab--modal-tab-active"
  );
  show(refs.modal.loginTabContent);
  hide(refs.modal.registerTabContent);
}
