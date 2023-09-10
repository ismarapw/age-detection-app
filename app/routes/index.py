from flask import render_template,request, jsonify, send_from_directory
from app import app
import os
from ..preprocess import preprocess
from ..inference import inference

@app.route("/", methods = ['GET'])
def index():
    return render_template('index.html')

@app.route("/submit", methods = ['POST'])
def predict():
    if (request.method == "POST"):
        file = request.files['image-input']
        file.save(os.path.join('app/storage/', file.filename))

        resized_img = preprocess.resize(file.filename)
        face_coord = preprocess.get_face(resized_img, file.filename)

        if (face_coord == None):
            return jsonify({
                "status" : "no face"
            })

        age_probs = inference.get_age_probs(face_coord, file.filename)
      

        return jsonify({
            "status" : "success",
            "probabilities" : age_probs.tolist(),
            "face_img" : file.filename
        })


@app.route("/download/<filename>", methods = ["GET"])
def download(filename):
    return send_from_directory('preprocess/output', filename)