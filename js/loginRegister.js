let haveAccountBtn = document.querySelectorAll(".have-account");
let noAccountBtn  = document.querySelectorAll(".no-account");
let haveAccountScreen = document.querySelector(".overlay");
let noAccountScreen   = document.querySelector(".overlay-1");
let errorSignUp =  document.querySelector(".overlay-1 #error");
let loading   = document.getElementById("loading")
let proccessDiv = loading.parentElement;
haveAccountBtn.forEach(function(item){
    item.addEventListener("click",function(){
        haveAccountScreen.style.setProperty("display", "flex", 'important');
        noAccountScreen.style.setProperty("display", "none", 'important');
        noAccountScreen.style.setProperty("transform","translateX(50%)","!important")
        haveAccountScreen.style.setProperty("transition", "1s", 'important');
    })
});
noAccountBtn.forEach(function(item){
    item.addEventListener("click",function(){
        haveAccountScreen.style.setProperty("display", "none", 'important');
        noAccountScreen.style.setProperty("display", "flex", 'important');
        haveAccountScreen.style.setProperty("transform","translateX(50%)","!important")
        noAccountScreen.style.setProperty("transition", "1s", 'important');    })
});

// signup
let userNameUp = document.querySelector(".overlay-1 input[type='text']");
let passwordUp = document.querySelector(".overlay-1 input[type='password']");
let emailUp    = document.querySelector(".overlay-1 input[type='email']");
let phoneUp    = document.querySelector("input[type='number']");
let userImage  = document.querySelector("input[type='file']")
let signUp     = document.querySelector("#signUP");
//   userImage.addEventListener("input",()=>{
//     console.log(userImage.files[0])
//   })
signUp.addEventListener("click",function(event){
    event.preventDefault();
    proccess("...جاري انشاء حسابك")
    if(passwordUp.value.length > 8 &&  phoneUp.value.length > 11){
        localStorage.setItem("userName",userNameUp.value);
        localStorage.setItem("email",emailUp.value);
        localStorage.setItem("password",passwordUp.value);
        localStorage.setItem("phone",phoneUp.value);
        let imgFile =userImage.files[0];
        if(imgFile){
            let reader = new FileReader()
            reader.onload = ()=>{
            let imgUrl = reader.result
            localStorage.setItem("photo",imgUrl)
            }
        reader.readAsDataURL(imgFile);
        }
        haveAccountScreen.style.setProperty("display", "flex", 'important');
        noAccountScreen.style.setProperty("display", "none", 'important');
        noAccountScreen.style.setProperty("transform","translateX(50%)","!important")
        haveAccountScreen.style.setProperty("transition", "1s", 'important');
        setTimeout(() => {
            closeProccess();
            setUi();
            console.log("djji")
        }, 1500);
        
    }
    if(passwordUp.value.length < 8){
        errorSignUp.classList.add("error");
        errorSignUp.innerHTML="password must > 8 charcter"
        closeProccess()
    }
    if(phoneUp.value.length < 11){
        errorSignUp.classList.add("error");
        errorSignUp.innerHTML="phone must > 11 num"
        closeProccess()
    }
    if(!emailUp.value.includes("@")){
        errorSignUp.classList.add("error");
        errorSignUp.innerHTML="enter valid email"
        closeProccess()
    }
    if(!userNameUp.value.includes("")){
        errorSignUp.classList.add("error");
        errorSignUp.innerHTML="enter a username"
        closeProccess()
    }
})




// signIn
let passwordIn = document.querySelector(".overlay input[type='password']");
let userNameIn   = document.querySelector(".overlay input[type='text']");
let signIn     = document.querySelector("#signIn");
let userNameNav = document.querySelector(".user")
let errorSignIn =  document.querySelector(".overlay #errorSignIn");

signIn.addEventListener("click",function(event){
    event.preventDefault();
    proccess("... جاري تسجيل الدخول")
    if((userNameIn.value === localStorage.getItem('userName') ||userNameIn.value === localStorage.getItem('email')) && passwordIn.value === localStorage.getItem('password')){
        setTimeout(() => {
            closeProccess();
            setUi();
        }, 1500);
    }
else{
        closeProccess()
        errorSignIn.classList.add("error");
        errorSignIn.innerHTML="el password , username ghlt y3m"
    }
})



function proccess(message){
    proccessDiv.style.setProperty("display", "flex", 'important');
    loading.innerHTML= message;
}
function closeProccess(){
    proccessDiv.style.setProperty("display","none",'important')
    loading.innerHTML=""
}
function setUi(){
    let token = localStorage.getItem("userName")
    if(token!==null){
        window.location="index.htm"
    }
}
