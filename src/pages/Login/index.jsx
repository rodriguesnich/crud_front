import React from "react";
import { authInstance, authMethod } from "../../api/api";
import Cookies from "universal-cookie";

import "./styles.css";

export default function Login({setUser, setLoggedIn}) {

  function SignIn() {
    const signInWithGoogle = () => {
      // const provider = new auth.signInWithPopup(provider);
      // auth.signInWithPopup(provider);

      var provider = new authInstance.GoogleAuthProvider();

      authMethod
        .signInWithPopup(provider)
        .then((result) => {
          // /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          console.log(user);
          setUser(user)
          setLoggedIn(true)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    };

    return (
      <>
        <button className="sign-in" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </>
    );
  }

  return (
    <div className="fullHeight">
      <div className="card container bg-dark ">
        <div className="card-body">
          <h3 className="text-light">Log In</h3>
          <SignIn />
          {/* <form>
            <div class="mb-3">
              <label className="form-label">
                Email:
                <input type="text" name="name" className="form-control" />
              </label>
            </div>
            <div class="mb-3">
              <label className="form-label">
                Senha:
                <input type="password" name="name" className="form-control" />
              </label>
            </div>
            <button type="submit" className="btn btn-primary">Log In</button>
          </form> */}
        </div>
      </div>
    </div>
  );
}
