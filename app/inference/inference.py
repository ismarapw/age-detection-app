import tensorflow as tf
import cv2
from hpelm import ELM
import numpy as np

def probs_transform(prob):
    if (prob > 1):
        return 1

    if (prob < 0):
        return 0
    
    return prob

def get_age_probs(coord, filename):
    img = cv2.imread('app/preprocess/output/' + filename)

    x1 = coord[0]
    y1 = coord[1]
    x2 = coord[2]
    y2 = coord[3]
    img_roi = img[y1:y2, x1:x2]
    img_roi = cv2.resize(img_roi, (224,224), interpolation=cv2.INTER_AREA) / 255.
    img_roi = np.expand_dims(img_roi, axis=0)

    cnn_layer = tf.keras.models.load_model('app/inference/model/feature_extractor.h5')
    classifier = ELM(inputs=cnn_layer.output.shape[-1], outputs=8)
    classifier.load('app/inference/model/elm_classifier.pkl')

    feature = np.array(cnn_layer(img_roi))
    probs = classifier.predict(feature)[0]
    probs = list(map(probs_transform, probs))

    return np.round(probs, decimals=4)



    


