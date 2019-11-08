import json

def load_tools():
    tools = {}
    with open('/definitions/workers.json') as json_file:
        tools = json.load(json_file)
    return tools
