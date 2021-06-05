'use strict';

document.cookie = "crossCookie=bar; SameSite=None; Secure";

/*socialBlock */
//total comments
const commentNum = document.querySelector('.commentNum');
const comments = document.getElementsByClassName('comment');
commentNum.innerText = comments.length;
/* likes/dislikes */
const socialBlock = document.querySelectorAll('.socialBlock');
socialBlock.forEach(el => el.addEventListener("click", (e)=>{
    const {target} = e;
    if(target.nodeName === "BUTTON"){
        if(target.classList.contains("likes")){
            onClickToggle(target);
        }else{
            onClickToggle(target);
        }
    }
}));

function onClickToggle(target){
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

function Comment(name, comment){
    this.userName = name,
    this.userPhoto = "https://pixabay.com/get/g8dbfabb868620357fe1f237d1b393dff73154d04d84d1e4a82c3a4c65b09434c3ac8a10d0056588c36745aacd9791758_640.jpg",
    this.createdAt = new Date(),
    this.comment = comment
}