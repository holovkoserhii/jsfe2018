import './../scss/normalize.scss';
import './../scss/styles.scss';
import './../scss/media.scss';

import {refs} from './general/refs';
import * as clickHandler from './general/clickHandler';
import "./general/img";
import "./personal/hbs";
import "./personal/classUser";
import * as loader from "./general/pageLoader";
import * as search from "./general/search";
// import * as hbs from "./personal/hbs";
// import * as paging from "./personal/paginator";


document.addEventListener("DOMContentLoaded", loader.siteReady);
refs.site.siteBody.addEventListener("click", clickHandler.handleClicks);
refs.site.siteBody.addEventListener("input", search.debouncedSearch);
refs.modal.modal.addEventListener('input', clickHandler.modalHelpersEventHandlers);
refs.modal.modal.addEventListener('submit', clickHandler.loginRegister);
refs.site.feedBackForm.addEventListener('submit', clickHandler.feedBackFormSubmit);