import os

from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))
with open(os.path.join(here, 'README.rst')) as f:
    README = f.read()
with open(os.path.join(here, 'CHANGES.txt')) as f:
    CHANGES = f.read()

requires = [
    'plaster_pastedeploy',
    'pyramid',
    'pyramid_chameleon',
    'pyramid_debugtoolbar',
    'psycopg2',
    'alembic',
    'waitress',
    'graphene',
    'graphql-wsgi',
    'graphene-sqlalchemy',
    'zope.sqlalchemy',
    'elasticsearch'
]

tests_require = [
    'pytest',
    'pytest-cov',
]

setup(
    name='solidarity',
    version='0.0',
    description='solidarity',
    long_description=README + '\n\n' + CHANGES,
    classifiers=[
        'Programming Language :: Python',
        'Framework :: Pyramid',
        'Topic :: Internet :: WWW/HTTP',
        'Topic :: Internet :: WWW/HTTP :: WSGI :: Application',
    ],
    author='Amen SOUISSI',
    author_email='amensouissi@ecreall.com',
    url='',
    license="AGPLv3+",
    keywords='web pyramid pylons, ReactJs',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    tests_require=requires,
    test_suite="solidarity",
    extras_require={
        'test': tests_require,
    },
    install_requires=requires,
    entry_points="""\
      [paste.app_factory]
      main = solidarity:main
      """
)

