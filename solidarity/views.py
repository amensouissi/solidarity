from pyramid.view import view_config

from .lib import config


@view_config(route_name='home', renderer='templates/layout.pt')
def home(request):
    solidarity_config = config.get_config()
    use_webpack_server = solidarity_config.get('use_webpack_server', False)
    root_url = ''
    if use_webpack_server:
    	root_url = 'http://{}:{}'.format(
    		solidarity_config.get('webpack_host', 'localhost'),
    		solidarity_config.get('webpack_port', 8081))

    return {'root_url': root_url}
