import json

def load_tools(file_path='/definitions/workers.json'):
    tools = {}
    with open(file_path) as json_file:
        tools = json.load(json_file)
    return tools
