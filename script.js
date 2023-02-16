const blankErr = "Can't be blank";
const formatErr = "Wrong format";

const fullname = document.getElementById("name");
const mail = document.getElementById("email");
const message = document.getElementById("msg");
const form = document.getElementById("inputForm");
if (fullname) {
  fullname.addEventListener("blur", dataValidation);
}
if (mail) {
  mail.addEventListener("blur", dataValidation);
}

if (message) {
  message.addEventListener("blur", dataValidation);
}

function dataValidation() {
  if (this.value.trim() === "") {
    failState(blankErr, this);
  } else {
    if (this.id === "name") {
      if (this.value.match(/[\d]/g)) {
        failState(formatErr, fullname);
      } else {
        successState(fullname);
      }
    }
    if (this.id === "email") {
      if (this.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        successState(mail);
      } else {
        failState(formatErr, mail);
      }
    }
    if (this.id === "msg") {
      successState(message);
    }
  }
}

function failState(error, element) {
  const parent = element.parentElement;
  parent.querySelector(".error").innerHTML = error;
  parent.querySelector(".error").style.color = "#860000";
  element.style.border = "2px solid #860000";
  element.classList.add("fail");
  element.classList.remove("success");
}

function successState(element) {
  const parent = element.parentElement;
  parent.querySelector(".error").innerHTML = "";
  element.style.border = "1px solid black";
  element.classList.add("success");
  element.classList.remove("fail");
}

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const list = [fullname, mail, message];
    for (let i of list) {
      dataValidation.call(i);
    }
    if (
      fullname.classList.contains("success") &&
      mail.classList.contains("success") &&
      message.classList.contains("success")
    ) {
      alert(
        "Thank you ! your message was sent, we will answer you as soon as possible :)"
      );
    }
  });
}
