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
      <p>Age: ${student.age}</p>
      <p>Course: ${student.course}</p>
      <p>Progress: ${student.progress}%</p>
      <button onclick="deleteStudent(${student.id})">Delete</button>
      <button onclick="editStudent(${student.id})">Edit</button>
    `;

    container.appendChild(div);
  });
}

function deleteStudent(id) {
  students = students.filter(s => s.id !== id);
  localStorage.setItem("students", JSON.stringify(students));
  displayStudents();
}

function editStudent(id) {
  const student = students.find(s => s.id === id);
  const newName = prompt("Edit name:", student.name);

  if (newName) {
    student.name = newName;
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
  }
}

// ================= SCHOLARSHIPS =================
function loadScholarships() {
  displayScholarships(scholarships);
}

function displayScholarships(data) {
  const container = document.getElementById("scholarshipContainer");
  container.innerHTML = "";

  data.forEach(sch => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${sch.title}</h3>
      <p><strong>Country:</strong> ${sch.country}</p>
      <p><strong>Field:</strong> ${sch.field}</p>
      <p><strong>Level:</strong> ${sch.level}</p>
      <p><strong>Deadline:</strong> ${sch.deadline}</p>
      <p><strong>Amount:</strong> $${sch.amount}</p>
    `;

    container.appendChild(div);
  });
}

// ================= SEARCH =================
const searchInput = document.getElementById("search");

if (searchInput) {
  searchInput.addEventListener("input", function () {
    const value = this.value.toLowerCase();

    const filtered = scholarships.filter(s =>
      s.title.toLowerCase().includes(value)
    );

    displayScholarships(filtered);
  });
}

// ================= EVENTS =================
document.getElementById("btn").addEventListener("click", function () {
  alert("Button clicked!");
});

// ================= API 1 =================
async function convertFees(amountUSD) {
  try {
    const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    const data = await res.json();

    const rate = data.rates.UGX;
    const ugx = amountUSD * rate;

    document.getElementById("feesOutput").innerText =
      "Fees in UGX: " + ugx.toFixed(2);
  } catch (error) {
    document.getElementById("feesOutput").innerText = "API Error";
  }
}

// ================= API 2 =================
async function loadCountries() {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();

    console.log("Countries loaded:", data.length);
  } catch (error) {
    console.log("Countries API error", error);
  }
}