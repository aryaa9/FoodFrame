const { spawn } = require('child_process');

function runImageToJson(image_name, image_link, callback) {
    const pythonProcess = spawn('python3', [
        'Gemini_AI.py', 
        'image_to_json', 
        image_name,
        image_link
    ]);

    let outputData = '';

    pythonProcess.stdout.on('data', (data) => {
        outputData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data.toString()}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
        if (code === 0) {
            callback(outputData);  // Call the callback with the output data
        } else {
            callback(null);  // In case of error, you might want to pass null or an error message
        }
    });
}

// Now call runImageToJson with a callback that handles the output
runImageToJson("water", "https://firebasestorage.googleapis.com/v0/b/foodframe-422304.appspot.com/o/images%2F2024-05-04T14%3A01%3A42.223Z.jpg?alt=media&token=5e8c6d52-8ea5-4090-a361-d90a68266599", (result) => {
    if (result) {
        console.log("Received result:", result);
    } else {
        console.log("Failed to get result from Python script.");
    }
});
