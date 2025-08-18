import sys
import json
import tensorflow as tf
import numpy as np
import os

script_dir = os.path.dirname(__file__) 


IMG_SIZE = 224
MODEL_STEP1_PATH = os.path.join(script_dir, '../model/step1.h5')
MODEL_STEP2_PATH = os.path.join(script_dir, '../model/step2.h5')

CLASS_NAMES_STEP1 = ['abnormal', 'normal'] 
CLASS_NAMES_STEP2 = ['disease_intonsa', 'disease_latus', 'disease_powdery', 'temp-humid', 'unripe']

def preprocess_image(image_path):
    img = tf.keras.utils.load_img(image_path, target_size=(IMG_SIZE, IMG_SIZE))
    img_array = tf.keras.utils.img_to_array(img)
    preprocessed_array = tf.keras.applications.mobilenet_v2.preprocess_input(img_array)
    return np.expand_dims(preprocessed_array, axis=0)

def run_prediction(model_path, class_names, image_tensor):
    model = tf.keras.models.load_model(model_path)
    predictions = model.predict(image_tensor)
    scores = predictions[0]
    predicted_index = np.argmax(scores)
    predicted_class = class_names[predicted_index]
    confidence = scores[predicted_index] * 100
    
    return {
        'class': predicted_class,
        'confidence': f"{confidence:.2f}%",
        'all_scores': {name: float(score) for name, score in zip(class_names, scores)}
    }

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(json.dumps({'error': '이미지 경로가 필요합니다.'}), file=sys.stderr)
        sys.exit(1)
    
    image_file_path = sys.argv[1]

    try:
        image_tensor = preprocess_image(image_file_path)

        result_step1 = run_prediction(MODEL_STEP1_PATH, CLASS_NAMES_STEP1, image_tensor)
        
        final_result = result_step1
        final_result['source_model'] = 'step1.h5'

        if result_step1['class'] == 'abnormal':
            result_step2 = run_prediction(MODEL_STEP2_PATH, CLASS_NAMES_STEP2, image_tensor)
            final_result = result_step2
            final_result['source_model'] = 'step2.h5'

        print(json.dumps(final_result))

    except Exception as e:
        error_result = {'error': str(e)}
        print(json.dumps(error_result), file=sys.stderr)
        sys.exit(1)