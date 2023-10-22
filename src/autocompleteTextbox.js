import React, { useState, useRef, useEffect } from 'react';
//import OpenAI from 'openai';

function AutocompleteTextbox() {
  const [inputValue, setInputValue] = useState('');
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const suggestionsRef = useRef([]); // Use useRef for suggestions
  const [displaySuggestions, setDisplaySuggestions] = useState(false); // Track whether to display suggestions
  const inputRef = useRef(null);
  const timeoutIdRef = useRef(null);
  const [wordCount, setWordCount] = useState(0);

  //const openai = new openAI();

  const countWords = (input) => {
    const words = input.split(' ').filter((word) => word !== ''); // Split the input by spaces and remove empty strings
    setWordCount(words.length);
  };
  
  const queryGPT2 = async (input) => {
    // Simulate an API call to ChatGPT
    // You can replace this with an actual API call to ChatGPT
    return ["I am so", "feeling great", "really happy"]; // Dummy suggestions
  };

  const queryGPT = async (input) => {

    // Replace with your actual ChatGPT API call
    const userAnswers = JSON.parse(localStorage.getItem("userResponses"))
    console.log(userAnswers)
//{"age":"12","gender":"123","hobbies":"sdf","funWithFriends":"dsf"}
    const age = userAnswers["age"]
    const gender = userAnswers["gender"]
    const hobbies = userAnswers["hobbies"]
    const funWithFriends = userAnswers["funWithFriends"]
    console.log(age)
    console.log(gender)
    console.log(hobbies)
    console.log(funWithFriends)


    //const prompt = "Imagine you are an autocomplete feature tailored to provide suggestions with extraverted connotations. Your goal is to assist the user in completing their sentences by offering contextually relevant endings that highlight their openness to experience in a social and outgoing manner. As you generate suggestions, lean towards choices that emphasize interactions, social events, group activities, and enthusiastic participation. Encourage the user to express their extroverted qualities and engage in experiences that involve others. An autocomplete feature finishes the sentece without suggesting what came before, so ONLY FINISH THE SENTENCE, without repeating the part I am about to tell you. How would you COMPLETE the following sentence? (DO NOT REPEAT THE BEGINNING)"
    //const prompt = `Imagine you are an autocomplete feature tailored to provide suggestions with extraverted connotations. Your goal is to assist the user in completing their sentences by offering contextually relevant endings that highlight their openness to experience in a social and outgoing manner. Suggest activities that are relevant to someone whose is ${gender}, ${age}, whose hobbies include ${hobbies}, and who describes themseves as enjoying doing ${funWithFriends} with their friends.  As you generate suggestions, lean towards choices that emphasize interactions, social events, group activities, and enthusiastic participation. Encourage the user to express their extroverted qualities and engage in experiences that involve others. An autocomplete feature finishes the sentece without suggesting what came before, so ONLY FINISH THE SENTENCE, without repeating the part I am about to tell you. How would you COMPLETE the following sentence? (DO NOT REPEAT THE BEGINNING)`
    const prompt = `Imagine you are an autocomplete feature tailored to provide suggestions with extraverted connotations. Your goal is to assist the user in completing their sentences by offering contextually relevant endings that highlight their openness to experience in a social and outgoing manner. Suggest activities that are relevant to someone whose is ${gender}, ${age}, whose hobbies include ${hobbies}, and who describes themseves as enjoying doing ${funWithFriends} with their friends.  As you generate suggestions, lean towards choices that emphasize interactions, social events, group activities, and enthusiastic participation, with activites circling around ${hobbies} and ${funWithFriends}. Encourage the user to express their extroverted qualities like what they normally enjoy doing with their friends (${funWithFriends}), and encourage them to engage in the extraverted parts of their hobbies (${hobbies}). 

    As an autocomplete feature, you must finish the sentence that I begin. Do not suggest what came before, so when I send you the input, you must ONLY FINISH THE SENTENCE, without repitition. How would you COMPLETE the following sentence? (DO NOT REPEAT THE BEGINNING)`    
    const apiKey = process.env.REACT_APP_GPT_KEY;
    //const apiKey = Netlify.env.get("REACT_APP_GPT_KEY")
    console.log(apiKey)
    const endpoint = 'https://api.openai.com/v1/chat/completions';

    console.log(prompt)
    console.log(input)

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [{ role: "system", content: prompt + input}],
        //prompt: prompt + input,
        max_tokens: 20, // Adjust the number of tokens as needed
        model: 'gpt-3.5-turbo',
      }),
    });

    const data = await response.json();
    console.log(data)
    console.log(data.choices[0].message.content)
    return [data.choices[0].message.content];
    //return data.choices[0].text.map((choice) => choice.text);
  };

  const fetchSuggestions = async (input) => {
    const newSuggestions = await queryGPT(input);
    suggestionsRef.current = newSuggestions; // Update the suggestions with the new values
    setDisplaySuggestions(true); // Display suggestions after fetching
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    suggestionsRef.current = []; // Clear suggestions on every keystroke
    setDisplaySuggestions(false); // Hide suggestions on input change
    countWords(newValue);
    
    clearTimeout(timeoutIdRef.current);
    if (newValue.endsWith(" ")) {
      timeoutIdRef.current = setTimeout(() => {
        fetchSuggestions(newValue);
      }, 3000); // 3000 milliseconds = 3 seconds
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault(); // Prevent the default Tab behavior
  
      if (displaySuggestions && suggestionsRef.current.length > 0) {
        const suggestionSentence = suggestionsRef.current[0];
        const words = suggestionSentence.split(' ');
  
        if (words.length > 0) {
          const selectedWord = words[0];
          const updatedValue = inputValue.trimEnd() + ' ' + selectedWord + ' ';
          setInputValue(updatedValue);
  
          // Remove only the first word from the suggestions
          const remainingWords = words.slice(1);
          const remainingSentence = remainingWords.join(' ');
          const remainingSuggestions = [...suggestionsRef.current];
          remainingSuggestions[0] = remainingSentence;
          suggestionsRef.current = remainingSuggestions;
  
          if (remainingWords.length === 0) {
            setDisplaySuggestions(false); // Hide suggestions when no words are left
          }
        }
      }
    }
  };
  
  
  
  const handleKeyDown2 = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault(); // Prevent the default Tab behavior

      if (displaySuggestions && suggestionsRef.current.length > 0) {
        const selectedWord = suggestionsRef.current[0].split(' ')[0];
        const updatedValue = inputValue.trimEnd() + ' ' + selectedWord + ' ';
        setInputValue(updatedValue);

        const remainingSuggestions = suggestionsRef.current.slice(1);
        suggestionsRef.current = remainingSuggestions;

        if (remainingSuggestions.length === 0) {
          setDisplaySuggestions(false); // Hide suggestions when no suggestions are left
        }
      } else {
        // If there are no suggestions left, continue with default Tab behavior
        inputRef.current.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
      }
    }
  };

  useEffect(() => {
    return () => clearTimeout(timeoutIdRef.current);
  }, []);

  useEffect(() => {
    if (!inputValue.endsWith(" ")) {
      setDisplaySuggestions(false);
    }
  }, [inputValue]);

  return (
    //<div>
      <div className="input-container">
        <textarea
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} /* Attach the handleKeyDown function */
        />
        <div className="word-count">Word Count: {wordCount}</div>
        {displaySuggestions && suggestionsRef.current.length > 0 && (
          <div className="autocomplete-suggestion">
            {suggestionsRef.current.map((suggestion, index) => (
              <div key={index}>{suggestion}</div>
            ))}
          </div>
        )}
      </div>
    //</div>
  );
}

export default AutocompleteTextbox;
