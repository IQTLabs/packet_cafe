import os

from app.helpers import load_tools

cur_dir = os.path.dirname(os.path.realpath(__file__))

def test_load_tools():
	test_data_dir = os.path.join(cur_dir, 'test_data/workers.json')
	tools = load_tools(test_data_dir)
	print(f'{tools}')
	assert tools is not None
	assert len(tools['workers'])==2