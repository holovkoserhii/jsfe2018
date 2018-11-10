import test from "../../templates/test.hbs";
import { refs } from "./refs";

const data = {
  img: "https://image.ibb.co/ebG8vq/1-team-small.jpg"
};
const markup = test(data);

refs.loggedIn.loggedInSection.insertAdjacentHTML('beforeend', markup);
