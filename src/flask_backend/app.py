from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

model_1 = pipeline(task="text-classification", model="SamLowe/roberta-base-go_emotions", top_k=1)
model_2 = pipeline("text-classification", model="michellejieli/emotion_text_classifier")
model_3 = pipeline("text-classification",model='bhadresh-savani/bert-base-uncased-emotion', return_all_scores=False)


def process_input(input_data):
    model_1_output = model_1(input_data)
    model_2_output = model_2(input_data)
    model_3_output = model_3(input_data)

    return [model_1_output[0][0], model_2_output[0], model_3_output[0]]

app = Flask(__name__)
CORS(app)

@app.route('/process', methods=['POST'])
def process():
    input_data = request.json.get('input_data')
    processed_data = process_input(input_data)
    return jsonify(processed_data)

if __name__ == '__main__':
    app.run(debug=True)