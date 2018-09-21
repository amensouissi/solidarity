from sqlalchemy import (
    Column,
    Integer,
    Text,
    )

from . import Base



class Page(Base):
    __tablename__ = 'wikipages'
    uid = Column(Integer, primary_key=True)
    title = Column(Text, unique=True)
    body = Column(Text)

