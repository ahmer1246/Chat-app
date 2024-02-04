import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getAuth ,createUserWithEmailAndPassword ,signInWithPopup ,GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyA3ZYOfuhkG9Xn_nxS6Ox242AO-PyiIh2g",
  authDomain: "chat-app-ahmed-saylani.firebaseapp.com",
  projectId: "chat-app-ahmed-saylani",
  storageBucket: "chat-app-ahmed-saylani.appspot.com",
  messagingSenderId: "71499162713",
  appId: "1:71499162713:web:5f2904dc9801f570c0bd48",
  measurementId: "G-1WB7M7HH3M"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

let signupBtn =document.getElementById("signup");
let showPass = document.getElementById("showPass");  
let emailError = document.querySelector(".emailerror");
let passwordError = document.querySelector(".passerror");
let signupwithGoogle =document.getElementById("signupWithgoogle");


const showPassword =()=>{
  let passwordtype =document.getElementById("password"); 
  console.log(passwordtype)
  if(passwordtype.type !== "text"){
    passwordtype.type="text";
  }

  else {
     passwordtype.type = "password"
  }
  
  
}


// 

const signUp = (e)=>{
e.preventDefault();

  let password =document.getElementById("password").value;
  let email =document.getElementById("email").value;


  const emailValidate =()=>{
    let regx =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; 
    if(regx.test(email)){
      emailError.style.display = "none";
      console.log("sucess")
    }
    else{
      emailError.style.display ="block";
      console.log("failed")
    }
  
  
  }
  
  
  const passwordValidate=()=>{
  
    
    let passLenngth = password.length;
    if(passLenngth < 6){
      passwordError.style.display="block"
    }
    else{
      passwordError.style.display="none"
    }
  }
  
  passwordValidate();
  emailValidate();
  

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
   
    const user = userCredential.user;
    // ...
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
   
  });
}

const signupWithGoogle =(e)=>{
e.preventDefault();
  signInWithPopup(auth, provider)

  .then((result) => {
 
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
   
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    window.location.href ="index.html"
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}



signupwithGoogle && signupwithGoogle.addEventListener("click",signupWithGoogle)
showPass.addEventListener("click",showPassword)
signupBtn && signupBtn.addEventListener("click",signUp)