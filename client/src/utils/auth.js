import decode from "jwt-decode";
import { SiWindowsterminal } from "react-icons/si";

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    console.log(token);
    return token ? true : false;
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/mytrips");
  }
  signUp(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/addjointrip");
  }
  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

export default new AuthService();
