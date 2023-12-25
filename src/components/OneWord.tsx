import React, { useEffect, useRef, useState } from 'react'
import Caret from './Caret'

export default function OneWord() {
  const originalWord = 'sample'
  
  const caretRef = useRef(null)

  const charSpanRefs = Array(originalWord.length).fill(0).map(i => React.useRef(null))
  
  const [currInput, setCurrInput] = useState('') 
  const [currCharIndex, setCurrCharIndex] = useState(0)

  const handleKeyDown = (e) => {
    const currChar = charSpanRefs[currCharIndex].current

    if (e.keyCode === 8) {    // backspace
      charSpanRefs[currCharIndex - 1].current.className = 'char'

      setCurrCharIndex(currCharIndex - 1 )
      return
    }

    if(currChar.textContent == e.key){

      currChar.className = 'correct-char'

    } else {
      currChar.className = 'error-char'
    }
    setCurrCharIndex(currCharIndex + 1 )
    
  }

  const updateInput = (e) => {
    setCurrInput(e.target.value);
  }

  useEffect(() => {
    const {x, y} = charSpanRefs[currCharIndex].current.getBoundingClientRect()

    caretRef.current.style.left = `${x}px`;
    caretRef.current.style.top = `${y + 5.5}px`;
  },[currInput])
  

  return (
  <>
    <h2>OneWord</h2>
    <span className='words'>{originalWord.split('').map((e, i)=> (
      <span 
      ref={charSpanRefs[i]}
      className='char'
      >
        {e}
      </span>
      ))}
    </span>

    <input 
      type="text"
      onChange={updateInput}
      onKeyDown={handleKeyDown}
      value = {currInput}
      />

      <Caret ref={caretRef} />
  </>
  )
}
