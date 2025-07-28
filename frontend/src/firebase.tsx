// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDyArZliicMlQqSLFDDiqI0rFtUJPz9L34",
  authDomain: "nexintel-ai-summarizer.firebaseapp.com",
  projectId: "nexintel-ai-summarizer",
  storageBucket: "nexintel-ai-summarizer.appspot.com", // ✔️ corrected domain
  messagingSenderId: "120280829617",
  appId: "1:120280829617:web:b97d42d4936f6465139c90"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
