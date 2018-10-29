import './../scss/normalize.scss';
import './../scss/styles.scss';
import './../scss/media.scss';

import {refs} from './general/refs';
import * as clickHandler from './general/clickHandler';
import "./general/img";
import "./general/hbs";

refs.site.siteBody.addEventListener("click", clickHandler.handleClicks);
refs.modal.modal.addEventListener('keyup', clickHandler.modalHelpersEventHandlers);