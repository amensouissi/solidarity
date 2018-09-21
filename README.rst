solidarity
==========

Backend : Python, Pyramid, PostgreSql, SQLAlchemy, Graphene
Frontend: Javascript, ReactJs, Redux, Apollo, GraphQL

Getting Started for development:
--------------------------------

To run in development mode::

    cd solidarity
    python3 bootstrap.py
    bin/buildout
    cd solidarity/static
    yarn
    npm run dev
    cd ../..
    bin/pserve development.ini --reload
