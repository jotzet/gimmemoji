from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

emotionMap = {
  "disappointment": "😞",
  "sadness": "😢",
  "annoyance": "😠",
  "neutral": "😐",
  "disapproval": "👎",
  "realization": "💡",
  "nervousness": "😰",
  "approval": "👍",
  "joy": "😄",
  "anger": "😡",
  "embarrassment": "😳",
  "caring": "❤️",
  "remorse": "😔",
  "disgust": "🤢",
  "grief": "💔",
  "confusion": "😕",
  "relief": "😌",
  "desire": "😍",
  "admiration": "😊",
  "optimism": "😊",
  "fear": "😨",
  "love": "❤️",
  "excitement": "😃",
  "curiosity": "🤔",
  "amusement": "😆",
  "surprise": "😲",
  "gratitude": "🙏",
  "pride": "🏆"
}

# this function returns emojis from the models
def process_input(input_data):
    model_1 = pipeline(task="text-classification", model="SamLowe/roberta-base-go_emotions", top_k=1)
    model_2 = pipeline(task="text-classification", model="michellejieli/emotion_text_classifier")
    model_3 = pipeline(task="text-classification",model='bhadresh-savani/bert-base-uncased-emotion', top_k=1)
    model_1_output = model_1(input_data)
    model_2_output = model_2(input_data)
    model_3_output = model_3(input_data)

    return [emotionMap[model_1_output[0][0]["label"]], emotionMap[model_2_output[0]["label"]], emotionMap[model_3_output[0][0]["label"]]]

# filtering the emotions to only the ones that all models have and returning the one with the biggest score
def filter_emotions(model_output):
    filtered_emotions = ['fear', 'anger', 'joy', 'surprise', 'sadness']
    filtered_output = []
    max_score = -1
    max_emotion = None

    for emotion_dict in model_output[0]:
        if emotion_dict['label'] in filtered_emotions:
            filtered_output.append(emotion_dict)
            if emotion_dict['score'] > max_score:
                max_score = emotion_dict['score']
                max_emotion = emotion_dict

    return filtered_output, max_emotion

# this function checks if the models return the intended emotion and then give them score based on that
def evaluate_model(predictions):
    scores = [0, 0, 0, len(predictions)] 

    model_1 = pipeline(task="text-classification", model="SamLowe/roberta-base-go_emotions", top_k=None)
    model_2 = pipeline(task="text-classification", model="michellejieli/emotion_text_classifier", top_k=None)
    model_3 = pipeline(task="text-classification", model='bhadresh-savani/bert-base-uncased-emotion', top_k=None)

    for prediction in predictions:
        input_data = prediction['sentence']
        expected_emoji = prediction['emoji']

        model_1_output = model_1(input_data)
        model_2_output = model_2(input_data)
        model_3_output = model_3(input_data)

        m1_filtered_output, m1_max_emotion = filter_emotions(model_1_output)
        m2_filtered_output, m2_max_emotion = filter_emotions(model_2_output)
        m3_filtered_output, m3_max_emotion = filter_emotions(model_3_output)

        if emotionMap[m1_max_emotion['label']] == expected_emoji:
            scores[0] += 1
        if emotionMap[m2_max_emotion['label']] == expected_emoji:
            scores[1] += 1 
        if emotionMap[m3_max_emotion['label']] == expected_emoji:
            scores[2] += 1       

        print(scores)    
    return scores


app = Flask(__name__)
CORS(app)

@app.route('/process', methods=['POST'])
def process():
    input_data = request.json.get('input_data')
    processed_data = process_input(input_data)
    return jsonify(processed_data)

@app.route('/evaluate', methods=['POST'])
def evaluate():
    data = request.json
    scores = evaluate_model(data)
    return jsonify(scores)

if __name__ == '__main__':
    app.run(debug=True)