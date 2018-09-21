from pyramid.view import view_config
from pyramid.request import Response
from graphql_wsgi import graphql_wsgi

from solidarity.graphql.schema import schema
# Only allow POST+OPTIONS (query may be GET, but mutations should always be a POST,
# but there is no such check for now in graphql-wsgi)
@view_config(
    request_method='OPTIONS',
    route_name='graphql'
)
@view_config(
    request_method='POST',
    route_name='graphql',
    renderer='json'
)
def graphql_api(request):
    if request.method == 'OPTIONS':
        response = Response(status=200, body=b'')
        response.headerlist = []  # we have to reset headerlist
        response.headerlist.extend(
            (
                ('Access-Control-Allow-Origin', '*'),
                ('Access-Control-Allow-Headers', 'Content-Type'),
            )
        )
    else:
        solver = graphql_wsgi(schema)
        response = solver(request)
        response.headerlist.append(
            ('Access-Control-Allow-Origin', '*')
        )

    return response
