import json
import requests


if __name__ == '__main__':
    f = open('result.txt', 'w')
    header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
    }

    r = requests.post('https://open-api.pinduoduo.com/pop/doc/category/list')
    data = json.loads(r.text)
    category_list = data['result']

    for category in category_list:
        data = {
            'id': category['id']
        }
        r = requests.post('https://open-api.pinduoduo.com/pop/doc/info/list/byCat', json.dumps(data), headers=header)
        data = json.loads(r.text)
        api_list = data['result']['docList']

        for api in api_list:
            data = {
                'id': api['id']
            }
            r = requests.post('https://open-api.pinduoduo.com/pop/doc/info/get', json.dumps(data), headers=header)
            data = json.loads(r.text)
            result = data['result']
            param_list = result['responseParamList']

            first_level_count = 0
            for param in param_list:
                if param['parentId'] == 0:
                    first_level_count += 1

            if first_level_count == 1:
                first_param = param_list[0]
                f.write(f'\'{result["scopeName"]}\' : \'{first_param["paramName"]}\',\n')
            else:
                f.write(f'\'{result["scopeName"]}\' : null,\n')

    f.close()