import "./App.css";
import { useState } from "react";
import Sidebar from './componets/sidebar';
import Navbar from './componets/navbar';

function App() {
      const [isSidebarOpen, setIsSidebarOpen] = useState(true);

      const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };

  return (
    <div className="App">
      <Sidebar isOpen={isSidebarOpen}/>
    <div className="vertical-line"></div>
      <div className="right-section">
          <Navbar toggleSidebar={toggleSidebar}/>
          main content
        </div>
      
    </div>
  );
}

export default App;
