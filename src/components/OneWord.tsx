import React, { useEffect, useRef, useState } from 'react'
import Caret from './Caret'

const words = [
    {
      original: 'sample',
      val: 'sample'
    },
    {
      original: 'test',
      val: 'test'
    }
]
export default function OneWord() {
  
  let charSpanRefs = Array(words[0].val.length).fill(0).map(i => React.useRef(null))

  const caretRef = useRef(null)

  const renderWords = () => (
    <span className='words'>{words[0].val.split('').map((e, i)=> (
    <span 
    ref={charSpanRefs[i]}
    className='char'
    >
      {e}
    </span>
    ))}
  </span>
  
)

  const [wordState, setWordState] = useState(renderWords())

  const [currInput, setCurrInput] = useState('') 
  const [currCharIndex, setCurrCharIndex] = useState(0)
  
  const [currWordIndex, setCurrWordIndex] = useState(0)
  const [currWord, setCurrWord] = useState(words[0].original)
  
  
  useEffect(()=>{
    setCurrWord(words[currWordIndex].original)
  }, [currWordIndex])


  const handleKeyDown = (e) => {

    if(currInput.length >= currWord.length ){
      words[0].val = currInput

      console.log(words[0].val)

      setWordState(renderWords())
      return
    }

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
    {wordState}


    
      <br/>
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








































// import React, { createElement, useEffect, useRef, useState } from 'react'
// import Caret from './Caret'
// const wordsArr = [
//   {
//     key: 'sample',
//     val: 'sample'
//   },
//   {
//     key: 'point',
//     val: 'point'
//   },
//   {
//     key: 'long',
//     val: 'long'
//   },
//   {
//     key: 'account',
//     val: 'account'
//   }
// ]
// const originalWords = wordsArr.map(e => e.key)
// const words = wordsArr.map(e => e.val)

// export default function OneWord() {
  
  
//   const caretRef = useRef(null)

//   // const charSpanRefs = Array(words.length).fill(0).map(i => React.useRef(null))
//   // const [charSpanRefs, setCharSpanRefs] = useState()
//   const charSpanRefs = words.map(word => (
//     Array(word.length).fill(0).map(i => React.useRef(null))
//   ))
//   const [currInput, setCurrInput] = useState('') 
  
//   const [currCharIndex, setCurrCharIndex] = useState(0)
//   const [currWordIndex, setCurrWordIndex] = useState(0)
//   const [currWord, setCurrWord] = useState(words[currWordIndex])
  


//   const updateInput = (e) => {
//     setCurrInput(e.target.value);
//   }

//   const handleKeyDown = (e) => {
    
//     if(currCharIndex >= currWord.length){   // end of word
//       const extraChars = currInput.slice(originalWords[currWordIndex].length - 1, currInput.length)
//       // extraChars.split('').map(item => {
//         // const span = document.createElement('span')
//         // span.className = 'error-char'
//         // span.textContent = item
//         // words[currWordIndex].concat()
//       // })
//       words[currWordIndex] = originalWords[currWordIndex].concat(extraChars)
//       console.log(words[currWordIndex])
//       // charSpanRefs[currWordIndex] = charSpanRefs[currWordIndex].concat(extraChars)
//       setCurrCharIndex(currCharIndex + 1)
//       return
//     }
//     const currChar = charSpanRefs[currWordIndex][currCharIndex].current

//     if(e.keyCode === 32){     //spacebar
//       setCurrInput('')
//       setCurrWordIndex(currWordIndex + 1)
//       setCurrCharIndex(0)
//       setCurrWord(words[currWordIndex])
//       return
//     }

//     if (e.keyCode === 8) {    // backspace
//       charSpanRefs[currWordIndex][currCharIndex - 1].current.className = 'char'

//       setCurrCharIndex(currCharIndex - 1 )
//       return
//     }

//     if(currChar.textContent == e.key){

//       currChar.className = 'correct-char'

//     } else {
//       currChar.className = 'error-char'
//     }
//     setCurrCharIndex(currCharIndex + 1)
    
    
//   }
  
//   useEffect(() => {
//     console.log(words)
//     console.log(currCharIndex, currWord.length)
//     // if(currCharIndex < currWord.length ){
//     //   const {x, y} = charSpanRefs[currWordIndex][currCharIndex].current.getBoundingClientRect()
//     //   caretRef.current.style.left = `${x}px`;
//     //   caretRef.current.style.top = `${y + 5.5}px`;
//     // }
//   },[currInput, charSpanRefs])
  


//   return (
//   <>
//     <h2>OneWord</h2>
//     <div className='words'>
//       {words.map((word, wordIdx) => {
//         return <span className='word'>{word.split('').map((char, charIdx) => (
//           <span 
//           ref={charSpanRefs[wordIdx][charIdx]}
//           className='char'
//           >
//             {char}
//           </span>
//           ))}
//           {/* {getExtraCharsDisplay(word)} */}
//         </span>
// })}
//     </div>
   

//     <input 
//       type="text"
//       onChange={updateInput}
//       onKeyDown={handleKeyDown}
//       value = {currInput}
//     />

//     <Caret ref={caretRef} />
    
//     <button onClick={()=>   console.log(currCharIndex, currWord.length)}>log</button>
//   </>
//   )
// }
