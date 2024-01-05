import React, { useMemo, useRef, useState } from 'react'

export default function NewTry() {
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

  const wordsKey = useMemo(() => {
    return wordsDict.map((e) => e.key);
  }, [wordsDict]);

  const wordSpanRefs = useMemo(
    () =>
      Array(words.length)
        .fill(0)
        .map((i) => React.createRef()),
    [words]
  );

  const inputRef = useRef(null)
  const [currInput, setCurrInput] = useState("");

  
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(-1);
  
  const [prevInput, setPrevInput] = useState("");
  
  const [history, setHistory] = useState({});
  const keyString = currWordIndex + "." + currCharIndex;

  const [currChar, setCurrChar] = useState("");

  const [inputWordsHistory, setInputWordsHistory] = useState({});


  const updateInput = (e) => {
    setCurrInput(e.target.value);

    inputWordsHistory[currWordIndex] = e.target.value.trim();
    setInputWordsHistory(inputWordsHistory);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 8) {
      if(currCharIndex >= 0){
        setCurrCharIndex(currCharIndex - 1)
      }
        setCurrChar("");

        delete history[keyString];
        return;
    }
    if(e.keyCode === 32){
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
      history[i] = extra.length;
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
    return 'char'
  }

  const getWordClassName = (wordIdx) => {
      if (currWordIndex === wordIdx) {
          return "word active-word";
      } else {
        return "word";
      }
    
  };
  
  return (
    <>
      <div className="words">
        {words.map((word, i) => (
          <span
            key={i}
            ref={wordSpanRefs[i]}
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
        ))}
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
