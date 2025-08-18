import sys
import json
import tensorflow as tf
import numpy as np

# --- 설정값 ---
IMG_SIZE = 224
# 모델 경로 (NestJS 프로젝트 루트 기준)
MODEL_STEP1_PATH = '../model/step1.h5'
MODEL_STEP2_PATH = '../model/step2.h5' # step2.h5 모델 경로도 지정

# 각 모델의 클래스 이름 (실제 클래스 순서에 맞게 수정해야 합니다)
CLASS_NAMES_STEP1 = ['abnormal', 'normal'] 
CLASS_NAMES_STEP2 = ['disease_intonsa', 'disease_latus', 'disease_powdery', 'temp-humid', 'unripe'] # 예시 클래스 이름

def preprocess_image(image_path):
    """이미지 파일을 읽고 모델 입력에 맞게 전처리하는 함수"""
    img = tf.keras.utils.load_img(image_path, target_size=(IMG_SIZE, IMG_SIZE))
    img_array = tf.keras.utils.img_to_array(img)
    # 학습 시 사용했던 전처리 방식과 동일하게 적용 (예: MobileNetV2)
    preprocessed_array = tf.keras.applications.mobilenet_v2.preprocess_input(img_array)
    return np.expand_dims(preprocessed_array, axis=0)

def run_prediction(model_path, class_names, image_tensor):
    """주어진 모델로 예측을 수행하고 결과를 반환하는 함수"""
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
        # 1. 이미지 전처리
        image_tensor = preprocess_image(image_file_path)

        # 2. step1 모델로 1차 예측
        result_step1 = run_prediction(MODEL_STEP1_PATH, CLASS_NAMES_STEP1, image_tensor)
        
        final_result = result_step1
        final_result['source_model'] = 'step1.h5'

        # 3. 1차 예측 결과가 'abnormal'이면 step2 모델로 2차 예측
        if result_step1['class'] == 'abnormal':
            result_step2 = run_prediction(MODEL_STEP2_PATH, CLASS_NAMES_STEP2, image_tensor)
            final_result = result_step2
            final_result['source_model'] = 'step2.h5'

        # 4. 최종 결과를 JSON으로 출력
        print(json.dumps(final_result))

    except Exception as e:
        error_result = {'error': str(e)}
        print(json.dumps(error_result), file=sys.stderr)
        sys.exit(1)