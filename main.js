import { auth, GoogleAuthProvider, signInWithPopup, signOut } from './firebase-config.js';

const googleProvider = new GoogleAuthProvider();
const text = document.getElementById("text");
const loginBtn = document.getElementById("btn-siwg");
const logoutBtn = document.getElementById("btn-so");
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
    } catch (error) {
      console.error("Error during Sign-Out:", error);
    }
  };


loginBtn.addEventListener("click", loginSIWG);
logoutBtn.addEventListener("click", logoutSOWG);
