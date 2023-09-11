
import { useState, useEffect } from 'react';
import './index.scss';
import Gallery from './Components/Gallery';
import Navbar from './Components/Navbar';
import SubmitModal from './Components/SubmitModal';

function App() {
  const [model, setModel] = useState(false);

  useEffect(() => {
    if (model) {
       document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [model ]);
 
 
  return (
    <div className='app'>
      <Navbar openModel={() => setModel(true)}/>
      <Gallery />
      {model && <SubmitModal closeModel={() => setModel(false)} />}

    </div>
  );
}

export default App;
