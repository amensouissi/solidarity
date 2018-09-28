solidarity
==========

**Backend:** Python, Pyramid, PostgreSql, SQLAlchemy, Graphene  

**Frontend:** Javascript, ReactJs, Redux, Apollo, GraphQL

Getting Started for development:
--------------------------------

To run in development mode::

    cd solidarity
    python3 bootstrap.py
    bin/buildout
    cd solidarity/static
    yarn install --ignore-engines
    npm run dev
    cd ../..
    bin/pserve development.ini --reload

    http://0.0.0.0:6543/

To run with docker::

    cd solidarity
    sudo docker-compose build
    sudo docker-compose -f docker-compose.yml up

    http://127.0.0.1:6543/