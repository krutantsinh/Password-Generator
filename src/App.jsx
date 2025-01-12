import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
 const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(8)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  
  const passwordGenerator = useCallback(() => {
   
    const numbers = '1234567890'
    const symbols = '!@#$%^&*()_+'
    let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
   let pass = ''
    if (includeNumbers) characters += numbers
    if (includeSymbols) characters += symbols
    for (let i = 0; i < passwordLength; i++) {
      pass += characters.charAt(Math.floor(Math.random() * characters.length + 1))
    }

    setPassword(pass)  
  }, [passwordLength, includeNumbers, includeSymbols, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [includeNumbers, includeSymbols, passwordLength, passwordGenerator])

const passwordRef = useRef(null)

const copyPassword = useCallback(() => {
      passwordRef.current?.select()
      window.navigator.clipboard.writeText(password);
      alert('Password copied to clipboard')
  }, [password]);

  return (
    <>
      <div className="bg-blue-100 p-10 w-full h-screen flex flex-col items-center justify-center gap-5">
        <h1 className="text-2xl text-blue-700">Password Generator</h1>
       <div>
        <input
          type='text'
          value={password}
          className='w-96 h-10 p-2 outline-none bg-blue-50 rounded-md'  
          placeholder='Password'
          readOnly 
          ref={passwordRef}
          />
        <button 
        className='bg-blue-500 text-white px-4 py-2  rounded-md ml-2 outline-none'
        onClick={copyPassword}
        >
          Copy
          </button>
       </div>
       <div className='flex flex-col gap-5 text-sm'>
          <div className='flex items-center gap-x-1'>
            <input type="range" 
            min={6}
            max={100}
            value={passwordLength}
            className='cursor-pointer'
            onChange={(e) => setPasswordLength(e.target.value)}
            />
            <label>Length: {passwordLength}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
            checked={includeNumbers}
            id='numbersInput'
            onChange={(e) => setIncludeNumbers((prev) => !prev)}
            />
            <label htmlFor='numbersInput'>Include Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
            checked={includeSymbols}
            id='symbolsInput'
            onChange={() => setIncludeSymbols((prev) => !prev)}
            />
            <label htmlFor='symbolsInput'>Include Symbols</label>
          </div>
       </div>
      </div>
    </>
  )
}

export default App
