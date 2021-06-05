'use strict';

/* socialBlock */
//comments
const commentNum = document.querySelector('.commentNum');
const comments = document.getElementsByClassName('comment');
commentNum.innerText = comments.length;
//likes
let likeCount = 11;
const likeNum = document.querySelector('.lilketNum');
const likeBtn = document.querySelector('.likes');
likeNum.innerText = likeCount;

let dislikeCount = 0;
const dislikeNum = document.querySelector('.dislilketNum');
const dislikeBtn = document.querySelector('.dislikes');

likeBtn.addEventListener("click", onClickLike);
dislikeBtn.addEventListener("click", onClickDislike);

function onClickLike(){
    console.log(this.className)
    if(!Boolean(this.className.includes("active"))){
        this.classList.add('active');
        likeCount++;
    }else{
        this.classList.remove('active');
        likeCount--;
    }
    likeNum.innerText = likeCount;
}
function onClickDislike(){
    if(!Boolean(this.className.includes("active"))){
        this.classList.add('active');
        dislikeCount++;
    }else{
        this.classList.remove('active');
        dislikeCount--;
    }
    dislikeNum.innerText = dislikeCount;
}

function Comment(name, photo, comment){
    this.userName = name,
    this.userPhoto = "https://pixabay.com/get/g8dbfabb868620357fe1f237d1b393dff73154d04d84d1e4a82c3a4c65b09434c3ac8a10d0056588c36745aacd9791758_640.jpg",
    this.createdAt = new Date(),
    this.comment = comment
}