"use strict";

document.cookie = "crossCookie=bar; SameSite=None; Secure";

/* comments */
const commentsUl = document.querySelector(".comments");
let commentsData = [];

class LiModel {
    constructor(id, email, name, photo, date, createdAt, comment){
        this.id = id!==""?id:commentsData.length + 1,
        this.email = email,
        this.userName = name,
        this.userPhoto = photo,
        this.date = date,
        this.createdAt = createdAt,
        this.comment = comment,
        this.like = 0,
        this.dislike = 0
    }
    makeLi(){
        const li = document.createElement("li");
        const userToken = getUserToken();
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
                <div class=${userToken === this.email?"optionTrue":""} >
                    <a href="#option" class="optionToggle" onclick="toggleOption()">● ● ●</a>
                    <ul>
                        <li>
                            <a href="#update" class="update" data-id=${this.id} onclick="onUpdate()">Update</a>
                        </li>
                        <li>
                            <a href="#delete" class="delete" data-id=${this.id} onclick="onDelete()">Delete</a>
                        </li>
                    </ul>
                </div>
            </div>
            <p id="aComment${this.id}" class="aComment">${this.comment}</p>
            <form name="updateForm" id="updateForm${this.id}" class="updateForm" onsubmit="updateFormSubmit()">
                <input type="text" name="newComment" value="${this.comment}" />
                <button type="submit">Update</button>
            </form>
            <ul class="socialBlock">
                <li>
                    <a href="#reply" class="likes">Reply</a>
                </li>
                <li class="toggleBtn">
                    <button type="button" class=${this.like>0?"activelikes":"likes"} data-id="${this.id}" onclick="commentLikeToggle('like')"></button>
                    <span class="count">${this.like}</span>
                </li>
                <li class="toggleBtn">
                    <button type="button" class=${this.dislike>0?"activedislikes":"dislikes"} data-id="${this.id}" onclick="commentLikeToggle('dislike')"></button>
                    <span class="count">${this.dislike}</span>
                </li>
            </ul>
        `;
        li.innerHTML = dom;
        commentsUl.prepend(li);
    }
}
commentsData = [
    new LiModel(1, "ltbllim@gmail.com", "Limi", "img/limPhoto.png", dateForm(), 1622908185945, "Is this your cat?! SO CUTE 🥰"),
    new LiModel(2, "adam@gmail.com", "Adam", "img/adamPhoto.png", dateForm(), 1622916314040, "I wanna pat herrrr...")
];

function dateForm(){
    const dateOption = {year:"numeric", month:"2-digit", day:"2-digit"}
    const now = new Date().toLocaleDateString("ko-KR", dateOption);
    return now.replaceAll(". ", "/").slice(0, 10);
}

createComment(commentsData);

/* create comments from data */
function createComment(data){
    commentsUl.innerHTML = null;
    data.map(el => {
        el.makeLi();
    });
}
/* toggleOption */
function toggleOption(){
    const {target} = window.event;
    target.parentNode.classList.toggle("active");
}
/* Update / Delete a comment */
function onDelete(){
    const target = window.event.target;
    const targetId = target.dataset.id;
    const confirm = window.confirm(`Do you really want to delete this post?\nCannot recover it once it's deleted!`);
    if(confirm){
        commentsData = commentsData.filter((el, index) => index !== targetId -1);
        createComment(commentsData);
        commentNum.innerText = comments.length;
    }
}
function onUpdate(){
    window.event.preventDefault();
    const target = window.event.target;
    const targetId = target.dataset.id;
    const aComment = document.getElementById(`aComment${targetId}`);
    const theForm = document.getElementById(`updateForm${targetId}`);
    const option = document.querySelector(".optionTrue");
    if(!theForm.classList.contains("active")){
        aComment.classList.add("hide");
        theForm.classList.add("active");
        option.classList.remove("active");
        window.location.hash = targetId;
    }else{
        aComment.classList.remove("hide");
        theForm.classList.remove("active");
    }
}

function updateFormSubmit(){
    const thisEvent = window.event;
    thisEvent.preventDefault();
    const {target} = thisEvent;
    const newText = target.newComment;
    if(noBadWords(newText)){
        return false;
    }else{
        let commentId = window.location.hash;
        commentId = commentId.slice(1);
        const index = commentsData.findIndex(el => el.id == commentId);
        commentsData[index].comment = newText.value;
        createComment(commentsData);
    }
}

/* create comments */
const createForm = document.forms.commentForm;
createForm.addEventListener("submit", (e)=>{
    onCreate(e);
});

/* no profanity */
function noBadWords(val){
    let filter = ["바보", "멍청이", "idiot", "stupid"];
    const text = val.value.toLowerCase();
    for(let i of filter){
        if(text.includes(i)){
           window.alert(`Please use better words for the others!`);
           return true;
        }else{
            continue;
        }
    }
}

function onCreate(e){
    e.preventDefault();
    const input = e.target.comment;
    if(noBadWords(input)){
        return false;
    }else{
        const getUsers = commentsData.map(el => el.userName);
        const lastComment = getUsers.lastIndexOf("CIZION");
        if(lastComment>0 && commentsData[lastComment].createdAt >= Date.now() - 6000){
            return window.alert(`Sorry! Cannot leave a comment in a row! \nPlease try later :)`);
        }else{
            const newComment = new LiModel("", getUserToken(), "CIZION", "img/userPhoto.png", dateForm(), Date.now(), input.value);  
            commentsData.push(newComment); 
            commentsData[commentsData.length-1].makeLi();
            input.value = "";
            commentNum.innerText = comments.length;
        }
    }
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
/* comment */
function commentLikeToggle(btn){
    const {target} = window.event;
    const targetId = target.dataset.id;
    const thisUl = target.parentNode.parentNode;
    if(!target.className.includes("active")){
        if(thisUl.children[1].children[0].className.includes("active") || thisUl.children[2].children[0].className.includes("active")){
            alert("Sorry! You can only like OR dislike this!");
        }else{
            if(btn === "like"){
                commentsData[targetId - 1].like++;
                createComment(commentsData);
            }else{
                commentsData[targetId - 1].dislike++;
                createComment(commentsData);
            }
        }
    }else{
        thisUl.classList.remove("done");
        if(btn === "like"){
            commentsData[targetId - 1].like--;
            createComment(commentsData);
        }else{
            commentsData[targetId - 1].dislike--;
            createComment(commentsData);
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
    mobileFrame.scrollTo(0, 0);
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
/* logtOut */
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
    const notLoggedIn = document.querySelector(".notLoggedIn");
    const loggedIn = document.querySelector(".loggedIn");

    if(Boolean(getUserToken())){
        logOut.style.display = "block";
        notLoggedIn.style.display = "none";
        loggedIn.style.display = "block";
    }else{
        logOut.style.display = "none";
        notLoggedIn.style.display = "block";
        loggedIn.style.display = "none";
    }
}

function getUserToken(){
    return sessionStorage.getItem("token");
}