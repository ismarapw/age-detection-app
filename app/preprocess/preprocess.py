import cv2

def resize(img_filename):
    input_path = 'app/storage/' + img_filename

    img = cv2.imread(input_path)

    img_width = img.shape[1]
    img_height = img.shape[0]
    aspect_ratio = img_width / img_height

    resize_width = 720
    resize_height = int(resize_width / aspect_ratio)
    
    img = cv2.resize(img, (resize_width, resize_height), interpolation=cv2.INTER_AREA)

    return img


def get_face(img, filename):
    cascade_path = 'app/preprocess/haarcascade_frontalface_default.xml'
    face_cascade = cv2.CascadeClassifier(cascade_path)
    faces = face_cascade.detectMultiScale(img, 1.1, 4)

    if (len(faces) == 0):
        return

    coord = faces[0]

    x1 = int(coord[0])
    y1 = int(coord[1])
    x2 = int(x1 + coord[2])
    y2 = int(y1 + coord[3])

    cv2.rectangle(img, (x1,y1), (x2, y2), (0,255,0), 3, 1)
    cv2.imwrite('app/preprocess/output/' + filename, img)

    return [x1,y1,x2,y2]
    