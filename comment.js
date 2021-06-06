"use strict";

document.cookie = "crossCookie=bar; SameSite=None; Secure";

/* comments */
const commentsUl = document.querySelector(".comments");
let commentsData = [
    {
        userName: "Limi",
        userPhoto: "img/limPhoto.png",
        date: dateForm(),
        createdAt: 1622908185945,
        comment: "Is this your cat?! SO CUTE 🥰"
    },
    {
        userName: "Adam",
        userPhoto: "img/adamPhoto.png",
        date: dateForm(),
        createdAt: 1622916314040,
        comment: "I wanna pat herrrr..."
    }
];

function dateForm(){
    const dateOption = {year:"numeric", month:"2-digit", day:"2-digit"}
    const now = new Date().toLocaleDateString("ko-KR", dateOption);
    return now.replaceAll(". ", "/").slice(0, 10);
}

class LiModel {
    constructor(name, photo, date, createdAt, comment){
        this.userName = name,
        this.userPhoto = photo,
        this.date = date,
        this.createdAt = createdAt,
        this.comment = comment
    }
    makeLi(){
        const li = document.createElement("li");
        li.classList.add("comment");
        let TIME = Date.now();
        let passedTime = (TIME - this.createdAt)/1000;
        let timeView;
        if(passedTime < 60 ){
            timeView = "now";
        }else if(Math.floor(passedTime) === 60){
            timeView = "1 minute ago"
        }else if(Math.floor(passedTime) < 60 * 60){
            timeView = `${Math.floor(passedTime / 60)} mintues ago`
        }else if(Math.floor(passedTime) === 60 * 60){
            timeView = "1 hour ago"
        }
        else if(Math.floor(passedTime) < 24 * 60 * 60){
            timeView =`${Math.floor(passedTime / 60 / 60)} hours ago`
        }else{
            timeView = this.date;
        }
        const dom = `
            <div class="profile">
                <img class="userPic" src="${this.userPhoto}" alt="사용자 프로필 이미지" />
                <span class="userName">${this.userName}</span>
                <span class="createdAt">${timeView}</span>
                <div class="option">
                    <a href="#option" class="optionToggle" onclick="toggleOption()">● ● ●</a>
                    <ul>
                        <li>
                            <a href="#update">Update</a>
                        </li>
                        <li>
                            <a href="#delete">Delete</a>
                        </li>
                    </ul>
                </div>
            </div>
            <p>${this.comment}</p>
            <ul class="socialBlock" onclick="setClickEvent()">
                <li>
                    <a href="#reply" class="likes">Reply</a>
                </li>
                <li>
                    <button type="button" class="likes"></button>
                    <span class="count">0</span>
                </li>
                <li>
                    <button type="button" class="dislikes"></button>
                    <span class="count">0</span>
                </li>
            </ul>
        `;
        li.innerHTML = dom;
        commentsUl.prepend(li);
    }
}

commentsData.map(el => {
    const {userName, userPhoto, date, createdAt, comment} = el;
    const aComment = new LiModel(userName, userPhoto, date, createdAt, comment);
    aComment.makeLi();
});

/* create comments */
const createForm = document.forms.commentForm;
createForm.addEventListener("submit", (e)=>{
    onCreate(e);
});

function onCreate(e){
    e.preventDefault();
    let filter = ["바보", "멍청이", "idiot", "stupid"];
    const input = e.target.comment;
    const text = input.value.toLowerCase();
    for(let i of filter){
        if(text.includes(i)){
            return window.alert(`Please use better words for the others!`);
        }else{
            continue;
        }
    }
    const getUsers = commentsData.map(el => el.userName);
    const lastComment = getUsers.lastIndexOf("CIZION");
    if(lastComment>0 && commentsData[lastComment].createdAt >= Date.now() - 6000){
        return window.alert(`Sorry! Cannot leave a comment in a row! \nPlease try later :)`);
    }else{
        const newComment = new LiModel("CIZION", "img/userPhoto.png", dateForm(), Date.now(), input.value);  
        commentsData.push(newComment); 
        commentsData[commentsData.length-1].makeLi();
        input.value = "";
        commentNum.innerText = comments.length;
    }
}
/* delete comments */
function toggleOption(){
    const {target} = window.event;
    target.parentNode.classList.toggle("active");
}

/* comments counter */
const commentNum = document.querySelector(".commentNum");
const comments = document.getElementsByClassName("comment");
commentNum.innerText = comments.length;

function setClickEvent(){
    const {target} =window.event;

    function onClickToggle(){
        const parent = target.parentNode;
        const num = parent.childNodes[3];
        const ulBlock = parent.parentNode;
        let count = Number(num.textContent);
        if(!target.classList.contains("active")){
            if(ulBlock.classList.contains("done")){
                alert("Sorry! You can only like OR dislike this!");
            }else{
                target.classList.add("active");
                count++;
                ulBlock.classList.add("done");
            }
        }else{
            target.classList.remove("active");
            count--;
            ulBlock.classList.remove("done");
        }
        num.innerText = count;
    }

    if(target.nodeName === "BUTTON"){
        if(target.classList.contains("likes")){
            onClickToggle();
        }else{
            onClickToggle();
        }
    }
}


/* log in */
const notLoggedIn = document.querySelector(".notLoggedIn");
const getInBtn = document.getElementById("LogIn");
const socialLogin = document.querySelector(".socialLogin");
const mobileFrame = document.querySelector(".mobile");
const snsBtn = document.querySelectorAll(".snsBtn");
const loginBox = document.querySelector(".loginBox");
const snsBox = document.querySelector(".snsBox");
/* socialLogin activation */
notLoggedIn.addEventListener("click", (e)=>{
    const {target} = e;
    if(target.classList.contains("socialLogin")){
        socialLogin.classList.remove("active");
        mobileFrame.style.overflowY = "visible";
    }else{
        socialLogin.classList.add("active");
        mobileFrame.style.overflowY = "hidden";
    }
});
snsBtn.forEach(el=>{
    el.addEventListener("click", (e)=>{
        e.preventDefault();
        const {target} = e;
        setParam(target);
        setTitle();
        snsBox.classList.add("done");
        loginBox.classList.add("active");
    });
});
function setParam(target){
    let query = target.getAttribute("href");
    if(target.nodeName === "SPAN"){
        query = target.parentNode.getAttribute("href");
    }
    window.location.hash=query;
}
function setTitle(){
    let queryString = window.location.hash;
    console.log(queryString)
    queryString = queryString.slice(1);
    const thisSNS = document.querySelector(".thisSNS");
    thisSNS.innerText = `Sign In with ${queryString}`;
}

/* logInForm */
const closeBtn = document.getElementById("closeBox");
closeBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    snsBox.classList.remove("done");
    loginBox.classList.remove("active");
});

const thisForm = document.forms.socialLoginForm;
thisForm.addEventListener("submit", ()=>{
    onSingIn();
})

function onSingIn(){
    const {email, password} = thisForm;
    if(email !== ""){
        if(password !== ""){
            let token = email.value
            sessionStorage.setItem("token", token);
            window.location.reload();
        }else{
            alert('Please enter your password!');
        }
    }else{
        alert('Please enter your email address!');
    }
    mobileFrame.style.overflowY = "visible";
}
const logOut = document.getElementById("logOut");

logOut.addEventListener("click", ()=>{
   let confirm = window.confirm("Do you really want to leave?");
   if(confirm){
        sessionStorage.removeItem("token");
        window.location.reload();
        console.log(sessionStorage.getItem("token"));
        verifyLogin();
   }
});
verifyLogin();
function verifyLogin(){
    const userToken = sessionStorage.getItem("token");
    const notLoggedIn = document.querySelector(".notLoggedIn");
    const loggedIn = document.querySelector(".loggedIn");
    if(Boolean(userToken)){
        logOut.style.display = "block";
        notLoggedIn.style.display = "none";
        loggedIn.style.display = "block";
    }else{
        logOut.style.display = "none";
        notLoggedIn.style.display = "block";
        loggedIn.style.display = "none";
    }
}