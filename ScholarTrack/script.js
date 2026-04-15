let students = [];
let scholarships = [];

// ===== INIT =====
window.onload = function () {
  loadStudents();
  fetchScholarships();
  fetchCountries();
  setupEvents();
};

// ===== STUDENTS =====
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
    name,
    age: Math.floor(Math.random() * 10) + 18,
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

  students.forEach(s => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
  <h3>${s.name}</h3>
  <p>Age: ${s.age}</p>
  <p>Progress: ${s.progress}%</p>

  <button onclick="deleteStudent(${s.id})">Delete</button>
  <button onclick="editStudent(${s.id})">Edit</button>
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

  const newName = prompt("Enter new name:", student.name);

  if (newName && newName.trim() !== "") {
    student.name = newName;

    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
  }
}
// ===== SCHOLARSHIPS =====
async function fetchScholarships() {
  try {
    const res = await fetch("https://universities.hipolabs.com/search?country=United States");
    const data = await res.json();

    if (data.length === 0) throw new Error("No data");

    scholarships = data.slice(0, 8).map(u => ({
      title: u.name + " Scholarship",
      country: u.country,
      amount: Math.floor(Math.random() * 20000) + 5000
    }));

  } catch (error) {
    console.log("Using fallback scholarships");

    // 🔥 STRONG FALLBACK (VERY IMPORTANT)
    scholarships = [
      { title: "Mastercard Foundation Scholarship", country: "Uganda", amount: 10000 },
      { title: "DAAD Scholarship", country: "Germany", amount: 15000 },
      { title: "Chevening Scholarship", country: "United Kingdom", amount: 20000 },
      { title: "Fulbright Scholarship", country: "United States", amount: 25000 },
      { title: "Erasmus Scholarship", country: "France", amount: 18000 },
      { title: "Australia Awards", country: "Australia", amount: 22000 }
    ];
  }

  loadScholarships();
}

function loadScholarships(list = scholarships) {
  const container = document.getElementById("scholarshipContainer");
  container.innerHTML = "";

  list.forEach((s, i) => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${s.title}</h3>
      <p>${s.country}</p>
      <p>$${s.amount}</p>
      <button onclick="showDetails(${i})">Details</button>
    `;

    container.appendChild(div);
  });
}

// ===== COUNTRIES =====
async function fetchCountries() {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();

    const container = document.getElementById("countriesContainer");
    container.innerHTML = "";

    data.slice(0, 5).forEach(c => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `<h4>${c.name.common}</h4>`;
      container.appendChild(div);
    });

  } catch (error) {
    console.log(error);
  }
}

// ===== EVENTS =====
function setupEvents() {
  document.getElementById("search").addEventListener("input", e => {
    const val = e.target.value.toLowerCase();

    const filtered = scholarships.filter(s =>
      s.title.toLowerCase().includes(val) ||
      s.country.toLowerCase().includes(val)
    );

    loadScholarships(filtered);
  });

  document.getElementById("sortAmount").addEventListener("click", () => {
    const sorted = [...scholarships].sort((a, b) => b.amount - a.amount);
    loadScholarships(sorted);
  });

  document.getElementById("btn").addEventListener("click", () => {
    alert("Button clicked!");
  });
}

// ===== MODAL SIMPLE =====
function showDetails(i) {
  alert(
    scholarships[i].title + " - " +
    scholarships[i].country + " ($" + scholarships[i].amount + ")"
  );
}

// ===== EXCHANGE =====
async function convertFees(amount) {
  const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
  const data = await res.json();

  const ugx = amount * data.rates.UGX;

  document.getElementById("feesOutput").innerText =
    `100 USD = ${ugx.toFixed(2)} UGX`;
}