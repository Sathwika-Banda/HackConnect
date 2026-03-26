import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("hackconnect-a7bfa-firebase-adminsdk-fbsvc-19e2011492.json")
firebase_admin.initialize_app(cred)

db = firestore.client()


def save_user(user_id, data):
    db.collection("users").document(user_id).set(data)


def get_users():
    docs = db.collection("users").stream()
    users = []

    for doc in docs:
        users.append(doc.to_dict())

    return users