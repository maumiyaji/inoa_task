import { createRoot } from 'react-dom/client'
import { useState } from 'react';
import Main from './ativosGraph.jsx';

// function MyComponent() {
//   const [isVisible, setIsVisible] = useState();

//     return (
//       <div style={{marginLeft: "300px"}}>        
//         <button onClick={() => setIsVisible(true)}>
//           Toggle Child
//         </button>
//         {isVisible && <Main />}
//       </div>
//     );
//   }

createRoot(document.getElementById('inoa')).render(
  <>
    <Main/>
  </>
)