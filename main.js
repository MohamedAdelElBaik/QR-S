const emailInput = document.querySelector(".email");
const passwordInput = document.querySelector(".password");
const btnLogin = document.querySelector(".btnLogin");
const errorDisplay = document.querySelector(".error");
const container_1 = document.querySelector(".container_1");
const container_2 = document.querySelector(".container_2");
const container_3 = document.querySelector(".container_3");
const studentName = document.querySelector(".student--name");
const studentLevel = document.querySelector(".student--level");
const studentId = document.querySelector(".student--id");
const btnScan = document.querySelector(".btnScan");

let token = "";
let studentData = "";
let lectureId = "";

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
    .then((res) => {
      console.log(res);
      token = res.token;
      studentData = res.data;
    })
    .then((__) => console.log(studentData, token))
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

btnScan.addEventListener("click", () => {
  container_2.classList.add("hidden");
  container_3.classList.remove("hidden");
  console.log("clicked");
  var scanner = new Instascan.Scanner({
    video: document.getElementById("preview"),
    scanPeriod: 5,
    mirror: true,
  });
  scanner.addListener("scan", function (content) {
    lectureId = content;
    console.log(lectureId);

    document.querySelector(".lectureIdDisplay").textContent = lectureId;

    // alert(content);
    //window.location.href=content;
  });
  Instascan.Camera.getCameras()
    .then(function (cameras) {
      if (cameras.length > 0) {
        scanner.start(cameras[0]);
        $('[name="options"]').on("change", function () {
          if ($(this).val() == 1) {
            if (cameras[0] != "") {
              scanner.start(cameras[0]);
            } else {
              alert("No Front camera found!");
            }
          } else if ($(this).val() == 2) {
            if (cameras[1] != "") {
              scanner.start(cameras[1]);
            } else {
              alert("No Back camera found!");
            }
          }
        });
      } else {
        console.error("No cameras found.");
        alert("No cameras found.");
      }
    })
    .catch(function (e) {
      console.error(e);
      alert(e);
    });
});
