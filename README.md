# Medical_Assistant
Medical_Assistant is a system that uses AI-driven speech-to-text and text-generation technologies to help doctors that creates patient symptom lists and prescriptions.

## AI_Suggestion_App

### Frontend_Configuration

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

* Now, it will run on your browser.
* To stop the server:
In your terminal, press ```ctrl``` + ```c``` keys.


### Backend_Configuration
* Use a new seperate terminal for the backend
* Change current directory to backend folder:
    ```
    cd Medical_Assistant/AI_Suggestion_App/backend
    ```

#### Setting up the Virtual Environment:
 * Refer the documentation to create and activate the virtual environment [here.](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/)

 * After activating Virtual Environment,run below commands in your terminal:
  
 * To install Dependencies:
    ```
    pip install flask flask-cors transformers torch
    ```
    
 * To run the backend python file:
    ```
    python app.py
    ```
    
 * To stop the server:
    In your terminal, press ```ctrl``` + ```c``` keys.

## Next_Word_Prediction

#### Predictor.py
* Change the path of your terminal:
    ```
    cd Medical_Assistant/Next_Word_Prediction
    ```

#### Setting up the Virtual Environment:
 * Refer the documentation to create and activate the virtual environment [here.](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/)

 * After activating Virtual Environment,run below commands in your terminal:
   
#### Installing Dependencies to run predictor.py
 * To install pytorch. Refer the official site [here](https://pytorch.org/get-started/locally/)
 * To install transformers.
   ```
   pip install transformers
   ```
 * To install protobuf.
   ```
   pip install protobuf
   ```
 * To install sacremoses.
   ```
   pip install sacremoses
   ```
 * Now, run the Predictor python file:
    ```
    python predictor.py
    ```
### Installing Dependencies to run trainer.py
### *** If you did not set up the above environment for the predictor.py, please follow below steps:
   * Change the path of your terminal:
 ```
    cd Medical_Assistant/Next_Word_Prediction
 ```

##### Setting up the Virtual Environment:
  * Refer the documentation to create and activate the virtual environment [here.](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/)

  * After activating Virtual Environment,run below commands in your terminal:
   
##### Installing Dependencies
 * To install pytorch. Refer the official site [here](https://pytorch.org/get-started/locally/)
 * To install transformers.
   ```
   pip install transformers
   ```
### *** If you did setup .venv and install dependencies for predictor.py skip the above steps and continue from here....
 * First change the current directory in the terminal and navigate to the virtual environment and activate.
 * To install datasets
   ```
    pip install datasets
    ```
 * To install accelerate
   ```
    pip install accelerate
    ```
 * Now, run the trainer.py file:
    ```
    python trainer.py
    ```      
 * To stop the server:
    In your terminal, press ```ctrl``` + ```c``` keys.
 
  


