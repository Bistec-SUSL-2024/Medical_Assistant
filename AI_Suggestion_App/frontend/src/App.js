import React,{useState} from 'react';
import SearchBar from './components/SearchBar';
import ModelSelector from './components/ModelSelector';
import '../src/styles/App.css';
import NewLineHint from './components/NewLineHint';

function App() {
    const [selectedModel, setSelectedModel] = useState(null);

    // Define backend URLs for different models
    const modelBackendUrls = {
        'GPT2':'https://gpt2apiimg-388091007362.asia-south1.run.app/suggest',
        'BIOGPT':'https://biosuggimg-1081715976745.asia-south1.run.app/suggest',
        'GPT-3.5 Turbo':'https://gpt3-5img-588828373957.asia-south1.run.app/suggest',
        'GPT-4.0':'https://backendapiimg-311437687915.us-central1.run.app/suggest',
        'Groq':'https://groqapi3suggestimg-907720686292.asia-south1.run.app/suggest',
        'Mistral':'https://mistralaiapi3suggestimg-770852879163.asia-south1.run.app/suggest'
        
    };


    const handleModelChange = (model) => {
        setSelectedModel(model);
        // You can add additional logic here if needed when model changes
        console.log('Selected Model:', model);
    };

    return (
        <div className="App">
            <h1>AI-Driven Prompt Suggestion</h1>
            <ModelSelector onModelChange={handleModelChange} />
            <NewLineHint selectedModel={selectedModel}/>
            <SearchBar selectedModel={selectedModel}
            backendUrl={selectedModel ? modelBackendUrls[selectedModel.code] : null} />
            
        </div>
    );
}

export default App;