from flask import Flask, request, jsonify
import os
from Gemini_AI import generate_dish, image_to_json

app = Flask(__name__)

@app.route('/upload_image_info', methods=['POST'])
def upload_image_info():
    data = request.json
    print(data)
    image_url = data['image_url']
    ingredient_name = data['ingredient_name']
    # Process the data or store it
    print([image_url, ingredient_name])
    return jsonify({'status': 'success', 'message': 'Data received'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='192.168.37.35', port=int(os.environ.get('PORT', 3000)))
