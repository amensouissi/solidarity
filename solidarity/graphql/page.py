# -*- coding: utf-8 -*-
import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType

from solidarity.models.page import Page as SQLPage


class Page(SQLAlchemyObjectType):

    class Meta:
        model = SQLPage
        interfaces = (relay.Node,)
        only_fields = ('uid',)

    title = graphene.String()
    body = graphene.String()