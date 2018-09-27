# -*- coding: utf-8 -*-
import graphene
from graphene import relay

from solidarity.models import DBSession
from solidarity.models.page import Page as SQLPage
from .page import Page

class Query(graphene.ObjectType):

    node = relay.Node.Field()
    pages = graphene.List(Page)

    def resolve_pages(self, info):  # pylint: disable=W0613
        session = DBSession()
        # TODO to remove. Only for tests
        pages = session.query(SQLPage).all()
        if not pages:
        	session.add(SQLPage(uid="1", title="Foo", body="<div>Foo body</div>"))
        	session.add(SQLPage(uid="2", title="Bar", body="<div>Bar body</div>"))
        	import transaction
        	transaction.commit()

        return session.query(SQLPage).all()


schema = graphene.Schema(query=Query)
