import os
from dotenv import load_dotenv
import vertexai
from vertexai.preview.generative_models import GenerativeModel, GenerationConfig, HarmCategory, HarmBlockThreshold, Part
from PIL import Image as PILImage
from io import BytesIO
import sys
import json
import openai
import requests

# Load environment variables from .env file
load_dotenv()

# Access environment variables
project_id = os.getenv('PROJECT_ID')
location = os.getenv('LOCATION')
google_credentials = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')


# Set the GOOGLE_APPLICATION_CREDENTIALS environment variable
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = google_credentials
# you have to call `export GOOGLE_APPLICATION_CREDENTIALS=your_credentials.json` in the terminal

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
def process_image(image_url, ingredient_name):
    print(f"Processing image from URL: {image_url} with ingredient name: {ingredient_name}")
    # Add your image processing logic here
# image_to_json: converts an images of food to text in json format
# str, str(image link) -> str (.json)
def image_to_json(image_name, image_link):
    prompt = (f"""
              Given the image, which is {image_name}, I want you 
              to convert this into text in a json format of: {{ingredient_name: {image_name}, 
              serving_size: , macronutrients: , micronutrients: }}. 
              Make sure the serving_size is in grams
              """)

    model = GenerativeModel("gemini-1.0-pro-vision")

    # Download the image from the provided URL
    response = requests.get(image_link)
    response.raise_for_status()  # Raises an HTTPError for bad responses
    image_bytes = response.content

    # Open the image using PIL
    image = PILImage.open(BytesIO(image_bytes))

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

    # Clean the API response text by removing markdown-like code formatting
    clean_response = responses.text.strip(" ```json \n")

    # Parse the JSON response and add the image URL
    response_data = json.loads(clean_response)  # Convert cleaned JSON string to a dictionary
    response_data["url"] = image_link  # Add the image link to the JSON data

    # Convert the modified dictionary back into a JSON string
    modified_response = json.dumps(response_data)

    return modified_response

# combine_json: combines multiple JSON strings into a single JSON string
# array[json] -> str
def combine_json(json_list):
    ingredients = {}
    
    # Iterate through the list of JSON strings
    for i, json_str in enumerate(json_list):
        # Load the JSON string into a dictionary
        ingredient_data = json.loads(json_str)
        
        # Add this dictionary to the ingredients dictionary with a new key
        ingredients[f"ingredient {i+1}"] = ingredient_data
    
    # Convert the ingredients dictionary to a JSON string
    combined_json = json.dumps(ingredients, indent=4)  # indent for pretty printing
    return combined_json

# generate_dish: generates a dish from the images in image_paths
# array, array, int -> str
def generate_dish(json_list, max_calories = None, min_protein = None):
    ingredient_list = combine_json(json_list)
    
    conditions = []
    if max_calories:
        conditions.append(f"not exceed {max_calories} calories")
    if min_protein:
        conditions.append(f"contain at least {min_protein} grams of protein")

    if conditions:
        condition_text = " and should ".join(conditions)
        prompt = (f"""
            Create a dish using only the following ingredients:
            {ingredient_list}
            The dish should {condition_text}.
            Provide a step-by-step recipe including nutritional information,
            using only these ingredients as main components. 
            You may use common pantry items such as spices and oils as side ingredients.
            All measurements should be in grams.
            Store the dish in json format of: {{dish_name: , ingredients: (just the ingredient_name), 
            instructions: , nutritional_information: , tips: }}
            """)
    else:
        prompt = (f"""
            Create a dish using only the following ingredients:
            {ingredient_list}
            Provide a step-by-step recipe including nutritional information,
            using only these ingredients as main components. 
            You may use common pantry items such as spices and oils as side ingredients.
            All measurements should be in grams.
            Store the dish in json format of: {{dish_name: , ingredients: 
            (just the ingredient_name without the serving size, macronutrients, and micronutrients), 
            instructions: , nutritional_information: , tips: }}
            """)

    model = GenerativeModel("gemini-1.0-pro-vision")

    prompt_part = Part.from_text(prompt)
    ingredients_part = Part.from_text(ingredient_list)

    contents = [prompt_part, ingredients_part]

    responses = model.generate_content(
        contents = contents,
        generation_config = generation_config,
        safety_settings = safety_settings,
        stream = False
    )

    # Clean the API response text by removing markdown-like code formatting
    clean_response = responses.text.strip(" ```json \n")

    # Parse the JSON response and add the image URL
    response_data = json.loads(clean_response)  # Convert cleaned JSON string to a dictionary

    # Extract dish_name and ingredients for the image description
    dish_description = {
        'dish_name': response_data['dish_name'],
        'ingredients': response_data['ingredients']
    }
    json_data_for_image = json.dumps(dish_description)  # Convert dictionary to JSON string

    image_link = json_to_image(json_data_for_image)

    response_data["url"] = image_link  # Add the image link to the JSON data

    # Convert the modified dictionary back into a JSON string
    modified_response = json.dumps(response_data)

    return modified_response


# Set up API key for OPENAI
api_key = os.getenv('OPENAI_API_KEY')
client = openai.OpenAI(api_key=api_key)

# json_to_image: generates an image from the description of a json file
# str (.json) -> str (image url)
def json_to_image(json_file):
    prompt = (f"""
              Generate an image of the following food: 
              {json_file}
              """)

    response = client.images.generate(
        model="dall-e-2",
        prompt=prompt,
        size="512x512",
        quality="standard",
        n=1
    )
    image_url = response.data[0].url
    return image_url

def main():
    if len(sys.argv) > 1:
        func = sys.argv[1]  # the function to call
        if func == 'generate_dish':
            json_list = json.loads(sys.argv[2])
            if (len(sys.argv) > 3 and sys.argv[3] != 'None'):
                max_calories = int(sys.argv[3])
            else:
                max_calories = None
            if (len(sys.argv) > 4 and sys.argv[4] != 'None'):
                min_protein = int(sys.argv[4])
            else:
                min_protein = None
            result = generate_dish(json_list, max_calories, min_protein)
            print(result)
        elif func == 'image_to_json':
            image_name = sys.argv[2]
            image_path = sys.argv[3]
            result = image_to_json(image_name, image_path)
            print(result)
        else:
            print("Invalid function name")
if __name__ == "__main__":
    image_url = sys.argv[1]
    ingredient_name = sys.argv[2]
    process_image(image_url, ingredient_name)

if __name__ == '__main__':
    main()

# if __name__ == '__main__':
#     json_objects = [
#     json.dumps({"ingredient_name": "yogurt", "serving_size": 170, "macronutrients": {"calories": 130, "total fat": 1.5, "saturated fat": 1, "trans fat": 0, "cholesterol": 5, "sodium": 80, "total carbohydrate": 26, "dietary fiber": 0, "total sugars": 22, "protein": 5}, "micronutrients": {"vitamin a": 200, "vitamin d": 0, "calcium": 170, "iron": 0, "potassium": 240}, "url": "https://example.com/yogurt.jpg"}),
#     json.dumps({"ingredient_name": "milk", "serving_size": 200, "macronutrients": {"calories": 100, "total fat": 2.5, "saturated fat": 1.5, "trans fat": 0, "cholesterol": 10, "sodium": 100, "total carbohydrate": 12, "dietary fiber": 0, "total sugars": 12, "protein": 8}, "micronutrients": {"vitamin a": 150, "vitamin d": 100, "calcium": 280, "iron": 0, "potassium": 300}, "url": "https://example.com/milk.jpg"})
#     ]
    
#     combined_result = generate_dish(json_objects)
#     print(combined_result)