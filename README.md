# Age Detection Application
This is an implementation of my undergraduate thesis project where i built a website application for the age detection process utilizing combination of Convolutional Neural Network (CNN) and Extreme Learning Machine (ELM) model. You can check out how i can elaborate the model [here](https://github.com/ismarapw/new-age-classification-method). Basically, there are 8 age classes and we can predict an image containing face to the 8 age groups.  

<strong>Tech Stack Used</strong>:
1. HTML5
2. CSS3
3. Bootstrap 5
4. React JS
5. Flask
6. Tensorflow
7. OpenCV
8. Azure Web Service

# Current Limitation
1. The contained face in an image is limited to one face. If you upload an image containing multiple faces, it will only detect and predict the first face.
2. Sometimes the face is not detected properly in the image. This depends on many factors such as clarity of the background, lighting, face angle, and the distane of the face from camera.

# Local Test
I'm using python 3.11 for the server-side development and using windows 11. If you have the same environment with mine, you can simply clone this repo and inside the project you can do the following:

```bash
python -m venv env # Create env

env\Scripts\activate # Activing env

pip install -r requirements.txt # install all of the depedencies

python run.py # run the flask-server
``` 

# Snapshots
![Screenshot (5)](https://github.com/ismarapw/age-detection-app/assets/76652264/308d1277-3be5-46ac-936e-660cea0aafdc)
![Screenshot (6)](https://github.com/ismarapw/age-detection-app/assets/76652264/b66a39ad-96b2-45dc-9c34-c2b9755c3e80)
![Screenshot (7)](https://github.com/ismarapw/age-detection-app/assets/76652264/e41b743e-05a0-4bc3-998b-4346f4f0e4b2)



