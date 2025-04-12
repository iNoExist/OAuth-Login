import { auth, GoogleAuthProvider, signInWithPopup, signOut } from './firebase-config.js';

const googleProvider = new GoogleAuthProvider();
const text = document.getElementById("text");
const loginBtn = document.getElementById("btn-siwg");
const logoutBtn = document.getElementById("btn-so");
const alertContainer = document.getElementById("alert-container");
var username;

const loginSIWG = async () => {
    signInWithPopup(auth, googleProvider)
    .then((result) => {

      const user = result.user;
      username = user.displayName || user.email;
      console.log("User signed in:", user);

      text.innerHTML = `<h3>Hi ${username} 👋</h3>`;
      loginBtn.style.display = "none";
      logoutBtn.style.display = "flex";
      showAlert("Signed in successfully!");
    })
    .catch((error) => {
      console.error("Error during Google Sign-In:", error);
    });
};

const logoutSOWG = async () => {
    try {
        await signOut(auth);  // Sign out the user
        console.log("User signed out");
  
      // Clear the displayed user info and update the UI
      text.innerHTML = `<h3>Goodbye ${username}! 👋</h3>`;
  
      // Show the login button and hide the logout button
      loginBtn.style.display = "flex";
      logoutBtn.style.display = "none";
      showAlert("Logged out successfully!");
    } catch (error) {
      console.error("Error during Sign-Out:", error);
    }
  };


  const showAlert = (message) => {
    // Create a new alert box
    const alertBox = document.createElement("div");
    alertBox.classList.add("alert-box");
    alertBox.innerText = message;
    
    // Append the new alert to the container
    alertContainer.appendChild(alertBox);
    
    // Trigger the sliding effect
    setTimeout(() => {
      alertBox.classList.add("show");
    }, 100); // Delay to allow the element to be added to the DOM
  
    // Remove the alert after 3 seconds
    setTimeout(() => {
      alertBox.classList.remove("show");
      setTimeout(() => {
        alertBox.remove(); // Remove the alert box from the DOM completely
      }, 300); // Wait for the slide-out animation to finish
    }, 3000); // Alert will stay visible for 3 seconds
  };


loginBtn.addEventListener("click", loginSIWG);
logoutBtn.addEventListener("click", logoutSOWG);
