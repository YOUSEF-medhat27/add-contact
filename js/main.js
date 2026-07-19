var modal = document.createElement("div");
modal.id = "contactModal";
modal.innerHTML = `
<div id="mainmodel" class="modal-overlay">
  <div class="modal-box">

    <div class="modal-header">
      <h3>Add New Contact</h3>
     
        <i style="color: grey;" class="fa-solid fa-xmark close-btn" onclick="closeModal()"></i>
    </div>

    <div class="modal-body">

      <div class="profile">
        <div class="avatar">
          <i class="fa-solid fa-user"></i>
        </div>

      <input type="file" id="photoInput" accept="image/*" hidden>

<button id="userphoto" class="photo-btn btn" onclick="document.getElementById('photoInput').click()">
  <i class="fa-solid fa-camera"></i>
  Change Photo
</button>
        
      </div>

      <label>Full Name</label>
      <input id="username" type="text" placeholder="Enter full name">

      <label>Phone Number</label>
      <input id="userphone" type="number" placeholder="e.g., 01012345678">

      <label>Email Address</label>
      <input id="useremail" type="email" placeholder="name@example.com">

      <label>Address</label>
      <input id="useradress" type="text" placeholder="Enter address">

      <label >Group</label>
      <select id="usergroup">
        <option>Select a group</option>
        <option>Family</option>
        <option>Friends</option>
        <option>Work</option>
      </select>

      <label>Notes</label>
      <textarea id="useropinion" placeholder="Add notes about this contact"></textarea>

      <div class="checks ">
  <div class="d-flex align-items-center gap-4">
  <label class="d-flex align-items-center gap-2 m-0">
    <input id="userfav" type="checkbox" class="m-0">
    <i class="fa-regular fa-star text-warning"></i>
    <span>Favorite</span>
  </label>

  <label class="d-flex align-items-center gap-2 m-0">
    <input id="useremergency" type="checkbox" class="m-0">
    <i class="fa-solid fa-heart-pulse text-danger"></i>
    <span>Emergency</span>
  </label>
</div>
      </div>

      <div class="buttons">
        <button onclick="closeModal()">Cancel</button>
        <button class="save-btn" onclick="addusers()">
          <i class="fa-solid fa-check"></i>
          Save Contact
        </button>
      </div>

    </div>
  </div>
</div>
`;

document.body.appendChild(modal);

function openModal() {
  document.getElementById("contactModal").style.display = "block";
}

function closeModal() {
  document.getElementById("contactModal").style.display = "none";
}

var usernameinput = document.getElementById("username")
var userphoneinput = document.getElementById("userphone")
var useremailinput = document.getElementById("useremail")
var useradressinput = document.getElementById("useradress")
var usergroupinput = document.getElementById("usergroup")
var useropinioninput = document.getElementById('useropinion')
var userphotoinput = document.getElementById('photoInput')
var userfavinput = document.getElementById("userfav");
var useremergencyinput = document.getElementById("useremergency");
var favoriteCheck = document.getElementById("favoriteCheck");
var emergencyCheck = document.getElementById("emergencyCheck");

var updateMode = false;
var updateIndex = 0;



var userlist;
if(localStorage.getItem("userlist") == null){
    userlist = [];
}else{
    userlist = JSON.parse(localStorage.getItem("userlist"));
}

displayuser()
toggleEmptyMessage()
updateCounters();
displayFavorites();
displayEmergency();
function addusers() {
  var user = {
    name : usernameinput.value ,
    phone : userphoneinput.value ,
    email : useremailinput.value , 
    adress : useradressinput.value ,
    group : usergroupinput.value , 
    textarea : useropinioninput.value ,
    photo : userphotoinput.files[0]?.name ,
     favorite: userfavinput.checked,
    emergency: useremergencyinput.checked
  }
  if (user.photo ==undefined) {
    user.photo = 'avatar-1.jpg'
  }

  if(updateMode==false){

    userlist.push(user);

}else{

    userlist[updateIndex]=user;

}

    localStorage.setItem('userlist' , JSON.stringify(userlist))
    updateMode = false;
    clearform()
   
    closeModal()
    displayuser()
    toggleEmptyMessage()
    updateCounters();
    displayFavorites();
displayEmergency();
}

function clearform() {
  usernameinput.value = "" ,
  userphoneinput.value = "" ,
  useremailinput.value = "" ,
  useradressinput.value = "" ,
  usergroupinput.value = ""  ,
  useropinioninput.value = ""  ,
  userphotoinput.value = "";
  userfavinput.checked = false;
useremergencyinput.checked = false;
}
function displayuser() {
  var cartoona = ''
  for (var i = 0; i < userlist.length; i++) {
    cartoona += `
     <div class="col-6 mt-3 ">
            <div class="maincards">
              <div class="inner-cards p-3">
              <div class="top-cardsinner d-flex justify-content-start align-items-start">
                <img src="./img/${userlist[i].photo}" alt="">
                <div class="top-cardstext ms-2">
                  <h5 class="p-0 ms-2">${userlist[i].name}</h5>
               <div class="ayhaga d-flex justify-content-start align-items-center">
                   <i class="fa-solid fa-phone greencol mx-2"></i>
                  <span class="text-secondary">${userlist[i].phone}</span>
               </div>
                </div>
              </div>
             <div class="medium-cardstext mt-3 d-flex justify-content-start align-items-center">
                  <i class="fa-solid fa-envelope burcolor "></i>
                <span class="text-secondary ms-2">${userlist[i].email}</span>
             </div>
             <div class="card-location mt-3  d-flex justify-content-start align-items-center">
              <i class="fa-solid fa-location-dot greencol"></i>
              <span class="text-secondary ms-2">${userlist[i].adress}</span>
             </div>
             <div class="option-cards mt-3">
              <span class="opinion ">${userlist[i].group}</span>
             </div>
            
            </div>
             <div class="bottom-card p-3 ">
                <div class="inner-top d-flex align-items-start justify-content-between">
                  <div class="left-icons d-flex justify-content-center align-items-center">
                    <i class="fa-solid fa-phone greencol mx-2"></i>
                  <i class="fa-solid fa-envelope burcolor "></i>
                  </div>
                  <div class="right-icons ">
                   <a href=""><i class="fa-regular fa-star text-secondary me-2"></i></a>
                   <a href=""><i class="fa-regular fa-heart text-secondary  me-2"></i></a>
                   <i onclick=" Updateuser(${i})"
                   class="fa-solid fa-pen mx-1 text-secondary-emphasis"></i>
                   <i onclick="deleteUser(${i})" class="fa-solid fa-trash mx-1 text-secondary-emphasis"></i>
                  </div>
                </div>
              </div>
            </div>
           </div>
    `
  }
      document.getElementById('rowcard').innerHTML = cartoona

}
function deleteUser(i){

    userlist.splice(i,1);

    localStorage.setItem("userlist",JSON.stringify(userlist));

    displayuser();
    toggleEmptyMessage()
    updateCounters()
    displayFavorites();
displayEmergency();

}
function Updateuser(i){

   
    updateIndex = i;
    openModal();

    usernameinput.value = userlist[i].name;
    userphoneinput.value = userlist[i].phone;
    useremailinput.value = userlist[i].email;
    useradressinput.value = userlist[i].adress;
    usergroupinput.value = userlist[i].group;
    useropinioninput.value = userlist[i].textarea;
 updateMode = true;
}
function toggleEmptyMessage(){

    var emptyMessage = document.getElementById("emptyMessage");

    if(userlist.length == 0){

        emptyMessage.style.display = "block";

    }else{

        emptyMessage.style.display = "none";

    }

}
function updateCounters(){

    var favCount = 0;
    var emergencyCount = 0;

    for(var i = 0; i < userlist.length; i++){

        if(userlist[i].favorite){
            favCount++;
        }

        if(userlist[i].emergency){
            emergencyCount++;
        }

    }

    document.getElementById("totalContacts").innerHTML = userlist.length;
document.getElementById("totalContactsCard").innerHTML = userlist.length;
    document.getElementById("favoriteContacts").innerHTML = favCount;
    document.getElementById("emergencyContacts").innerHTML = emergencyCount;

}
function displayFavorites(){

    var cartoona = "";

    for(var i=0;i<userlist.length;i++){

        if(userlist[i].favorite){

            cartoona += `
            <div class="d-flex justify-content-between align-items-center bg-light rounded p-2 mb-2">

                <div class="d-flex align-items-center">

                    <img src="./img/${userlist[i].photo}"
                    width="45"
                    height="45"
                    class="rounded-3">

                    <div class="ms-2">
                        <h6 class="m-0">${userlist[i].name}</h6>
                        <small class="text-secondary">${userlist[i].phone}</small>
                    </div>

                </div>

                <i class="fa-solid fa-phone text-success"></i>

            </div>
            `;

        }

    }

    if(cartoona==""){

        cartoona = `
        <span class="text-body-tertiary fw-semibold">
        No favorites yet
        </span>
        `;

    }

    document.getElementById("favoritesContainer").innerHTML = cartoona;

}
function displayEmergency(){

    var cartoona = "";

    for(var i=0;i<userlist.length;i++){

        if(userlist[i].emergency){

            cartoona += `
            <div class="d-flex justify-content-between align-items-center bg-light rounded p-2 mb-2">

                <div class="d-flex align-items-center">

                    <img src="./img/${userlist[i].photo}"
                    width="45"
                    height="45"
                    class="rounded-3">

                    <div class="ms-2">
                        <h6 class="m-0">${userlist[i].name}</h6>
                        <small class="text-secondary">${userlist[i].phone}</small>
                    </div>

                </div>

                <i class="fa-solid fa-phone text-danger"></i>

            </div>
            `;

        }

    }

    if(cartoona==""){

        cartoona = `
        <span class="text-body-tertiary fw-semibold">
        No emergency contacts
        </span>
        `;

    }

    document.getElementById("emergencyContainer").innerHTML = cartoona;

}

function sayhello() {
 var searchtext = searchinput.value

  var cartoona = ''
        for (var i = 0; i < userlist.length; i++) {

           if (userlist[i].name.includes(searchtext)) {
            cartoona += `
     <div class="col-6 mt-3 ">
            <div class="maincards">
              <div class="inner-cards p-3">
              <div class="top-cardsinner d-flex justify-content-start align-items-start">
                <img src="./img/${userlist[i].photo}" alt="">
                <div class="top-cardstext ms-2">
                  <h5 class="p-0 ms-2">${userlist[i].name}</h5>
               <div class="ayhaga d-flex justify-content-start align-items-center">
                   <i class="fa-solid fa-phone greencol mx-2"></i>
                  <span class="text-secondary">${userlist[i].phone}</span>
               </div>
                </div>
              </div>
             <div class="medium-cardstext mt-3 d-flex justify-content-start align-items-center">
                  <i class="fa-solid fa-envelope burcolor "></i>
                <span class="text-secondary ms-2">${userlist[i].email}</span>
             </div>
             <div class="card-location mt-3  d-flex justify-content-start align-items-center">
              <i class="fa-solid fa-location-dot greencol"></i>
              <span class="text-secondary ms-2">${userlist[i].adress}</span>
             </div>
             <div class="option-cards mt-3">
              <span class="opinion ">${userlist[i].group}</span>
             </div>
            
            </div>
             <div class="bottom-card p-3 ">
                <div class="inner-top d-flex align-items-start justify-content-between">
                  <div class="left-icons d-flex justify-content-center align-items-center">
                    <i class="fa-solid fa-phone greencol mx-2"></i>
                  <i class="fa-solid fa-envelope burcolor "></i>
                  </div>
                  <div class="right-icons ">
                   <a href=""><i class="fa-regular fa-star text-secondary me-2"></i></a>
                   <a href=""><i class="fa-regular fa-heart text-secondary  me-2"></i></a>
                   <i onclick=" Updateuser(${i})"
                   class="fa-solid fa-pen mx-1 text-secondary-emphasis"></i>
                   <i onclick="deleteUser(${i})" class="fa-solid fa-trash mx-1 text-secondary-emphasis"></i>
                  </div>
                </div>
              </div>
            </div>
           </div>
    `
           }

        }

        document.getElementById("rowcard").innerHTML= cartoona
}
