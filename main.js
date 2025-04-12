import { auth, GoogleAuthProvider, signInWithPopup } from './firebase-config.js';

const googleProvider = new GoogleAuthProvider();
const app = document.getElementById("app");
const loginBtn = document.getElementById("btn-siwg");
const logoutBtn = document.getElementById("btn-so");

const loginSIWG = async () => {
    signInWithPopup(auth, googleProvider)
    .then((result) => {
      // User is signed in
      const user = result.user;
      console.log("User signed in:", user);
      app.innerHTML = `<h3>Hi ${user.displayName || user.email} 👋</h3>`;
    })
    .catch((error) => {
      console.error("Error during Google Sign-In:", error);
    });
};


loginBtn.addEventListener("click", loginSIWG);
