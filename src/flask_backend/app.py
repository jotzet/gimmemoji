from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

classifier = pipeline(task="text-classification", model="SamLowe/roberta-base-go_emotions", top_k=None)

def process_input(input_data):
    sentences = [input_data]
    model_outputs = classifier(sentences)
    return model_outputs[0]

app = Flask(__name__)
CORS(app)

@app.route('/process', methods=['POST'])
def process():
    input_data = request.json.get('input_data')
    processed_data = process_input(input_data)
    return jsonify({'result': processed_data})

if __name__ == '__main__':
    app.run(debug=True)