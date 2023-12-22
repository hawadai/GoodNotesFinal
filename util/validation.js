function isEmpty(value) {
  return !value || value.trim() === "";
}
function userCredintialsAreValid(email, password) {
  return email && email.includes("@") && password && password.trim().length > 7;
}

function userDetailsareValid(email, password, name, semester, faculty) {
  return (
    userCredintialsAreValid(email, password) &&
    !isEmpty(name) &&
    !isEmpty(faculty) &&
    !isEmpty(semester)
  );
}

function emailIsConfirmed(email, confirmEmail) {
  return email === confirmEmail;
}

module.exports = {
  userDetailsareValid: userDetailsareValid,
  emailIsConfirmed: emailIsConfirmed,
};
