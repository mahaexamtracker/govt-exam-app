let exams = JSON.parse(localStorage.getItem("exams")) || [];

const list = document.getElementById("examList");

// Show exams
function showExams() {
  list.innerHTML = "";

  exams.forEach(function(exam, index) {

    const li = document.createElement("li");

    const today = new Date();
    const examDate = new Date(exam.date);

    const diffTime = examDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let status = "Upcoming";
    if (examDate < today) status = "Completed";

    if (status === "Completed") {
      li.style.color = "red";
    } else {
      li.style.color = "green";
    }

    if (diffDays <= 3 && diffDays >= 0) {
      li.style.backgroundColor = "#ffe0e0";
    }

    li.textContent = `${exam.name} - ${exam.place} - ${exam.date} - ${diffDays} days left`;

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = function () {

      const newName = prompt("Enter Exam Name", exam.name);
      const newCity = prompt("Enter City", exam.place);
      const newDate = prompt("Enter Date", exam.date);

      exams[index] = { name: newName, place: newCity, date: newDate };

      saveExams();
      showExams();
    };

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {

      exams.splice(index, 1);

      saveExams();
      showExams();
    };

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    list.appendChild(li);

  });
}

// Save exams
function saveExams() {
  localStorage.setItem("exams", JSON.stringify(exams));
}

// Add exam
function addExam() {

  let name = document.getElementById("examName").value;
  let city = document.getElementById("city").value;
  let date = document.getElementById("date").value;

  let exam = {
    name: name,
    place: city,
    date: date
  };

  exams.push(exam);

  saveExams();
  showExams();
}

// Run first time
showExams();