import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# Load the same embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

def get_vector(skills):
    """
    Convert skill list into vector embedding
    """
    text = " ".join(skills)
    return model.encode(text)


def similarity_score(vec1, vec2):
    """
    Calculate cosine similarity between two users
    """
    score = cosine_similarity([vec1], [vec2])[0][0]
    return score


def complementary_score(skills_a, skills_b):
    """
    Reward different skills (complementary)
    """
    set_a = set(skills_a)
    set_b = set(skills_b)

    overlap = set_a.intersection(set_b)

    diversity = len(set_b - set_a)

    return diversity / (len(set_a.union(set_b)) + 1)


def match_users(user, candidates):

    results = []

    user_vec = get_vector(user["skills"])

    for candidate in candidates:

        cand_vec = get_vector(candidate["skills"])

        sim = similarity_score(user_vec, cand_vec)

        comp = complementary_score(user["skills"], candidate["skills"])

        final_score = (0.6 * sim) + (0.4 * comp)

        results.append({
            "name": candidate["name"],
            "score": round(final_score, 3),
            "skills": candidate["skills"]
        })

    results = sorted(results, key=lambda x: x["score"], reverse=True)

    return results


if __name__ == "__main__":

    user = {
        "name": "Alice",
        "skills": ["react", "javascript", "html", "css"]
    }

    candidates = [
        {"name": "Bob", "skills": ["python", "machine learning", "tensorflow"]},
        {"name": "Charlie", "skills": ["react", "ui", "figma"]},
        {"name": "David", "skills": ["docker", "aws", "devops"]},
        {"name": "Eva", "skills": ["node", "backend", "mongodb"]}
    ]

    matches = match_users(user, candidates)

    print("\nTop Matches:\n")

    for m in matches:
        print(m)