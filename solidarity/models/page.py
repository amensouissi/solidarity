from sqlalchemy import (
    Column,
    Integer,
    Text,
    )

from . import Base



class Page(Base):
    __tablename__ = 'pages'
    type_title = 'page'
    uid = Column(Integer, primary_key=True)
    title = Column(Text, unique=True)
    body = Column(Text)

    def get_data(self):
        return {
            'id': self.uid,
            'title': self.title,
            'body': self.body
        }
