// import React from 'react'
// import { Link } from 'react-router-dom'

// const Sign = () => {
//   return (
//    <>
//    <form class="max-w-sm mx-auto">
//         <h1 className='login'>Sigin</h1>
//   <div class="mb-5">
//     <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
//     <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
//   </div>
//   <div class="mb-5">
//     <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
//     <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
//   </div>
// <p>Already have an account <Link to='/log' className='text-blue-800'>login</Link></p>
// <br />
//   <button type="submit" class="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">Submit</button>
// </form>

//    </>
//   )
// }

// export default Sign




//////////////////////////////


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { auth ,
//    createUserWithEmailAndPassword
//    } from '../firebase/firebaseconfig.js';


// const Sign = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');


//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       alert('user created successfully')
//       setEmail('');
//       setPassword('');
//        window.location.pathname = '/dashboard'
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSignup} className="max-w-sm mx-auto">
//         <h1 className="login text-xl font-bold text-center mb-4">Sign In</h1>

//         {/* {msg && <p className="text-red-600 mb-2">{msg}</p>} */}

//         <div className="mb-5">
//           <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
//             placeholder="name@example.com"
//             required
//           />
//         </div>

//         <div className="mb-5">
//           <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
//             required
//           />
//         </div>

//         <p>Already have an account <Link to='/log' className='text-blue-800'>login</Link></p>
//         <br />

//         <button
//           type="submit"
//           className="text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
//         >
//           Submit
//         </button>
//       </form>
//     </>
//   );
// };

// export default Sign;






// //////////////////////////////////////////






import { Link } from 'react-router-dom';
import { auth, db,
   createUserWithEmailAndPassword ,
   doc, setDoc  }
    from '../firebase/firebaseconfig.js';
import { useState } from 'react';


const Sign = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);

  const handleImageUpload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "todoapp"); 
    data.append("cloud_name", "dgubeimpp"); 

    const res = await fetch("https://api.cloudinary.com/v1_1/dgubeimpp/image/upload", {
      method: "POST",
      body: data
    });

    const resImg = await res.json();
    return resImg.secure_url; 
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let imageUrl = "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg";
      if (image) {
        imageUrl = await handleImageUpload(image);
      }

      // Save profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        profileImage: imageUrl,
        createdAt: new Date()
      });

      alert("User created successfully!");
      setName('');
      setEmail('');
      setPassword('');
      setImage(null);
      window.location.pathname = '/profile';

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSignup} className="max-w-sm mx-auto">
      <h1 className="login text-xl font-bold text-center mb-4">Sign Up</h1>

      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder="Your Name"
          required
        />
      </div>

      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder="name@example.com"
          required
        />
      </div>

      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          required
        />
      </div>

      <div className="mb-5">
        <label htmlFor="profileImage" className="block mb-2 text-sm font-medium text-gray-900">Profile Image</label>
        <input
          type="file"
          id="profileImage"
          onChange={(e) => setImage(e.target.files[0])}
          className="block w-full text-sm text-gray-900"
          accept="image/*"
          required
        />
      </div>

      <p>Already have an account? <Link to='/log' className='text-blue-800'>Login</Link></p>
      <br />

      <button
        type="submit"
        className="text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
      >
        Submit
      </button>
    </form>
  );
};

export default Sign;