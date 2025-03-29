from app import db


class Friend(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    nickname = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    about = db.Column(db.Text(), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    server = db.Column(db.String(20),nullable=False)
    rank = db.Column(db.String(20),nullable=False)
    discord = db.Column(db.String(20),nullable=False)
    riotID = db.Column(db.String(20),nullable=False)
    interest = db.Column(db.String(100),nullable=False)
    img_url = db.Column(db.String(200), nullable=True)

    
    def to_json(self):
        return {
            "id": self.id,
            "nickname": self.nickname,
            "role": self.role,
            "about": self.about,
            "server": self.server,
            "rank": self.rank,
            "discord": self.discord,
            "riotID": self.riotID,
            "interest": self.interest,
            "gender": self.gender,
            "imgUrl": self.img_url
        }