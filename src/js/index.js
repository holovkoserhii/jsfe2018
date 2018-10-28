"use strict";

import './../scss/normalize.scss';
import './../scss/styles.scss';
import './../scss/media.scss';
// import './../scss/colors.scss';

import {refs} from './general/refs';
import * as clickHandler from './general/clickHandler';

console.log(clickHandler.my(6));

refs.site.siteBody.addEventListener("click", clickHandler.handleClicks);