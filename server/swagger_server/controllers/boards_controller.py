import connexion
import six
import logging
import json
import ast

from swagger_server.models.board_config import BoardConfig  # noqa: E501
from swagger_server import util

print("Creating initial config")
config = BoardConfig()
config_file = "config.store"
logger = logging.getLogger()

def read_config():
    try:
        config_string = '{}'
        with open(config_file, 'r') as f:
            config_string = f.read()
        print("Config string is: {}".format(config_string))
        config = BoardConfig.from_dict(ast.literal_eval(config_string))
        print("config is {}".format(str(config)))
    except Exception as e:
        print('Exception in read_config')
        print(e)
        config = {}
    return config

def list_boards():  # noqa: E501
    """List the dashboards that will be displayed

    This shows the list of URLs that will be displayed  # noqa: E501


    :rtype: BoardConfig
    """
    
    return read_config()


def set_boards(boardList=None):  # noqa: E501
    """Sets the dashboards to be displayed

    Sets the list of boards that will be displayed.  Note that this overwrites the current list.  # noqa: E501

    :param boardList: List of boards to display
    :type boardList: dict | bytes

    :rtype: None
    """
    logger.error("\tboardList is {}".format(str(boardList)))
    to_store = boardList
    if connexion.request.is_json:
        j = connexion.request.get_json()
        to_store = j
        boardList = BoardConfig.from_dict(j)  # noqa: E501
        config = boardList
        
    with open(config_file, 'w') as f:
        print('writing to file')
        f.write(str(to_store))
    return config
