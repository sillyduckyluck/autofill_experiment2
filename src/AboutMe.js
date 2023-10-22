import React from 'react';
//import './autocompleteTextbox.js'
import AutocompleteTextbox from './autocompleteTextbox.js';
import './styles.css'

const AboutMe = () => (
  <div>
    <>
    <img src="uni_logo_eng.png" alt="Description of the image" />
    <div className="container">
      <div className="prompt">
        <h2>Question:</h2>
        <p>Previous studies show that students prefer people with high levels of openness to experience as their roommates.</p>
        <p>This is because open people are interested in new things, they are motivated to learn about new ideas and acquire new knowledge,
          which means that living with them never gets boring. Further, research has found that people with high openness to experience are
          often very intelligent and creative, which makes them good study buddies. </p>
        <p>
          We want to test whether students really prefer open people as their roommates. For the purpose of this study, we, therefore, ask you
          to portray yourself a person who is very open to experience. Start by writing a few things about yourself, like your age, your hometown,
          and what you want to major in. Continue your text by answering the following questions: </p>
        <p>(a) how would you describe your friendships and what do you like to do with friends for fun?</p>
        <p>(b) what types of activities do you enjoy doing with family members?</p>
        <p>(c) what extracurricular activities are you involved in?</p>
        <p>(d) what is the most important thing you learned in high school?</p>
        <p>Think of experiences in both your past and present that are consistent with being open to experience and rely on those examples when answering the questions.</p>
        <p>Please now write about 200 words about yourself as an open person.</p>
      </div>
      <div className="response">
        <h2>Your Answer:</h2>
        <AutocompleteTextbox>
          
        </AutocompleteTextbox>
      </div>
    </div>

    </>
  </div>
);

export default AboutMe;

