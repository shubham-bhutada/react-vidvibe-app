import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../../firebase";
import {
  LOAD_PROFILE,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_OUT,
} from "../actionType";

export const login = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");
    const res = await signInWithPopup(auth, provider);

    const accessToken = res.user.accessToken;

    const profile = {
      name: res.user.displayName,
      photoURL: res.user.photoURL,
    };

    sessionStorage.setItem("vidVibe-access-token", accessToken);
    sessionStorage.setItem("vidVibe-user", JSON.stringify(profile));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: accessToken,
    });

    dispatch({
      type: LOAD_PROFILE,
      payload: profile,
    });
  } catch (error) {
    // Handle errors here
    console.error(error);
    dispatch({
      type: LOGIN_FAIL,
      payload: error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  await auth.signOut();
  dispatch({
    type: LOG_OUT,
  });

  sessionStorage.removeItem("vidVibe-access-token");
  sessionStorage.removeItem("vidVibe-user");
};
