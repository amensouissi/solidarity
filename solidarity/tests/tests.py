import unittest
import os
import transaction

from pyramid import testing
from pyramid.paster import get_appsettings

from solidarity.models import DBSession
from solidarity.models.page import Page

class FunctionalTests(unittest.TestCase):


    def setUp(self):
        from solidarity import main
        is_travis = 'TRAVIS' in os.environ
        config_file_name = (is_travis and 'travis') or 'pytest'
        config_file = os.getcwd() + '/../../{}.ini'.format(config_file_name)
        settings = dict(get_appsettings(config_file, name='main'))
        app = main({}, **settings)
        request = testing.DummyRequest()
        self.config = testing.setUp(request=request)

    def test_add_page(self):
        session = DBSession()
        session.add(Page(uid="123", title="Foo", body="<div>Foo body</div>"))
        transaction.commit()
        my_page = session.query(Page).filter(Page.uid =="123").first()
        self.assertTrue(my_page is not None)
        session.delete(my_page)
        transaction.commit()
        my_page = session.query(Page).filter(Page.uid =="123").first()
        self.assertTrue(my_page is None)
        session.close()
