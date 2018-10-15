import logging
from sqlalchemy.orm import with_polymorphic
from sqlalchemy.orm import joinedload

from solidarity.lib import config
from .changes import get_changes
from .utils import delete_index, create_index_and_mapping
from .settings import get_index_settings
from . import indexing_active


def reindex_in_elasticsearch(contents):
    changes = get_changes()
    for content in contents:
        changes.index_content(content)
        yield content


def intermediate_commit(contents):
    logger = logging.getLogger('solidarity')
    count = 0
    changes = get_changes()
    for content in contents:
        count += 1
        if count % 100 == 0:
            logger.info('{0} items read'.format(count))
        if count % 500 == 0:
            #transaction.commit()
            changes.tpc_finish(None)
            logger.info('{0} items indexed'.format(count))
        yield content

    #we can't do a real commit, we got DetachedInstanceError
    #transaction.commit()
    changes.tpc_finish(None)
    logger.info('{0} items indexed'.format(count))


def get_indexable_contents(session):
    from solidarity.models.page import Page

    query = session.query(Page )
    for page in query:
        yield page


def reindex_content(content, action='update'):
    """Index, reindex or unindex content. This function is called
    by the after_insert/update/delete sqlalchemy events.
    """
    from solidarity.models.page import Page

    if not indexing_active():
        return

    indexed_contents = (Page, )
    changes = get_changes()
    if action == 'delete' and isinstance(content, indexed_contents):
        changes.unindex_content(content)
    elif isinstance(content, Page):
        changes.index_content(content)


def batch_reindex_elasticsearch(session):
    for content in intermediate_commit(
            reindex_in_elasticsearch(
                get_indexable_contents(session)
            )
        ):
        # consume generator
        pass


def reindex_all_contents(session, delete=True):
    if delete:
        settings = get_index_settings(config)
        index_name = settings['index_name']
        delete_index(index_name)
        create_index_and_mapping(index_name)

    batch_reindex_elasticsearch(session)
