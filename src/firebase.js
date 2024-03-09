import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxxNtrxVN7Nq7RC2R69SIvMAnS2EWKKq8",
  authDomain: "vidvibe-project.firebaseapp.com",
  projectId: "vidvibe-project",
  storageBucket: "vidvibe-project.appspot.com",
  messagingSenderId: "406353112426",
  appId: "1:406353112426:web:2e6351f53c2426fdff0913",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
