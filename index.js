function showSpecial(){
    var specialview = document.getElementById("special-nav");
    if(specialview.style.visibility == "visible"){
        specialview.style.visibility = "hidden";
    }else{
        specialview.style.visibility = "visible";
    }
}

var count = 0;

function alignHeaders(){
    var headers = document.getElementsByClassName('align');
    count= count+1;
    if(count%3 == 1){
        for (var i = 0; i<headers.length; i++){
            headers[i].style.textAlign = "center";
        }
    } else if(count%3 == 2){
        for (var i = 0; i<headers.length; i++){
            headers[i].style.textAlign = "right";
        }
    } else if(count%3 == 0){
        for (var i = 0; i<headers.length; i++){
            headers[i].style.textAlign = "left";
        }
    }
    console.log(count);
}

var hobbylist = document.getElementById("hobby-list");

function addNewHobby(){
    var hobby = prompt("Enter a new hobby!:");

    if(hobby != null){
        var newhobby = document.createElement('li');
        newhobby.appendChild(document.createTextNode(hobby));
        hobbylist.appendChild(newhobby);
    }
}

var progress = document.getElementById("progress");

function showProgress(){

    if(progress.style.visibility == "visible"){
        progress.style.visibility = "hidden";
    }else{
        progress.style.visibility = "visible";
    }

}

function updateProgressBar(){
        total = document.body.clientHeight-window.innerHeight;
        var scrollprogress = (window.scrollY/total)*100;
        document.getElementsByClassName("progress-bar")[0].style.width = scrollprogress + "%";
}

window.onscroll = function() {updateProgressBar()};

function processform(){
    
    //Create a new element to contain the comment. 
    let newComment = document.createElement("div");
    let element = '<div><svg height="100"; width="100"><circle cx="50" cy="50" r="40"></svg></div><div><h5></h5><p></p></div>';
    newComment.innerHTML = element;
    
    //Set the classes of the divs and inner divs.
    newComment.className = "d-flex";
    newComment.querySelectorAll("div")[0].className = "flex-shrink-0"; //first div
    newComment.querySelectorAll("div")[1].className = "flex-grow-1"; //second div
    
    //Increment the comment id.
    let lastComment = document.querySelector("#comments").lastElementChild;
    newComment.id = 'c' + (Number(lastComment.id.substring(1))+1);
    
    // Apply the contents of the comment to the form afterwards.
    newComment.querySelector("h5").innerHTML = document.querySelector("#new-email").value;
    newComment.querySelector("p").innerHTML = document.querySelector("#new-comment").value;
    
    //Get the color choice from the raido selector.
    let color = document.querySelectorAll("input[name=new-color]:checked")[0].value;
    
    //Change the color to fill the SVG circle with.
    newComment.querySelector("circle").setAttribute("fill", color);
    
    //Append the new comment to the div #comments
    document.querySelector("#comments").appendChild(newComment);
    
    //Reset form and clear the contents of the page.
    document.querySelector("form").reset();
    }

function validateEmail(newemail) {

    var regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(newemail);

  }


function allowEmail(){
    const mailcheck = document.getElementById("new-email").value;
    const textcheck = document.getElementById("new-comment").value;
    //console.log(mailcheck);
    console.log(textcheck);

    if(validateEmail(mailcheck) == false){
        document.getElementById("new-email").classList.add("is-invalid");
        if(textcheck !=''){
            document.getElementById("new-comment").classList.remove("is-invalid");
        }
        //console.log("invalid email!");
        return;

    } else if(validateEmail(mailcheck) == true && textcheck !=''){
        document.getElementById("new-email").classList.remove("is-invalid");
        document.getElementById("new-comment").classList.remove("is-invalid");
        //console.log("Valid email!");
        processform();
        savecomment();
    } else if(textcheck == ""){
        document.getElementById("new-comment").classList.add("is-invalid");
        if(validateEmail(mailcheck) == true){
            document.getElementById("new-email").classList.remove("is-invalid");
        }
        console.log("empty comment!");
        return;
    }
}

function savecomment(){

    var commentsec = document.getElementById("comments").innerHTML;
    
    fetch('comments.txt', {
    method: 'PUT',
    body: commentsec
    });

}
    
function loadfile(){

    fetch('comments.txt')
    .then(response => response.text())
    .then(text => document.getElementById("comments").innerHTML = text);

}

document.addEventListener("DOMContentLoaded", function() {
    loadfile();
  });