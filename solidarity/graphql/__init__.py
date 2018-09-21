"""The module containing all graphql schemas, mutations, views, configs"""


def includeme(config):
    config.add_route('graphql', '/graphql')
    config.add_route('graphiql', '/graphiql')
    # TODO protect graphiql by a permission
    config.add_view(route_name='graphiql', renderer='templates/graphiql.pt')
    config.add_static_view('graphiql',
                           'solidarity:graphql/build')
    config.scan()