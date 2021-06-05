'use strict';

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
        createdAt: 1622908185945,
        comment: "I wanna pat herrrr..."
    }
];

function dateForm(){
    const dateOption = {year:'numeric', month:'2-digit', day:'2-digit'}
    const now = new Date().toLocaleDateString('ko-KR', dateOption);
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
        const li = document.createElement('li');
        li.classList.add("comment");
        let TIME = Date.now();
        let passedTime = (TIME - this.createdAt)/1000;
        let timeView;
        if(passedTime < 60 ){
            timeView = 'now';
        }else if(Math.floor(passedTime) === 60){
            timeView = '1 minute ago'
        }else if(Math.floor(passedTime) < 60 * 60){
            timeView = `${Math.floor(passedTime / 60)} mintues ago`
        }else if(Math.floor(passedTime) === 60 * 60){
            timeView = '1 hour ago'
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
    e.preventDefault();
    const input = e.target.comment;
    const newComment = new LiModel("CIZION", "img/userPhoto.png", dateForm(), Date.now(), input.value);  
    commentsData.push(newComment); 
    commentsData[commentsData.length-1].makeLi();
    input.value = "";
    commentNum.innerText = comments.length;
});
/* delete comments */
function toggleOption(){
    const {target} = window.event;
    target.parentNode.classList.toggle('active');
}

/* comments counter */
const commentNum = document.querySelector('.commentNum');
const comments = document.getElementsByClassName('comment');
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
                target.classList.add('active');
                count++;
                ulBlock.classList.add('done');
            }
        }else{
            target.classList.remove('active');
            count--;
            ulBlock.classList.remove('done');
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



