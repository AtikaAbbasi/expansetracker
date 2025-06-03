import { auth,
    onAuthStateChanged
 } from "./firebaseconfig";


 onAuthStateChanged(auth, async (user) =>{

 let home = document.getElementById("home")
 let desh = document.getElementById('desh')
  let pro = document.getElementById('pro')

if(user){
       console.log(user);
home.style.display = 'none'
desh.style.display = "block"
pro.style.display = "block"





}else{

       console.log('successfully Signed Out');
      if (window.location?.pathname === '/dashboard' && window.location?.pathname === '/profile' ) {
            // console.log("user location",  window.location.pathname);
            window.location.replace('/')
        }
}

 })