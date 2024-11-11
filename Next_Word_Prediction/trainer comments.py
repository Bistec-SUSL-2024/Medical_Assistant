#Line 32 
# Previous Preprocessing part
""" # Split the symptoms by comma and join them with a space
    symptoms = [symptom.strip() for symptom in examples['side_effects'].split(',')]
    text = ' '.join(symptoms) """
    #Error:
    
""" File "D:\Projects\Bistec\Medical_Assistant\Next_Word_Prediction\trainer.py", line 25, in tokenize_function
    symptoms = [symptom.strip() for symptom in examples['side_effects'].split(',')]
                                               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    AttributeError: 'list' object has no attribute 'split' """

# Line 15:
"""
# Tokenize the dataset for causal language modeling
def tokenize_function(examples):
    inputs = tokenizer(examples['Input'], padding="max_length", truncation=True, max_length=128)
    inputs['labels'] = inputs['input_ids'].copy()  # Set input_ids as labels for causal LM task
    return inputs
"""

