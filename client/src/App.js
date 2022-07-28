import './styles.css';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [results, setResults] = useState([]); 
  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if( text.length >= 3){
        setShow(false);
        const data = await fetch(`https://invertion.herokuapp.com/iecho?text=${text}`)
        .then(r => r.json())
        
        setResults([data, ...results])

      } else {
        setShow(true);
      }
      setText('')
    }catch(e) {
      console.log(e);
    }
  }
  const handleChange = (e) => {
    setText(e.target.value);
  }
  const handleReset = () => {
    setResults([]);
  }
  return (
    <div className='d-flex flex-column align-items-center min-vh-100 bg-secondary bg-opacity-25'>
      <Form className='d-flex justify-content-center align-items-center py-2 mb-4 w-100 bg-danger'
       onSubmit={handleSubmit}>
        <Form.Control type='text' className='my-3 w-25' placeholder='type your text'
          onChange={handleChange} value={text} />
        <button className='m-3 btn btn-primary' type='submit' >Invert</button>
        <span >
          {
            show ? 'type at least 3 characters' : ''
          }
        </span>
      </Form>
      <div className='d-flex w-75 mb-4 bg-white'>
        <h2 className='p-2 w-25'>Results :</h2>
        <ul className='w-100 pt-4'>
          {
            results?.map((e, i) => {
              return (
                <li key={i} className='alert alert-dark d-flex justify-content-between w-75'>
                  <p>{e.text}</p>
                  <p> Palindrome : 
                    {
                      e.palindrome ? ' True' : ' False'
                    }
                  </p>
                </li>
              )
            })
          }
        </ul>
        <button className='btn btn-primary m-3 w-auto h-25' onClick={handleReset} >Reset</button>
      </div>
    </div>
  );
}

export default App;
