import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getAuth ,GoogleAuthProvider ,onAuthStateChanged ,signOut} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyA3ZYOfuhkG9Xn_nxS6Ox242AO-PyiIh2g",
  authDomain: "chat-app-ahmed-saylani.firebaseapp.com",
  projectId: "chat-app-ahmed-saylani",
  storageBucket: "chat-app-ahmed-saylani.appspot.com",
  messagingSenderId: "71499162713",
  appId: "1:71499162713:web:5f2904dc9801f570c0bd48",
  measurementId: "G-1WB7M7HH3M"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


let currentPageName =window.location.pathname.split('/').pop();
console.log(currentPageName)


const onLoad = ()=>{

    onAuthStateChanged(auth, (user) => {
        if (user) {
          
          const uid = user.uid;
        if(currentPageName !== "index.html")  
          window.location.href ="index.html"

        } else {
            window.location.href ="login.html"
        }
      });

}
onLoad()

const signOutFun =()=>{
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
  
}



let signOutBtn = document.getElementById("signout");

signOutBtn &&  signOutBtn.addEventListener("click",signOutFun)


