import test from "../../templates/test.hbs";
console.log(test);
console.log(typeof(test));

const data = {
    img: "https://image.ibb.co/ebG8vq/1-team-small.jpg"
};
const markup = test(data);
console.log(markup);

document.querySelector(".logged-in").innerHTML = markup;