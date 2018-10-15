from collections import defaultdict

from elasticsearch.client import Elasticsearch

from solidarity.lib import config
from .settings import get_index_settings, MAPPINGS


_es = None


def connect():
    global _es
    if _es is None:
        port = config.get('elasticsearch_port', '9200')
        server = config.get('elasticsearch_host', 'localhost') + ':' + port
        auth = config.get('elastic_search_basic_auth', None)
        _es = Elasticsearch(server, **{'http_auth': a for a in (auth,) if a})
    return _es


def create_index(index_name):
    """Create the index and return connection.
    """
    es = connect()
    settings = get_index_settings(config)['index_settings']
    exists = es.indices.exists(index_name)
    if not exists:
        es.indices.create(index=index_name, body={'settings': settings})

    return es


def create_index_and_mapping(index_name):
    """Create the index, put mapping for each doc types.
    """
    es = create_index(index_name)
    for doc_type, mapping in MAPPINGS.items():
        es.indices.put_mapping(
                index=index_name,
                doc_type=doc_type,
                body=mapping
            )


def delete_index(index_name):
    es = connect()
    return es.indices.delete(index_name, ignore=[400, 404])


def get_data(content):
    """Return uid, dict of fields we want to index,
    return None if we don't index."""
    from solidarity.models.page import Page
    if isinstance(content, Page):
        data = content.get_data()
        return get_uid(content), content.get_data()

    return None, None


def get_uid(content):
    """Return a global unique identifier"""
    return '{}:{}'.format(content.type_title, content.uid)


def get_doc_type_from_uid(uid):
    """Return doc_type from the uid."""
    return uid.split(':')[0]
