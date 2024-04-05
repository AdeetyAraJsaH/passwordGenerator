import { useState, useCallback, useEffect, useRef } from 'react'
// import {ReactComponent as CopyLogo} from './assets/copy.svg'
import SvgFill from './assets/copy.jsx'
import './App.css'

function App() {
  const [length, setLength] = useState(7)
  const [numEnable, setnumEnable] = useState(false)
  const [chrEnable, setchrEnable] = useState(false)
  const [Password, setPassword] = useState("")
  const [fill, setFill] = useState('#f8f2f2')
  const [isCopied, setIsCopied] = useState(false)
  const passkeyRef = useRef(null);

  // function for generating password
  const passwordGenerator = useCallback(() => {
    let passKey = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numEnable) str += "0123456789"
    if (chrEnable) str += "!@#$%^&*+-/|()_~`=(){}:"

    for (let index = 0; index < length; index++) {
      let chr = Math.floor(Math.random() * str.length + 1);
      passKey += str.charAt(chr)
    }
    setPassword(passKey)
    setFill((fill) => (fill = '#f8f2f2'))   // toggle the fill of SVG to initial state when the text changed 
  }, [length, numEnable, chrEnable, setPassword])


  //copy the password
  const copyPassword = useCallback(() => {
    // passkeyRef.current?.select();   // for highlighting selected text in input
    window.navigator.clipboard.writeText(Password) // for copying text
    setFill((fill) => (fill = '#19ef5daa'))   // toggle the fill of SVG to copied
    // console.log('SVG changed')

    // setIsCopied(true);
    // setTimeout(() => setIsCopied(false), 1000); // Hide notification after 1 seconds

  }, [Password])
  useEffect(() => passwordGenerator(), [length, numEnable, chrEnable])

  return (
    <>
      <div
        className='w-full max-w-md mx-auto shadow-lg rounded-lg px-5 py-4 my-8 text-white bg-slate-600'>
        <h1
          className='text-2xl text-center my-2'
          style={{ color: 'white' }}>Password Generator</h1>
        <div
          className='flex rounded-lg my-3 border-emerald-300 shadow-xl overflow-hidden'>
          <input
            style={{ color: "rgb(71 85 105 / var(--tw-bg-opacity))" }}
            type="text"
            value={Password}
            className='outline-none w-full py-1 px-3 my-1 rounded-full'
            placeholder='Password'
            readOnly
            ref={passkeyRef} />

          <button
            onClick={copyPassword}
            // style={{backgroundColor:"#61dafbaa"}}
            className='outline-none px-2 py-1 shrink-0'>
            <SvgFill fill={fill} />
          </button>
        </div>
        <div className='items-center'>{isCopied && <span>Copied!</span>}</div>
        <div className='flex text-sm gap-x-4 my-1'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={7}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }} />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numEnable}
              value={length}
              className='cursor-pointer'
              onChange={() => { setnumEnable((numEnable) => !numEnable) }} />
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={chrEnable}
              value={length}
              className='cursor-pointer'
              onChange={() => { setchrEnable((chrEnable) => !chrEnable) }} />
            <label>Symbols</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
