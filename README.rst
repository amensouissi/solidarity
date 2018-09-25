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

    http://0.0.0.0:6543/

To run with docker::

    cd solidarity
    docker build -t solidarity_app .
    docker run -d -p 127.0.0.1:6543:6543 solidarity_app

    http://127.0.0.1:6543/