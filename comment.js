'use strict';

document.cookie = "crossCookie=bar; SameSite=None; Secure";

/* socialBlock */
//comments
const commentNum = document.querySelector('.commentNum');
const comments = document.getElementsByClassName('comment');
commentNum.innerText = comments.length;
//likes
let likeCount = 10;
const likeNum = document.querySelector('.lilketNum');
const likeBtn = document.querySelector('.likes');
likeNum.innerText = likeCount;

let dislikeCount = 0;
const dislikeNum = document.querySelector('.dislilketNum');
const dislikeBtn = document.querySelector('.dislikes');

const socialBlock = document.querySelector('.mobile > .socialBlock');

socialBlock.addEventListener("click", (e)=>{
    const {target} = e;
    if(target.nodeName === "BUTTON"){
        if(target.classList.contains("likes")){
            onClickToggle(target, likeNum, likeCount);
        }else{
            onClickToggle(target, dislikeNum, dislikeCount);
        }
    }
});

function onClickToggle(target, num, count){
    if(!Boolean(target.classList.contains("active"))){
        target.classList.add('active');
        count++; 
    }else{
        target.classList.remove('active');
        count = count;
    }
    num.innerText = count;
}

function Comment(name, comment){
    this.userName = name,
    this.userPhoto = "https://pixabay.com/get/g8dbfabb868620357fe1f237d1b393dff73154d04d84d1e4a82c3a4c65b09434c3ac8a10d0056588c36745aacd9791758_640.jpg",
    this.createdAt = new Date(),
    this.comment = comment
}