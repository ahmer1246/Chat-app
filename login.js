import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getAuth ,signInWithEmailAndPassword ,signInWithPopup ,GoogleAuthProvider ,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";


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




let emailError = document.querySelector(".emailerror");
let passwordError = document.querySelector(".passerror");
let signinBtn =document.getElementById("signin");
let showPass = document.getElementById("showPass");  
let signinwithGoogle =document.getElementById("signinWithgoogle");
let currentPageName =window.location.pathname.split('/').pop();


const showPassword =()=>{
  let passwordtype =document.getElementById("password"); 
  console.log(passwordtype)
  if(passwordtype.type !== "text"){
    passwordtype.type="text";
  }

  else {
     passwordtype.type = "password"
  } }

  const onLoad = ()=>{

    onAuthStateChanged(auth, (user) => {
        if (user) {
          
          const uid = user.uid;
        if(currentPageName !== "index.html")  
          window.open.location ="index.html"

        } else {
            window.open.location ="login.html"
        }
      });

}
onLoad()





const loginWithPassword =(e)=>{
  e.preventDefault();
  let password =document.getElementById("password").value;
  let email =document.getElementById("email").value;


  const emailValidate =()=>{

    let email =document.getElementById("email").value;
    let regx =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(regx.test(email)){
      emailError.style.display = "none";
      console.log("sucess")
    }
    else{
      emailError.style.display ="block";
      console.log("failed")   }}
  
  
  const passwordValidate=()=>{
  
    let password =document.getElementById("password").value;
    let passLenngth = password.length;
    if(passLenngth < 6){
      passwordError.style.display="block"
    }
    else{
      passwordError.style.display="none"
    }
  }

emailValidate();
passwordValidate();



    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 



    const user = userCredential.user;
    window.location.href ="index.html"
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

}



const loginWithGoogle = (e)=>{

      e.preventDefault();
    

    signInWithPopup(auth, provider)
     .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    window.location.href ="index.html"
      
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





 showPass && showPass.addEventListener("click",showPassword)
  signinBtn && signinBtn.addEventListener("click",loginWithPassword)
  signinwithGoogle && signinwithGoogle.addEventListener("click",loginWithGoogle)






