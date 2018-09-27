import unittest
import os

from pyramid import testing
from pyramid.paster import get_appsettings


class FunctionalTests(unittest.TestCase):


    def setUp(self):
        from solidarity import main
        config_file = os.getcwd() + '/../../pytest.ini'
        settings = dict(get_appsettings(config_file, name='main'))
        app = main({}, **settings)
        request = testing.DummyRequest()
        self.config = testing.setUp(request=request)

    def test_root(self):
        self.assertTrue(True)
