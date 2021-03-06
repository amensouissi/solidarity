from pyramid.config import Configurator

from sqlalchemy import engine_from_config

from .models import DBSession, Base


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine
    config = Configurator(settings=settings,
                          root_factory='solidarity.models.root.Root')
    config.include('pyramid_chameleon')
    config.include('.graphql')
    config.add_static_view(name='static', path='solidarity:static', cache_max_age=3600)
    config.add_route('home', '/')
    config.add_route('page', '/page')
    config.scan()
    return config.make_wsgi_app()
