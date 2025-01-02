# Medical_Assistant
Medical_Assistant is an innovative AI-powered solution designed to simplify and enhance medical practice. With advanced text-generation capabilities, it assists doctors by efficiently compiling patient symptom lists and drafting accurate prescriptions.

## Testing deployed Application

### **Check our deployed application [here.](https://medical-assistant-deploy.vercel.app/)**

### Our github repositories

* Our main [repository](https://github.com/Bistec-SUSL-2024/Medical_Assistant)

* The [github repo](https://github.com/JehanRodrigo/Medical_Assistant_Deploy) which connected to Vercel.

* The github repos which connected to google cloud platform
    * [GPT2 with one suggestion.](https://github.com/AshanLakshitha16763/Medi_backend_GPT2)
    * [BIoGPT with three suggestions.](https://github.com/AshanLakshitha16763/Medi_backend_bioGPT)
    * [Other models with inference API.](https://github.com/JehanRodrigo/Medical_Assistant_Backend_API_Call)
      
* The [repository](https://github.com/JehanRodrigo/Medical_Assistant_Backend) for testing backends.

### Our deployments
* The deployed backend with [GPT2.](https://medicalback-34822786368.asia-south1.run.app/)
* The deployed backend with [BioGPT.](https://biosuggimg-1081715976745.asia-south1.run.app)
* The deployed backend for one suggestion with [Groq.](https://groq1newimg-566299158369.us-central1.run.app/)
* The deployed backend with [GPT-3.5.](https://gpt3-5img-588828373957.asia-south1.run.app )
* The deployed backend with [GPT 4.o.](https://backendapiimg-311437687915.us-central1.run.app )


## AI_Suggestion_App

### AI_Suggestion_App/frontend

* Change current directory to frontend folder:
    ```
    cd Medical_Assistant/AI_Suggestion_App/frontend
    ```
* To install dependencies 
    ```
    npm install
    ```
* To run the frontend
    ```
    npm start
    ```
### AI_Suggestion_App/frontend_Old

* Change current directory to frontend folder:
    ```
    cd Medical_Assistant/AI_Suggestion_App/frontend_Old
    ```
* To install dependencies 
    ```
    npm install
    ```
* To run the frontend_Old
    ```
    npm start
    ```


* Now, it will run on your browser.
* To stop the server:
In your terminal, press ```ctrl``` + ```c``` keys.


### AI_Suggestion_App/backend
* Use a new seperate terminal for the backend
* Change current directory to particular backend folder as your need:
   * BioGPT_3_sug
    ```
    cd Medical_Assistant/AI_Suggestion_App/BioGPT_3_sug
    ```
   * GPT2_1_sug
    ```
    cd Medical_Assistant/AI_Suggestion_App/GPT2_1_sug
    ```
   * MistralAI_mistral-large-latest
    ```
    cd Medical_Assistant/AI_Suggestion_App/MistralAI_mistral-large-latest
    ```
   * OpenAI_GPT_3.5_turbo
    ```
    cd Medical_Assistant/AI_Suggestion_App/OpenAI_GPT_3.5_turbo
    ```
   * OpenAI_GPT-4o
    ```
    cd Medical_Assistant/AI_Suggestion_App/OpenAI_GPT-4o
    ```
   * backend_Groq
    ```
    cd Medical_Assistant/AI_Suggestion_App/backend_Groq
    ```
   * backend_Groq_3_Suggest
    ```
    cd Medical_Assistant/AI_Suggestion_App/backend_Groq_3_Suggest
    ```

#### Setting up the Virtual Environment:
 * Refer the documentation to create and activate the virtual environment [here.](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/)

 * After activating Virtual Environment,run below commands in your terminal:
  
 * To install Dependencies:
    ```
    pip install -r requirements.txt
    ```
    
 * To run the backend python file:
   * BioGPT_3_sug
    ```
    python medi_backend_BioGPT.py
    ```
   * GPT2_1_sug
    ```
    python medi_backend_gpt2_pipe.py
    ```
   * MistralAI_mistral-large-latest
    ```
    python mistralAI.py
    ```
   * OpenAI_GPT_3.5_turbo
    ```
    python openai_back_gpt-3.5-turbo.py
    ```
   * OpenAI_GPT-4o
    ```
    python openai_back_gpt-4o.py
    ```
   * backend_Groq
    ```
    python groq_back.py
    ```
   * backend_Groq_3_Suggest
    ```
    python groq_back_with_3_suggest.py
    ```
    
 * To stop the server:
    In your terminal, press ```ctrl``` + ```c``` keys.

## Next_Word_Prediction

### Next_Word_Prediction/Predictor

* Change the path of your terminal:
    ```
    cd Medical_Assistant/Next_Word_Prediction/Predictor
    ```

#### Setting up the Virtual Environment:
 * Refer the documentation to create and activate the virtual environment [here.](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/)

 * After activating Virtual Environment,run below commands in your terminal:
   
#### Installing Dependencies to run predictor.py
 * To install pytorch. Refer the official site [here](https://pytorch.org/get-started/locally/)

 * To install Dependencies:
    ```
    pip install -r requirements.txt
    ```
 
### Next_Word_Prediction/pytorchTrainer
   * Change the path of your terminal:
 ```
    cd Medical_Assistant/Next_Word_Prediction/pytorchTrainer
 ```

##### Setting up the Virtual Environment:
  * Refer the documentation to create and activate the virtual environment [here.](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/)

  * After activating Virtual Environment,run below commands in your terminal:

  * To install Dependencies:
    ```
    pip install -r requirements.txt
    ```
  * Now, run the trainer_pytorch.py file:
    ```
    python trainer_pytorch.py
    ```

### Next_Word_Prediction/tensorflowTrainer
   * Change the path of your terminal:
 ```
    cd Medical_Assistant/Next_Word_Prediction/tensorflowTrainer
 ```

##### Setting up the Virtual Environment:
  * Refer the documentation to create and activate the virtual environment [here.](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/)

  * After activating Virtual Environment,run below commands in your terminal:

  * To install Dependencies:
    ```
    pip install -r requirements.txt
    ```
  * Now, run the trainer_pytorch.py file:
     ```
    python trainer_tensorflow.py
    ``` 

 * To stop the server:
    In your terminal, press ```ctrl``` + ```c``` keys.
 
  


