import unittest

from pyramid import testing


class FunctionalTests(unittest.TestCase):
    def setUp(self):
        from solidarity import main
        app = main({})

    def test_root(self):
        self.assertTrue(True)
