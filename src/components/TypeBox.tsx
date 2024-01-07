import React, { useMemo, useRef, useState } from 'react'

export default function TypeBox() {
  const [wordsDict, setWordsDict] = useState([
    {
      original: 'sample',
      val: 'sample'
    },
    {
      original: 'test',
      val: 'test'
    }
  ]);

  const words = useMemo(() => {
    return wordsDict.map((e) => e.val);
  }, [wordsDict]);

  const wordSpanRefs = useMemo(
    () =>
      Array(words.length)
        .fill(0)
        .map((i) => ({error: false, ref: React.createRef()})),
    [words]
  );

  const inputRef = useRef(null)
  const [currInput, setCurrInput] = useState("");

  
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(-1);
  
  const [history, setHistory] = useState({});
  const keyString = `${currWordIndex}.${currCharIndex}`;

  const [currChar, setCurrChar] = useState("");

  const [wordsCorrect, setWordsCorrect] = useState(new Set());
  const [inputWordsHistory, setInputWordsHistory] = useState({});


  const updateInput = (e) => {
    setCurrInput(e.target.value);

    inputWordsHistory[currWordIndex] = e.target.value.trim();
    setInputWordsHistory(inputWordsHistory);
  };

  const handleKeyDown = (e) => {
    // backspace
    if (e.keyCode === 8) {
      // jump to previous word if there is an error
      if(currCharIndex < 0 && wordSpanRefs[currWordIndex - 1].error){
        e.preventDefault()
        setCurrWordIndex(currWordIndex - 1)
        setCurrCharIndex(inputWordsHistory[currWordIndex - 1].length - 1)
        setCurrInput(inputWordsHistory[currWordIndex - 1])
        return
      }

      if(currCharIndex < 0){
        return
      }

      setCurrCharIndex(currCharIndex - 1)
      setCurrChar("");

      delete history[keyString];
      return;
    }

    // spacebar
    if(e.keyCode === 32){
      // chars skipped
      if(currCharIndex < words[currWordIndex].length - 1){
        wordSpanRefs[currWordIndex].error = true
      }

      setCurrInput("");
      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(-1);
      return;
    }

    setCurrCharIndex(currCharIndex + 1);
    setCurrChar(e.key);
  }

  const getExtraCharsDisplay = (word, i) => {
    let input = inputWordsHistory[i];

    if (!input) {
      input = currInput.trim();
    }
    if (i > currWordIndex) {
      return null;
    }

    if (input.length <= word.length) {
      return null;
    } else {
      const extra = input.slice(word.length, input.length).split("");
      return extra.map((c, idx) => (
        <span key={idx} className='error-char'>
          {c}
        </span>
      ));
    }
  };

  const getCharClassName = (wordIdx, charIdx, char, word) => {
    const keyString = wordIdx + "." + charIdx;

    if (history[keyString] === true) {
      return "correct-char";
    }
    if (history[keyString] === false) {
      return "error-char"
    }
    if (
      wordIdx === currWordIndex &&
      charIdx === currCharIndex &&
      currChar){
        if (char === currChar) {
          history[keyString] = true;
          return "correct-char";
        } else {
          history[keyString] = false;
          return "error-char";
        }
      } else {
        if (wordIdx < currWordIndex) {
          history[keyString] = undefined;
        }
      }
      if(wordIdx === currWordIndex && charIdx === currCharIndex + 1){
        return 'current-char'
      }
    
  }

  

  const getWordClassName = (wordIdx) => {
    let cls = ['word']
    if (currWordIndex === wordIdx) {
      cls.push('active')
    } 
    if(wordSpanRefs[wordIdx].error){
      cls.push('error')
    }
    return cls.join(' ')
  };
  
  return (
    <>
      <div className="words">
        {words.map((word, i) => (
          
          <span
            key={i}
            ref={wordSpanRefs[i].ref}
            className={getWordClassName(i)}
          >
            {word.split("").map((char, idx) => (
              <span
                key={"word" + idx}
                className={getCharClassName(i, idx, char, word)}
              >
                {char}
              </span>
            ))}
            {getExtraCharsDisplay(word, i)}
          </span>
        )
      )}
      </div>
      <input
        key="hidden-input"
        ref={inputRef}
        type="text"
        className="hidden-input"
        onKeyDown={(e) => handleKeyDown(e)}
        value={currInput}
        onChange={(e) => updateInput(e)}
      />
    </>
    
  )
}
