from transformers import BioGptTokenizer, BioGptForCausalLM, Trainer, TrainingArguments
from datasets import load_dataset
import torch


# Load the BioGPT tokenizer and model
tokenizer = BioGptTokenizer.from_pretrained('microsoft/BioGPT')
model = BioGptForCausalLM.from_pretrained('microsoft/BioGPT')

# Load dataset
dataset = load_dataset('csv', data_files='data/dataset_100_symptoms.csv')



# Split the dataset into (90% train, 10% validation)
dataset = dataset['train'].train_test_split(test_size=0.1)



def tokenize_function(examples):
    texts = []
    for side_effect in examples['symptoms']:
        if side_effect is None:
            texts.append('')  # Add an empty string if side_effect is None
        else:
            # Split by comma, strip whitespace, and join with spaces
            effects = [effect.strip() for effect in side_effect.split(',')]
            texts.append(' '.join(effects))

    # Tokenize the batch of texts
    inputs = tokenizer(texts, padding="max_length", truncation=True, max_length=128)
    inputs['labels'] = inputs['input_ids'].copy()  # Set input_ids as labels for causal LM task
    return inputs


tokenized_datasets = dataset.map(tokenize_function, batched=True)

# Set up training arguments
training_args = TrainingArguments(
    output_dir='./results',          # output directory
    eval_strategy="epoch",           # evaluate at each epoch
    per_device_train_batch_size=16,  # batch size for training
    per_device_eval_batch_size=16,   # batch size for evaluation
    num_train_epochs=3,              # number of training epochs
    weight_decay=0.01,               # strength of weight decay
    logging_dir='./logs',            # directory for storing logs
)

# Initialize Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets['train'],
    eval_dataset=tokenized_datasets['test'],  # Use the split validation set
)

# Fine-tune the model
#using tensorflow
trainer.train()

# Save the fine-tuned model and tokenizer
model.save_pretrained('./results')
tokenizer.save_pretrained('./results')


#First test run results:
"""Generating train split: 14 examples [00:01, 12.37 examples/s]
Map: 100%|████████████████████████████████████████████████████████████████████████████████████████████████| 11/11 [00:00<00:00, 34.31 examples/s]
Map: 100%|█████████████████████████████████████████████████████████████████████████████████████████████████| 3/3 [00:00<00:00, 203.78 examples/s]
{'eval_loss': 12.436408996582031, 'eval_runtime': 9.2513, 'eval_samples_per_second': 0.324, 'eval_steps_per_second': 0.108, 'epoch': 1.0}        
{'eval_loss': 9.28521728515625, 'eval_runtime': 8.3021, 'eval_samples_per_second': 0.361, 'eval_steps_per_second': 0.12, 'epoch': 2.0}            
{'eval_loss': 8.515273094177246, 'eval_runtime': 6.4811, 'eval_samples_per_second': 0.463, 'eval_steps_per_second': 0.154, 'epoch': 3.0}
{'train_runtime': 331.7213, 'train_samples_per_second': 0.099, 'train_steps_per_second': 0.009, 'train_loss': 13.370978037516275, 'epoch': 3.0}  
100%|█████████████████████████████████████████████████████████████████████████████████████████████████████████████| 3/3 [05:31<00:00, 110.55s/it] """