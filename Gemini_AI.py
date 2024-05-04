import os
from dotenv import load_dotenv
import vertexai
from vertexai.preview.generative_models import GenerativeModel, GenerationConfig, HarmCategory, HarmBlockThreshold, Part
from PIL import Image as PILImage
from io import BytesIO
import sys
import json

# Load environment variables from .env file
load_dotenv()

# Access environment variables
project_id = os.getenv('PROJECT_ID')
location = os.getenv('LOCATION')
google_credentials = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')

# Set the GOOGLE_APPLICATION_CREDENTIALS environment variable
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = google_credentials

vertexai.init(project = project_id, location = location)

generation_config = GenerationConfig(
    temperature = 0.1,          # higher = more creative (default 0.0)
    top_p = 0.5,                # higher = more random responses, response drawn from more possible next tokens (default 0.95)
    top_k = 10,                 # higher = more random responses, sample from more possible next tokens (default 40)
    candidate_count = 1,
    max_output_tokens = 1024
)

safety_settings = {
    HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
}

safety_settings = {
    HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
}

# image_to_json: converts an images of food to text in json format
# str, str(image bytes) -> str (.json)
def image_to_json(image_name, image_path):
    prompt = (f"""
              Given the image, which is {image_name}, I want you 
              to convert this into text in a json format. 
              Divide the content into Macronutrients and Micronutrients 
              and provide the values for each, as well as state the serving size in grams.
              Make sure to include the name of the ingredient.
              """)

    model = GenerativeModel("gemini-1.0-pro-vision")

    with open(image_path, 'rb') as f:
            image = f.read()

    image = PILImage.open(BytesIO(image))
    image_byte_array = BytesIO()
    image.save(image_byte_array, format='JPEG')
    image_bytes = image_byte_array.getvalue()

    prompt_part = Part.from_text(prompt)
    image_part = Part.from_data(data=image_bytes, mime_type='image/jpeg')
    
    contents = [prompt_part, image_part]

    responses = model.generate_content(
        contents = contents,
        generation_config = generation_config,
        safety_settings = safety_settings,
        stream = False
    )

    return responses.text
