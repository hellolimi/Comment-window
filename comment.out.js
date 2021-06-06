"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

document.cookie = "crossCookie=bar; SameSite=None; Secure";

/* comments */
var commentsUl = document.querySelector(".comments");
var commentsData = [];

var LiModel = function () {
    function LiModel(id, email, name, photo, date, createdAt, comment) {
        _classCallCheck(this, LiModel);

        this.id = id !== "" ? id : commentsData.length + 1, this.email = email, this.userName = name, this.userPhoto = photo, this.date = date, this.createdAt = createdAt, this.comment = comment, this.like = 0, this.dislike = 0;
    }

    _createClass(LiModel, [{
        key: "makeLi",
        value: function makeLi() {
            var li = document.createElement("li");
            var userToken = getUserToken();
            li.classList.add("comment");
            var TIME = Date.now();
            var passedTime = (TIME - this.createdAt) / 1000;
            var timeView = void 0;
            if (passedTime < 60) {
                timeView = "now";
            } else if (Math.floor(passedTime) === 60) {
                timeView = "1 minute ago";
            } else if (Math.floor(passedTime) < 60 * 60) {
                timeView = Math.floor(passedTime / 60) + " mintues ago";
            } else if (Math.floor(passedTime) === 60 * 60) {
                timeView = "1 hour ago";
            } else if (Math.floor(passedTime) < 24 * 60 * 60) {
                timeView = Math.floor(passedTime / 60 / 60) + " hours ago";
            } else {
                timeView = this.date;
            }
            var dom = "\n            <div class=\"profile\">\n                <img class=\"userPic\" src=\"" + this.userPhoto + "\" alt=\"\uC0AC\uC6A9\uC790 \uD504\uB85C\uD544 \uC774\uBBF8\uC9C0\" />\n                <span class=\"userName\">" + this.userName + "</span>\n                <span class=\"createdAt\">" + timeView + "</span>\n                <div class=" + (userToken === this.email ? "optionTrue" : "") + " >\n                    <a href=\"#option\" class=\"optionToggle\" onclick=\"toggleOption()\">\u25CF \u25CF \u25CF</a>\n                    <ul>\n                        <li>\n                            <a href=\"#update\" class=\"update\" data-id=" + this.id + " onclick=\"onUpdate()\">Update</a>\n                        </li>\n                        <li>\n                            <a href=\"#delete\" class=\"delete\" data-id=" + this.id + " onclick=\"onDelete()\">Delete</a>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n            <p id=\"aComment" + this.id + "\" class=\"aComment\">" + this.comment + "</p>\n            <form name=\"updateForm\" id=\"updateForm" + this.id + "\" class=\"updateForm\" onsubmit=\"updateFormSubmit()\">\n                <input type=\"text\" name=\"newComment\" value=\"" + this.comment + "\" />\n                <button type=\"submit\">Update</button>\n            </form>\n            <ul class=\"socialBlock\">\n                <li class=\"toggleBtn\">\n                    <button type=\"button\" class=" + (this.like > 0 ? "activelikes" : "likes") + " data-id=\"" + this.id + "\" onclick=\"commentLikeToggle('like')\"></button>\n                    <span class=\"count\">" + this.like + "</span>\n                </li>\n                <li class=\"toggleBtn\">\n                    <button type=\"button\" class=" + (this.dislike > 0 ? "activedislikes" : "dislikes") + " data-id=\"" + this.id + "\" onclick=\"commentLikeToggle('dislike')\"></button>\n                    <span class=\"count\">" + this.dislike + "</span>\n                </li>\n            </ul>\n        ";
            li.innerHTML = dom;
            commentsUl.prepend(li);
        }
    }]);

    return LiModel;
}();

commentsData = [new LiModel(1, "ltbllim@gmail.com", "Limi", "img/limPhoto.png", dateForm(), 1622908185945, "Is this your cat?! SO CUTE 🥰"), new LiModel(2, "adam@gmail.com", "Adam", "img/adamPhoto.png", dateForm(), 1622976200441, "I wanna pat herrrr...")];

function dateForm() {
    var dateOption = { year: "numeric", month: "2-digit", day: "2-digit" };
    var now = new Date().toLocaleDateString("ko-KR", dateOption);
    return now.replaceAll(". ", "/").slice(0, 10);
}

createComment(commentsData);

function createComment(data) {
    commentsUl.innerHTML = null;
    data.map(function (el) {
        el.makeLi();
    });
}

/* toggleOption / Update & Delete */
function toggleOption() {
    var target = window.event.target;

    target.parentNode.classList.toggle("active");
}

function onDelete() {
    var target = window.event.target;
    var targetId = target.dataset.id;
    var confirm = window.confirm("Do you really want to delete this post?\nCannot recover it once it's deleted!");
    if (confirm) {
        commentsData = commentsData.filter(function (el, index) {
            return index !== targetId - 1;
        });
        createComment(commentsData);
        commentNum.innerText = comments.length;
    }
}

function onUpdate() {
    window.event.preventDefault();
    var target = window.event.target;
    var targetId = target.dataset.id;
    var aComment = document.getElementById("aComment" + targetId);
    var theForm = document.getElementById("updateForm" + targetId);
    var option = document.querySelector(".optionTrue");
    if (!theForm.classList.contains("active")) {
        aComment.classList.add("hide");
        theForm.classList.add("active");
        option.classList.remove("active");
        window.location.hash = targetId;
    } else {
        aComment.classList.remove("hide");
        theForm.classList.remove("active");
    }
}

function updateFormSubmit() {
    var thisEvent = window.event;
    thisEvent.preventDefault();
    var target = thisEvent.target;

    var newText = target.newComment;
    if (noBadWords(newText)) {
        return false;
    } else {
        var commentId = window.location.hash;
        commentId = commentId.slice(1);
        var index = commentsData.findIndex(function (el) {
            return el.id == commentId;
        });
        commentsData[index].comment = newText.value;
        createComment(commentsData);
    }
}

/* onsubmit comment */
var createForm = document.forms.commentForm;
createForm.addEventListener("submit", function (e) {
    onCreate(e);
});

/* no profanity */
function noBadWords(val) {
    var filter = ["바보", "멍청이", "idiot", "stupid"];
    var text = val.value.toLowerCase();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = filter[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var i = _step.value;

            if (text.includes(i)) {
                window.alert("Please use better words for the others!");
                return true;
            } else {
                continue;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

function onCreate(e) {
    e.preventDefault();
    var input = e.target.comment;
    if (noBadWords(input)) {
        return false;
    } else {
        var getUsers = commentsData.map(function (el) {
            return el.userName;
        });
        var lastComment = getUsers.lastIndexOf("CIZION");
        if (lastComment > 0 && commentsData[lastComment].createdAt >= Date.now() - 10000) {
            return window.alert("Sorry! Cannot leave a comment in a row! \nPlease try later :)");
        } else {
            var newComment = new LiModel("", getUserToken(), "CIZION", "img/userPhoto.png", dateForm(), Date.now(), input.value);
            commentsData.push(newComment);
            commentsData[commentsData.length - 1].makeLi();
            input.value = "";
            commentNum.innerText = comments.length;
        }
    }
}

/* comments counter */
var commentNum = document.querySelector(".commentNum");
var comments = document.getElementsByClassName("comment");
commentNum.innerText = comments.length;

/* post - socialBlock (likes/dislikes) */
function setClickEvent() {
    var target = window.event.target;


    function onClickToggle() {
        var parent = target.parentNode;
        var num = parent.childNodes[3];
        var ulBlock = parent.parentNode;
        var count = Number(num.textContent);
        if (!target.classList.contains("active")) {
            if (ulBlock.classList.contains("done")) {
                alert("Sorry! You can only like OR dislike this!");
            } else {
                target.classList.add("active");
                count++;
                ulBlock.classList.add("done");
            }
        } else {
            target.classList.remove("active");
            count--;
            ulBlock.classList.remove("done");
        }
        num.innerText = count;
    }

    if (target.nodeName === "BUTTON") {
        if (target.classList.contains("likes")) {
            onClickToggle();
        } else {
            onClickToggle();
        }
    }
}
/* comment - socialBlock (likes/dislikes) */
function commentLikeToggle(btn) {
    var target = window.event.target;

    var targetId = target.dataset.id;
    var thisUl = target.parentNode.parentNode;
    if (!target.className.includes("active")) {
        if (thisUl.children[0].children[0].className.includes("active") || thisUl.children[1].children[0].className.includes("active")) {
            alert("Sorry! You can only like OR dislike this!");
        } else {
            if (btn === "like") {
                commentsData[targetId - 1].like++;
                createComment(commentsData);
            } else {
                commentsData[targetId - 1].dislike++;
                createComment(commentsData);
            }
        }
    } else {
        thisUl.classList.remove("done");
        if (btn === "like") {
            commentsData[targetId - 1].like--;
            createComment(commentsData);
        } else {
            commentsData[targetId - 1].dislike--;
            createComment(commentsData);
        }
    }
}

/* log in */
var notLoggedIn = document.querySelector(".notLoggedIn");
var getInBtn = document.getElementById("LogIn");
var socialLogin = document.querySelector(".socialLogin");
var mobileFrame = document.querySelector(".mobile");
var snsBtn = document.querySelectorAll(".snsBtn");
var loginBox = document.querySelector(".loginBox");
var snsBox = document.querySelector(".snsBox");
/* socialLogin activation */
notLoggedIn.addEventListener("click", function (e) {
    mobileFrame.scrollTo(0, 0);
    var target = e.target;

    if (target.classList.contains("socialLogin")) {
        socialLogin.classList.remove("active");
        mobileFrame.style.overflowY = "visible";
    } else {
        socialLogin.classList.add("active");
        mobileFrame.style.overflowY = "hidden";
    }
});
snsBtn.forEach(function (el) {
    el.addEventListener("click", function (e) {
        e.preventDefault();
        var target = e.target;

        setParam(target);
        setTitle();
        snsBox.classList.add("done");
        loginBox.classList.add("active");
    });
});
function setParam(target) {
    var query = target.getAttribute("href");
    if (target.nodeName === "SPAN") {
        query = target.parentNode.getAttribute("href");
    }
    window.location.hash = query;
}
function setTitle() {
    var queryString = window.location.hash;
    queryString = queryString.slice(1);
    var thisSNS = document.querySelector(".thisSNS");
    thisSNS.innerText = "Sign In with " + queryString;
}

/* logInForm */
var closeBtn = document.getElementById("closeBox");
closeBtn.addEventListener("click", function (e) {
    e.preventDefault();
    snsBox.classList.remove("done");
    loginBox.classList.remove("active");
});

var thisForm = document.forms.socialLoginForm;
thisForm.addEventListener("submit", function () {
    onSingIn();
});

function onSingIn() {
    var email = thisForm.email,
        password = thisForm.password;

    if (email !== "") {
        if (password !== "") {
            var token = email.value;
            sessionStorage.setItem("token", token);
            window.location.reload();
        } else {
            alert('Please enter your password!');
        }
    } else {
        alert('Please enter your email address!');
    }
    mobileFrame.style.overflowY = "visible";
}
/* logtOut */
var logOut = document.getElementById("logOut");
logOut.addEventListener("click", function () {
    var confirm = window.confirm("Do you really want to leave?");
    if (confirm) {
        sessionStorage.removeItem("token");
        window.location.reload();
        verifyLogin();
    }
});

verifyLogin();

function verifyLogin() {
    var notLoggedIn = document.querySelector(".notLoggedIn");
    var loggedIn = document.querySelector(".loggedIn");

    if (Boolean(getUserToken())) {
        logOut.style.display = "block";
        notLoggedIn.style.display = "none";
        loggedIn.style.display = "block";
    } else {
        logOut.style.display = "none";
        notLoggedIn.style.display = "block";
        loggedIn.style.display = "none";
    }
}

function getUserToken() {
    return sessionStorage.getItem("token");
}
