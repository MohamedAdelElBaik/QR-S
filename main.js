const emailInput = document.querySelector(".email");
const passwordInput = document.querySelector(".password");
const btnLogin = document.querySelector(".btnLogin");
const errorDisplay = document.querySelector(".error");
const container_1 = document.querySelector(".container_1");
const container_2 = document.querySelector(".container_2");
const studentName = document.querySelector(".student--name");
const studentLevel = document.querySelector(".student--level");
const studentId = document.querySelector(".student--id");

let studentData = "";

const addStudentData = (data) => {
  studentName.textContent = data.name;
  studentLevel.textContent = data.level;
  studentId.textContent = data.sittingNumber;
};

btnLogin.addEventListener("click", () => {
  studentData = "";
  errorDisplay.textContent = "";

  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  console.log(emailValue);
  console.log(passwordValue);

  if (!emailValue || !passwordValue)
    return (errorDisplay.textContent = "اسم المستخدم وكلمة السر مطلوبة");

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sittingNumber: emailValue,
      password: passwordValue,
    }),
  };

  fetch(
    "https://kind-puce-python-shoe.cyclic.app/api/students/login",
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => (studentData = data.data))
    .then((data) => console.log(studentData))
    .then((__) => {
      if (studentData) {
        addStudentData(studentData);
        container_1.classList.add("hidden");
        container_2.classList.remove("hidden");
      } else {
        errorDisplay.textContent = "البيانات التي ادخلتها ليست صحيحة";
      }
    })
    .catch((error) => console.error(error));
});
