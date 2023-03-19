const api = "https://kind-puce-python-shoe.cyclic.app/";

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
const btnScanAgain = document.querySelector(".btnScanAgain");
const requestStatus = document.querySelector(".requestStatus");
const btnBackToMain = document.querySelectorAll(".btnBackToMain");
const successMessage = document.querySelector(".successMessage");
const failMessage = document.querySelector(".failMessage");
const statusHeader = document.querySelector(".statusHeader");

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

  fetch(`${api}api/students/login`, requestOptions)
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

const displayResult = (response) => {
  if (response.status === "success") {
    successMessage.classList.remove("hidden");
  } else if (response.status === "fail") {
    failMessage.classList.remove("hidden");
    if (response.message === "You are already attended") {
      requestStatus.textContent = "انت بالفعل مسجل في هذه المحاضرة";
      // requestStatus.textContent = ;
    } else {
      btnScanAgain.classList.remove("hidden");
      statusHeader.textContent = "حدثت مشكلة !!";
      requestStatus.textContent = "حاول مره اخري";
    }
  }
};

const sendAttendanceRequest = (lecId) => {
  console.log(lecId);
  console.log(token);

  fetch(`${api}api/attendances`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      lectureId: lecId,
      latitude: 2,
      longitude: 4,
    }),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      displayResult(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

btnScan.addEventListener("click", () => {
  container_2.classList.add("hidden");
  container_3.classList.remove("hidden");
  console.log("clicked");
  var html5QrcodeScanner = new Html5QrcodeScanner("reader", {
    fps: 10,
    qrbox: 350,
    aspectRatio: 1.777778,
  });

  function onScanSuccess(decodedText, decodedResult) {
    lectureId = decodedText;
    console.log(`Scan result: ${decodedText}`, decodedResult);

    sendAttendanceRequest(decodedText);
    html5QrcodeScanner.clear(decodedText);
  }

  html5QrcodeScanner.render(onScanSuccess);
});

btnBackToMain.forEach((btn) => {
  btn.addEventListener("click", () => {
    successMessage.classList.add("hidden");
    failMessage.classList.add("hidden");
    container_2.classList.remove("hidden");
  });
});

btnScanAgain.addEventListener("click", () => {
  successMessage.classList.add("hidden");
  failMessage.classList.add("hidden");
  container_2.classList.remove("hidden");
});
