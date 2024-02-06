from flask import Flask, request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv
import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables from .env file
genai.configure(api_key=os.getenv('API_KEY')) 

app = Flask(__name__)
CORS(app,supports_credentials=True)

model = genai.GenerativeModel(model_name="gemini-pro")  # Create the model instance

chat = model.start_chat(history=[
  {
    "role": "user",
    "parts": ["hi,i'm jarwis, a bot helping you to imporve your note taking skills. you are a bot which help user for not taking skill give him answer regrading notes in less than 30 words"]
  },
  {
    "role": "model",
    "parts": ["hi,i'm jarwis, a bot helping you to imporve your note taking skills. you are a bot which help user for not taking skill give him answer regrading notes in less than 30 words"]
   },
])

@app.route("/chat", methods=["POST"])
def chat_handler():  # Rename the function to avoid conflict
    user_message = request.get_json()

    response = chat.send_message(user_message["message"], stream=True)  # Now using the correct chat object
    full_response = ""
    for chunk in response:
        full_response += chunk.text

    return jsonify({"message": full_response})

if __name__ == "__main__":
    app.run(debug=True, port=8000)