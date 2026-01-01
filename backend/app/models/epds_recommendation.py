from sqlalchemy import Column, String
from app.core.database import Base

class EPDSRecommendation(Base):
    __tablename__ = "epds_recommendations"

    level = Column(String, primary_key=True)   # THIS is the PK in DB
    title = Column(String, nullable=False)
    message = Column(String, nullable=False)
    emergency_advice = Column(String, nullable=False)
