import { createRoot } from 'react-dom/client'
import { useState } from 'react';
import Main from './ativosGraph.jsx';
import Sidebar from './sidebar.jsx';

function MyComponent() {
  const [isVisible, setIsVisible] = useState();

    return (
      <div style={{marginLeft: "250px"}}>        
        <button onClick={() => setIsVisible(true)}>
          Toggle Child
        </button>
        {isVisible && <Main />}
      </div>
    );
  }

createRoot(document.getElementById('inoa')).render(
  <>
    <Sidebar/>
    <MyComponent/>
  </>
)