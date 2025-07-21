import { rootStore } from "../store";

export default function authHeader() {
  const {
    profileStore: { currentUserToken },
  } = rootStore;

  if (currentUserToken) {
    return { Authorization: "Bearer " + currentUserToken }; // for Spring Boot back-end
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return { Authorization: "" }; // for Spring Boot back-end
    // return { 'x-access-token': null }; // for Node Express back-end
  }
}
