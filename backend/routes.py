from app import app, db
from flask import request, jsonify
from models import Friend



# Get all friends
@app.route("/api/friends", methods=["GET"])
def get_friends():
    friends = Friend.query.all() 
    result = [friend.to_json() for friend in friends]
    return jsonify(result)


# Create a friend
@app.route("/api/friends", methods=["POST"])
def create_friend():
    try:
        data = request.json

        required_fields = ["nickname", "role", "about", "gender", "server", "rank", "discord" , "riotID" , "interest"]
        for field in required_fields:
            if field not in data or not data.get(field).strip():
                return jsonify({"error": f'Missing required field: {field}'}), 400

        nickname = data.get("nickname").strip()
        role = data.get("role").strip()
        about = data.get("about").strip()
        gender = data.get("gender").strip()
        server = data.get("server").strip()
        rank = data.get("rank").strip()
        discord = data.get("discord").strip()
        riotID = data.get("riotID").strip()
        interest = data.get("interest").strip()



        img_url = f"//Users/lorenbendavid/Desktop/LOL_Project/frontend/src/components/AvatarComponent.jsx"

        new_friend = Friend(nickname=nickname, role=role, about=about, gender=gender, img_url=img_url , 
                            server=server, rank =rank , discord = discord,riotID = riotID, interest = interest )

        db.session.add(new_friend)
        db.session.commit()

        # 🚩🚩🚩 כאן בדיוק הבעיה: החזרת אובייקט שלם עם ה־ID שלו
        return jsonify(new_friend.to_json()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# Delete a friend
@app.route("/api/friends/<int:id>", methods=["DELETE"])
def delete_friend(id):
    try:
        friend = Friend.query.get(id)
        if friend is None:
            return jsonify({"error": "Friend not found"}), 404
        
        db.session.delete(friend)
        db.session.commit()
        return jsonify({"msg": "Friend deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# Update a friend profile
@app.route("/api/friends/<int:id>", methods=["PATCH"])
def update_friend(id):
    try:
        friend = Friend.query.get(id)
        if friend is None:
            return jsonify({"error": "Friend not found"}), 404
        
        data = request.json

        friend.nickname = data.get("nickname", friend.nickname)
        friend.role = data.get("role", friend.role)
        friend.about = data.get("about", friend.about)
        friend.gender = data.get("gender", friend.gender)
        friend.server = data.get("server", friend.server)
        friend.rank = data.get("rank", friend.rank)
        friend.discord = data.get("discord", friend.discord)
        friend.riotID = data.get("riotID", friend.riotID)
        friend.interest = data.get("interest", friend.interest)

        db.session.commit()
        return jsonify(friend.to_json()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
