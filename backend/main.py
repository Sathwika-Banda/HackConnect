
from resume_parser import parse_resume
from github_parser import get_github_skills
from sentence_transformers import SentenceTransformer
from firestore_db import save_user


# load embedding model
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")


# -----------------------------------
# convert google drive link
# -----------------------------------
def convert_drive_link(url):

    if "drive.google.com" in url:

        if "/file/d/" in url:
            file_id = url.split("/file/d/")[1].split("/")[0]
            return f"https://drive.google.com/uc?export=download&id={file_id}"

        if "uc?export=download&id=" in url:
            return url

    return url


# -----------------------------------
# rank skills (resume + github)
# -----------------------------------
def rank_skills(resume_skills, github_skills):

    score = {}

    # resume weight
    for skill in resume_skills:
        score[skill] = score.get(skill, 0) + 2

    # github weight
    for skill in github_skills:
        score[skill] = score.get(skill, 0) + 3

    ranked = sorted(score.items(), key=lambda x: x[1], reverse=True)

    top_skills = [skill[0] for skill in ranked[:4]]

    return top_skills


# -----------------------------------
# generate vector embedding
# -----------------------------------
def generate_vector(skills):

    text = " ".join(skills)

    vector = embedding_model.encode(text)

    return vector


# -----------------------------------
# main program
# -----------------------------------
def main():

    print("\n==============================")
    print(" HackConnect AI Skill Analyzer ")
    print("==============================\n")

    print("Paste any Google Drive resume link")
    print("Example:")
    print("https://drive.google.com/file/d/FILE_ID/view?usp=sharing\n")

    resume_link = input("Enter resume link: ")

    resume_link = convert_drive_link(resume_link)

    github_username = input("Enter GitHub username: ")

    user_id = input("Enter user ID: ")

    email = input("Enter email: ")

    print("\nAnalyzing resume...\n")

    resume_skills, _ = parse_resume(resume_link)

    print("Resume skills detected:")
    print(resume_skills)

    print("\nAnalyzing GitHub profile...\n")

    github_skills = get_github_skills(github_username)

    print("GitHub skills detected:")
    print(github_skills)

    # select strongest skills
    top_skills = rank_skills(resume_skills, github_skills)

    print("\nTop 4 strongest skills:")
    print(top_skills)

    # generate vector
    vector = generate_vector(top_skills)

    print("\nVector generated")

    # prepare firestore data
    user_data = {
        "name": user_id,
        "email": email,
        "github": github_username,
        "skills": top_skills,
        "vector": vector.tolist()
    }

    # save to firestore
    save_user(user_id, user_data)

    print("\nUser successfully stored in Firestore!")

    print("\nVector length:", len(vector))


# -----------------------------------
if __name__ == "__main__":
    main()