import React,{useState} from 'react';
import SearchBar from './components/SearchBar';
import ModelSelector from './components/ModelSelector';
import '../src/styles/App.css';
import NewLineHint from './components/NewLineHint';
import {Blocks} from 'react-loader-spinner';
import axios from 'axios';

function App() {
    const [selectedModel, setSelectedModel] = useState(null);
    const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);
    // Define backend URLs for different models
    
    const modelBackendUrls = {
        'GPT2':'https://gpt2apiimg-388091007362.asia-south1.run.app/suggest',
        'BIOGPT':'https://biosuggimg-1081715976745.asia-south1.run.app/suggest',
        'GPT-3.5 Turbo':'https://gpt3-5img-588828373957.asia-south1.run.app/suggest',
        'GPT-4o':'https://backendapiimg-311437687915.us-central1.run.app/suggest',
        'Groq':'https://groqapi3suggestimg-907720686292.asia-south1.run.app/suggest',
        'Mistral':'https://mistralaiapi3suggestimg-770852879163.asia-south1.run.app/suggest'
        
    };

    // Define backend base URL for different models
    const modelBaseUrls = {
        'GPT2': 'https://gpt2apiimg-388091007362.asia-south1.run.app',
        'BIOGPT': 'https://biosuggimg-1081715976745.asia-south1.run.app',
        'GPT-3.5 Turbo': 'https://gpt3-5img-588828373957.asia-south1.run.app',
        'GPT-4o': 'https://backendapiimg-311437687915.us-central1.run.app',
        'Groq': 'https://groqapi3suggestimg-907720686292.asia-south1.run.app',
        'Mistral': 'https://mistralaiapi3suggestimg-770852879163.asia-south1.run.app',
    };

    const handleModelChange = async (model) => {
        setSelectedModel(model);
        setIsSpinnerVisible(true);

        const baseUrl = modelBaseUrls[model.code];
        if (!baseUrl) {
            console.error('Base URL not found for the selected model:', model.code);
            setIsSpinnerVisible(false);
            return;
        }

        try {
            // Fetch data from the "/" endpoint
            const response = await axios.get(`${baseUrl}/`);
            console.log('Response from backend:', response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsSpinnerVisible(false);
        }
    };

    return (
        <div className="App">
            <h1>AI-Driven Prompt Suggestion</h1>
            <ModelSelector onModelChange={handleModelChange} isSpinnerVisible={isSpinnerVisible} />
            
            {!isSpinnerVisible &&
            <NewLineHint selectedModel={selectedModel}/>
            }
            
            {!isSpinnerVisible &&
            <SearchBar selectedModel={selectedModel}
            backendUrl={selectedModel ? modelBackendUrls[selectedModel.code] : null} />
            }

           {isSpinnerVisible &&
           <div className="spinner"> 
                <Blocks
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                visible={true} />
                
                <div>Please wait, {[selectedModel.code]} Model's Backend is Loading...</div>   
                
            </div>
            }


        </div>
    );
}

export default App;