import React from 'react'
import { Link } from 'react-router-dom'
import  {auth,
GoogleAuthProvider,
signOut,
signInWithPopup,

}from '../firebase/firebaseconfig'

const Home = () => {


// contnue with google


  const continuewithgoogle =  async() =>{

  let provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: "select_account" });//select account firebase

    try {
        await signOut(auth);  
        console.log("User logged out before signIn attempt.");

        const result = await signInWithPopup(auth, provider); //again sign In with google 
        console.log("User logged in: ", result.user);
    } catch (error) {
        console.error("Google log-in Error:", error);
    }


  }

  

  

  return (
   <>
    <div className="min-h-screen bg-gray-100 p-4 md:p-10 mt-25 flex flex-col items-center">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md text-center">

<button type="button" class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"><Link to='/log'>Log-In</Link></button>
<br />
     


     <button type="button" class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"><Link to='/sign'>Sign-Up</Link></button>
    <br />
     <button type="button" onClick={continuewithgoogle}  
     class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Continue with Google</button>
      </div>
    </div>
   </>
  )
}

export default Home