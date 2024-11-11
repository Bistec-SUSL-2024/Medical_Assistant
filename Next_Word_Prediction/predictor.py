from transformers import AutoTokenizer, AutoModelForCausalLM

# Load the BioGPT model and tokenizer
model_name = "microsoft/BioGPT-Large" # 6.29GB
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Define a function for text completion
def generate_text(prompt, max_length=50):
    # Encode the input text
    inputs = tokenizer(prompt, return_tensors="pt")

    # Generate completion
    output = model.generate(inputs['input_ids'], max_length=max_length, num_return_sequences=1)

    # Decode and return the completed text
    return tokenizer.decode(output[0], skip_special_tokens=True)

# List of 5 example prompts for medical text completion
prompts = [
    "Following the review of medical history",
    "Patient reports severe back pain",
    "The patient was prescribed",
    "Common symptoms of depression including",
    "Following the physical assessment,"
]

# Generate completions for each prompt
for prompt in prompts:
    print(f"Prompt: {prompt}")
    print(f"Completion: {generate_text(prompt)}\n")


# Output: when we use "microsoft/BioGPT-Large"
"""(.venv) PS D:\Projects\Bistec\Medical_Assistant\Next_Word_Prediction> python predictor.py   
tokenizer_config.json: 100%|███████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 256/256 [00:00<00:00, 256kB/s]
D:\Projects\Bistec\Medical_Assistant\Next_Word_Prediction\.venv\Lib\site-packages\huggingface_hub\file_download.py:147: UserWarning: `huggingface_hub` cache-system uses symlinks by default to efficiently store duplicated files but your machine does not support them in C:\Users\DELL\.cache\huggingface\hub\models--microsoft--BioGPT-Large. Caching files will still work but in a degraded version that might require more space on your disk. This warning can be disabled by setting the `HF_HUB_DISABLE_SYMLINKS_WARNING` environment variable. For more details, see https://huggingface.co/docs/huggingface_hub/how-to-cache#limitations.
To support symlinks on Windows, you either need to activate Developer Mode or to run Python as an administrator. In order to activate developer mode, see this article: https://docs.microsoft.com/en-us/windows/apps/get-started/enable-your-device-for-development
  warnings.warn(message)
vocab.json: 100%|██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 1.24M/1.24M [00:05<00:00, 229kB/s]
merges.txt: 100%|████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 566k/566k [00:01<00:00, 285kB/s]
special_tokens_map.json: 100%|████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 119/119 [00:00<?, ?B/s]
config.json: 100%|████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 658/658 [00:00<?, ?B/s]
pytorch_model.bin: 100%|██████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 6.29G/6.29G [18:53<00:00, 5.55MB/s]
generation_config.json: 100%|█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 137/137 [00:00<?, ?B/s]
Prompt: Following the review of medical history
Completion: Following the review of medical history, the patient was diagnosed with a primary lung adenocarcinoma. The patient underwent a right upper lobectomy and mediastinal lymph node dissection. The pathological diagnosis was a moderately differentiated adenocarcinoma, pT2aN1M0, stage IIB. The

Prompt: Patient reports severe back pain
Completion: Patient reports severe back pain and weakness in his right leg. MRI of the lumbar spine showed a large epidural mass extending from L1 to L5. The mass was excised and the patient's symptoms resolved. The mass was diagnosed as a chordoma. Chor

Prompt: The patient was prescribed
Completion: The patient was prescribed a daily dose of 1 0 0 mg of oral prednisolone. The patient's symptoms improved after the administration of prednisolone. < / FREETEXT > < /ve impairment are common in patients with cancer. The purpose of this study was to examine the relationship between fatigue, sleep disturbance, and cognitive impairment in patients with cancer. ▃ ▃ ▃ METHODS ▃

Prompt: Following the physical assessment,
Completion: Following the physical assessment, the patient was referred to a physiotherapist for further assessment and treatment. The patient was discharged with a prescription for a home exercise programme. ▃ ▃ ▃ DISCUSSION ▃ The patient was able to return to work following a period of
"""