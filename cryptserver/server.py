from flask import Flask, jsonify, make_response, request
import redis
import random
import sys
import os



app = Flask(__name__)

redis_cli = redis.Redis(host=os.environ['REDIS_HOST'], port=6379, db=0, decode_responses=True)

@app.route('/putword', methods=['POST'])
def get_word():
    print(request.form, file=sys.stderr)
    print(request.json, file=sys.stderr)

    dict_res = {}
    dict_res['error'] = False
    dict_res['crypted'] = ''

    if 'word' not in request.json.keys():
        dict_res['error'] = True
        return jsonify(dict_res)

    dict_res['crypted'] = request.json['word'].upper()

    return jsonify(dict_res)

@app.route('/redis/saveword', methods=['POST'])
def save_word():
    dict_res = {}
    dict_res['error'] = False

    if 'word' not in request.json.keys():
        dict_res['error'] = True
        return jsonify(dict_res)
    
    redis_cli.set(request.json['word'], random.randint(1,1000))

    return jsonify(dict_res)

@app.route('/redis/getwords', methods=['POST'])
def get_words():
    dict_res = {}
    dict_res['error'] = False
    dict_res['words'] = []

    keys = redis_cli.keys()

    for k in keys:
        dict_res['words'].append({
            'id':k,
            'data':redis_cli.get(k)
            })

    return jsonify(dict_res)


@app.route('/redis/clearwords', methods=['POST'])
def clear_words():
    print(redis_cli.keys('*'), file=sys.stderr)
    dict_keys = redis_cli.keys('*')

    for k in dict_keys:
        redis_cli.delete(k)

    return jsonify({'error':False})



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)

