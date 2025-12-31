import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# --------------------------------------------------
# 1. CONFIGURATION DE LA CONNEXION A POSTGRESQL
# --------------------------------------------------

DATABASE_URL = os.getenv("postgresql://postpartum_bdd_user:U85XfstEvPsJPk2ayLVBcdkBO0PQmTo0@dpg-d5afukpr0fns738as3eg-a.virginia-postgres.render.com/postpartum_bdd")  # <-- use env variable

# create_engine → crée la connexion
engine = create_engine(DATABASE_URL, echo=True)

# sessionmaker → pour créer des sessions (interaction DB)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base → classe mère des modèles SQLAlchemy
Base = declarative_base()

# --------------------------------------------------
# 2. FONCTION POUR OBTENIR UNE SESSION
# --------------------------------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
