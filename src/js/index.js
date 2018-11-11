import './../scss/normalize.scss';
import './../scss/styles.scss';
import './../scss/media.scss';

import {refs} from './general/refs';
import * as clickHandler from './general/clickHandler';
// import "./general/img";
// import "./personal/hbs";
// import "./personal/classUser";
import * as loader from "./general/pageLoader";
import * as hbs from "./personal/hbs";


document.addEventListener("DOMContentLoaded", loader.siteReady);
refs.site.siteBody.addEventListener("click", clickHandler.handleClicks);
refs.modal.modal.addEventListener('keyup', clickHandler.modalHelpersEventHandlers);
refs.modal.modal.addEventListener('submit', clickHandler.loginRegister);
refs.site.feedBackForm.addEventListener('submit', clickHandler.feedBackFormSubmit);
// refs.loggedIn.personalForm.addEventListener('blur', hbs.updateUserField);