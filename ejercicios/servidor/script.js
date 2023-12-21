// script.js

const options = { method: "GET" };

fetch("http://localhost:5000/users", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

document.getElementById("b1").addEventListener("click", function () {
  fetch("data.txt")
    .then((response) => response.text())
    .then((text) => {
      document.getElementById("displayText").innerText = text;
      alert("Text content fetched successfully.");
    })
    .catch((error) => console.error("Error loading text:", error));
});

document.getElementById("b2").addEventListener("click", function () {
  fetch("http://127.0.0.1:5000/users/2")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("jsonDisplay").innerText = JSON.stringify(
        data,
        null,
        2
      );
      alert("Cargar JSON clicked.");
    })
    .catch((error) => console.error("Error loading JSON:", error));
});

document.getElementById("b3").addEventListener("click", function () {
  fetch("http://127.0.0.1:5000/users")
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Add this line to inspect the data structure
      const userList = data.users.map(
        (user) => `${user.nombre}, ${user.empresa}, ${user.trabajo}`
      );
      document.getElementById("jsonListDisplay").innerText =
        userList.join("\n");
      alert("Cargar lista JSON clicked.");
    })
    .catch((error) => console.error("Error loading list from JSON:", error));
});

document.getElementById("b4").addEventListener("click", function () {
  fetch("http://localhost:5000/users")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("apiDisplay").innerText = JSON.stringify(
        data,
        null,
        2
      );
      alert("Cargar de API clicked.");
    })
    .catch((error) => console.error("Error loading data from API:", error));
});

// Assuming you have a global variable 'users' to store the user data
let users = [];

// Function to add a new user
function addUser(newUser) {
  users.push(newUser);
  console.log("User added:", newUser);
}

// Function to update a user by ID
function updateUser(userId, updatedUserData) {
  const userToUpdate = users.find((user) => user.id === userId);
  if (userToUpdate) {
    Object.assign(userToUpdate, updatedUserData);
    console.log("User updated:", userToUpdate);
    displayUsers(); // Update the displayed users
  } else {
    console.error("User not found for update");
  }
}

function displayUsers() {
  console.log("Current Users:", users);
}

function deleteUser(userId) {
  users = users.filter((user) => user.id !== userId);
  console.log("User deleted:", userId);
}

document.getElementById("addUserButton").addEventListener("click", function () {
  const newUser = {
    id: document.getElementById("userId").value,
    nombre: document.getElementById("userName").value,
    empresa: document.getElementById("userCompany").value,
    trabajo: document.getElementById("userJob").value,
  };

  addUser(newUser);
  displayUsers(); // Update the displayed users
});

document
  .getElementById("updateUserButton")
  .addEventListener("click", function () {
    const userIdToUpdate = document.getElementById("userId").value;
    const updatedUserData = {
      nombre: document.getElementById("userName").value,

      empresa: document.getElementById("userCompany").value,
      trabajo: document.getElementById("userJob").value,
    };

    updateUser(userIdToUpdate, updatedUserData);
  });

document
  .getElementById("deleteUserButton")
  .addEventListener("click", function () {
    // Get the user ID from the input field
    const userIdToDelete = document.getElementById("userIdToDelete").value;

    // Check if the entered ID is a number
    if (!isNaN(userIdToDelete) && userIdToDelete !== "") {
      // Example of deleting a user
      deleteUser(parseInt(userIdToDelete));
    } else {
      alert("Please enter a valid numeric user ID.");
    }
  });
