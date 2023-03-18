const emailInput = document.querySelector(".email");
const passwordInput = document.querySelector(".password");
const btnLogin = document.querySelector(".btnLogin");
const errorDisplay = document.querySelector(".error");
let studentData = "";

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
    .catch((error) => console.error(error));
});

/*
{
  "_id": "6403a64941105e1b48fb988e",
  "name": "محمد عادل محمد صالح",
  "sittingNumber": 181600317,
  "department": "كهرباء",
  "division": "حاسبات وتحكم",
  "level": 5,
  "createdAt": "2023-03-04T20:12:57.818Z",
  "updatedAt": "2023-03-04T20:12:57.818Z",
  "passwordChangedAt": "2023-03-04T20:12:57.359Z",
  "__v": 0
}
*/
