import os
import importlib


if __name__ == '__main__':
    result = {}
    f = open('result.txt', 'w')

    for library in os.listdir('.'):
        if '.' not in library:
            for file in os.listdir(os.path.join(os.getcwd(), library)):
                if file.endswith('.py'):
                    name = file[:file.index('.')]

                    module = importlib.import_module(f'{library}.{name}')
                    instance = getattr(module, name)()
                    result[instance.getApiMethod()] = instance.getApiBizName()

    for key in sorted(result):
        f.write(f'\'{key}\' : \'{result[key]}\',\n')

    f.close()
