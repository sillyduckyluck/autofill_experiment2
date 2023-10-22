import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Questionnaire = () => {
  const navigate = useNavigate();
  useEffect(() => {
    
    const ageInput = document.getElementById("age");
    const genderInput = document.getElementById("gender");
    const hobbiesInput = document.getElementById("hobbies");
    const funWithFriendsInput = document.getElementById("funWithFriends");
    const nextButton = document.getElementById("nextButton");

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
      navigate("/about"); // Replace "/about" with your desired route
  
      // Note: You should remove the window.location.href line
    });


  }, []);

  return (
    <div>
      <img src="uni_logo_eng.png" alt="Description of the image" />
      <h1>Questionnaire</h1>
      <div>
        <label htmlFor="age">What is your age? </label>
        <input type="text" id="age" required />
      </div>
      <div>
        <label htmlFor="gender">What is your gender? </label>
        <input type="text" id="gender" required />
      </div>
      <div>
        <label htmlFor="hobbies">What are your hobbies (enter 3)? </label>
        <textarea id="hobbies" required></textarea>
      </div>
      <div>
        <label htmlFor="funWithFriends">What do you like to do for fun with friends? </label>
        <textarea id="funWithFriends" required></textarea>
      </div>
    
      <button id="nextButton" disabled>Next</button>
      <script src="script.js"></script>
    </div>
  );
};

export default Questionnaire;
