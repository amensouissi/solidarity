# -*- coding: utf-8 -*-
import graphene
from graphene import relay


class Query(graphene.ObjectType):

    node = relay.Node.Field()
    comment = graphene.String()

    def resolve_comment(self, info):  # pylint: disable=W0613
        return "Hello from the server."        


schema = graphene.Schema(query=Query)
