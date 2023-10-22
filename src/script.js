import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

document.addEventListener("DOMContentLoaded", function() {
  const ageInput = document.getElementById("age");
  const genderInput = document.getElementById("gender");
  const hobbiesInput = document.getElementById("hobbies");
  const funWithFriendsInput = document.getElementById("funWithFriends");
  const nextButton = document.getElementById("nextButton");

  console.log('script loaded!')

  const inputs = [ageInput, genderInput, hobbiesInput, funWithFriendsInput];

  inputs.forEach(input => {
    input.addEventListener("input", checkFields);
  });

  function checkFields() {
    const allFieldsFilled = inputs.every(input => input.value.trim() !== "");
    nextButton.disabled = !allFieldsFilled;
  }

  nextButton.addEventListener("click", function() {
    const responses = {
      age: ageInput.value,
      gender: genderInput.value,
      hobbies: hobbiesInput.value,
      funWithFriends: funWithFriendsInput.value,
    };

    const responsesJSON = JSON.stringify(responses);

    localStorage.removeItem("userResponses");
    localStorage.setItem("userResponses", responsesJSON);

    console.log (responsesJSON);

    // Use the history object to navigate to the next page
    const history = useHistory();
    history.push("/about"); // Replace "/about" with your desired route

    // Note: You should remove the window.location.href line
  });

  checkFields();
});
