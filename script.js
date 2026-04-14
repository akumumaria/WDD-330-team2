// ================= GLOBAL DATA =================
let students = [];

// ================= SCHOLARSHIPS DATA =================
const scholarships = [
  {
    title: "Mastercard Foundation Scholarship",
    country: "Uganda",
    amount: 10000,
    deadline: "2026-06-01",
    field: "Computer Science",
    level: "Undergraduate",
    university: "Makerere University",
    eligibility: "African students",
    description: "Full scholarship"
  },
  {
    title: "DAAD Scholarship",
    country: "Germany",
    amount: 15000,
    deadline: "2026-07-01",
    field: "Engineering",
    level: "Masters",
    university: "TU Berlin",
    eligibility: "International students",
    description: "Fully funded"
  },
  {
    title: "Chevening Scholarship",
    country: "United Kingdom",
    amount: 20000,
    deadline: "2026-05-01",
    field: "Any Field",
    level: "Masters",
    university: "Various UK Universities",
    eligibility: "Global students",
    description: "Fully funded"
  },
  {
    title: "Fulbright Scholarship",
    country: "United States",
    amount: 25000,
    deadline: "2026-08-01",
    field: "Various Fields",
    level: "Masters/PhD",
    university: "US Universities",
    eligibility: "International students",
    description: "Covers tuition and living costs"
  }
];

// ================= INIT =================
window.onload = function () {
  console.log("App Loaded ✅");

  loadStudents();
  loadScholarships();   // 🔥 FORCE DISPLAY
  loadCountries();      // second API
};

// ================= STUDENTS =================
function loadStudents() {
  const data = JSON.parse(localStorage.getItem("students"));
  if (data) {
    students = data;
    displayStudents();
  }
}

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("input").value;

  const student = {
    id: Date.now(),
    name: name,
    age: Math.floor(Math.random() * 10) + 18,
    course: "Computer Science",
    progress: Math.floor(Math.random() * 100)
  };

  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));

  displayStudents();
  document.getElementById("input").value = "";
});

function displayStudents() {
  const container = document.getElementById("studentsContainer");
  container.innerHTML = "";

  students.forEach(student => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${student.name}</h3>
      <p>Age: ${student.age}</p>`;

    container.appendChild(div);
  });
}

// ================= SCHOLARSHIPS =================
function loadScholarships() {
  const container = document.getElementById("scholarshipContainer");
  container.innerHTML = "";

  scholarships.forEach(scholarship => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3>${scholarship.title}</h3>
      <p>Country: ${scholarship.country}</p>
      <p>Amount: $${scholarship.amount}</p>
      <p>Deadline: ${scholarship.deadline}</p>
      <p>Field: ${scholarship.field}</p>
      <p>Level: ${scholarship.level}</p>
      <p>University: ${scholarship.university}</p>
      <p>Eligibility: ${scholarship.eligibility}</p>
      <p>${scholarship.description}</p>
    `;
    container.appendChild(div);
  });
}

// ================= ACTIONS =================
function convertFees(amount) {
  // Example: convert USD to EUR (dummy rate)
  const rate = 0.92;
  const eur = (amount * rate).toFixed(2);
  document.getElementById("feesOutput").textContent = `$${amount} = €${eur}`;
}

// ================= COUNTRIES (DUMMY) =================
function loadCountries() {
  // Placeholder for API call
  console.log("Countries loaded (dummy)");
}
