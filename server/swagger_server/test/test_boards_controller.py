# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.board_config import BoardConfig  # noqa: E501
from swagger_server.test import BaseTestCase


class TestBoardsController(BaseTestCase):
    """BoardsController integration test stubs"""

    def test_list_boards(self):
        """Test case for list_boards

        List the dashboards that will be displayed
        """
        response = self.client.open(
            '/benengr/dash_manager/1.0.0/boards',
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_set_boards(self):
        """Test case for set_boards

        Sets the dashboards to be displayed
        """
        boardList = BoardConfig()
        response = self.client.open(
            '/benengr/dash_manager/1.0.0/boards',
            method='POST',
            data=json.dumps(boardList),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
