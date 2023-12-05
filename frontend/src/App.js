import React,{useState} from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import GraphView from './components/graphView';
import UploadModule from './components/uploadModule';

import './assets/App.scss';



function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadSuccessful, setUploadSuccessful] = useState(false);
  //testing
  const [processedData, setProcessedData] = useState(''); // Initialize with an empty string
  const handleProcessSuccess = (data) => {
    setProcessedData(data);
  };

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleUploadSuccess = () => {
    setUploadSuccessful(true);
  };

  return (
    <div className={`app ${isOpen ? 'sidebar-open' : ''}`}>
      <Header isOpen={isOpen} toggleSidebar={handleToggleSidebar} />
      <div className="body">
        <Sidebar isOpen={isOpen} toggleSidebar={handleToggleSidebar} />
        {uploadSuccessful ? (
          <GraphView isOpen={isOpen} processedData={processedData} />
        ) : (
          <UploadModule
            onUploadSuccess={handleUploadSuccess}
            onProcessSuccess={handleProcessSuccess} /> //remove this function
        )}
      </div>
    </div>
  );
}

export default App;
