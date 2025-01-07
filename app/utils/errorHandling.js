// utils/errorHandling.js
export const getFirebaseErrorMessage = (error) => {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "The email address is already in use by another account.";
    case "auth/invalid-email":
      return "The email address is not valid.";
    case "auth/weak-password":
      return "The password is too weak.";
    default:
      return "An unexpected error occurred.";
  }
};
