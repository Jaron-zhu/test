from flask import Flask, request
import json

app = Flask(__name__, template_folder='../front-end',
            static_folder='../front-end')


@app.route('/hi')
def hi():
    return 'hi~'


# api接口前缀
apiPrefix = '/api/v1/'

##################  Staff接口  ##################


@app.route(apiPrefix + 'updateStaff', methods=['POST'])
def updateStaff():
    data = request.get_data(as_text=True)
    re = {
        'code': 0,
        'data': data,
        'message': "这是测试呀"
    }
    print("后端数据：", data)
    return json.dumps(re)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
