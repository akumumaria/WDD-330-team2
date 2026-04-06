let students = [];

// ================= LOAD DATA =================
window.onload = function () {
  const data = JSON.parse(localStorage.getItem("students"));

  if (data) {
    students = data;
    displayStudents();
  }
};

// ================= ADD STUDENT =================
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("input").value;

  const student = {
    name: name,
    age: Math.floor(Math.random() * 10) + 18,
    course: "Computer Science",
    progress: Math.floor(Math.random() * 100),
    id: Date.now()
  };

  students.push(student);

  localStorage.setItem("students", JSON.stringify(students));

  displayStudents();

  document.getElementById("input").value = "";
});

// ================= DISPLAY =================
function displayStudents() {
  const container = document.getElementById("studentsContainer");
  container.innerHTML = "";

  students.forEach((student) => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${student.name}</h3>
      <p>Age: ${student.age}</p>
      <p>Course: ${student.course}</p>
      <p>Progress: ${student.progress}%</p>
      <button onclick="deleteStudent(${student.id})">Delete</button>
      <button onclick="editStudent(${student.id})">Edit</button>
    `;

    container.appendChild(div);
  });
}

// ================= DELETE =================
function deleteStudent(id) {
  students = students.filter((s) => s.id !== id);
  localStorage.setItem("students", JSON.stringify(students));
  displayStudents();
}

// ================= EDIT =================
function editStudent(id) {
  const student = students.find(s => s.id === id);
  const newName = prompt("Edit name:", student.name);

  if (newName) {
    student.name = newName;
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
  }
}

// ================= EVENTS =================
document.getElementById("btn").addEventListener("click", function () {
  alert("Button clicked!");
});

document.getElementById("input").addEventListener("input", function () {
  console.log("Typing...");
});

document.addEventListener("DOMContentLoaded", function () {
  console.log("Page loaded");
});

// ================= API =================
async function getExchangeRate() {
  try {
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    const data = await response.json();

    return data.rates.UGX;
  } catch (error) {
    console.log("API error", error);
  }
}

async function convertFees(amountUSD) {
  const rate = await getExchangeRate();

  if (rate) {
    const ugx = amountUSD * rate;

    document.getElementById("feesOutput").innerText =
      "Fees in UGX: " + ugx.toFixed(2);
  } else {
    document.getElementById("feesOutput").innerText =
      "Error fetching exchange rate";
  }
}