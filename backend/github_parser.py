import requests

def get_github_skills(username):

    url = f"https://api.github.com/users/{username}/repos"

    response = requests.get(url)

    repos = response.json()

    skills = set()

    for repo in repos:

        if repo["language"]:
            skills.add(repo["language"].lower())

        if repo["description"]:
            desc = repo["description"].lower()

            keywords = [
                "machine learning",
                "react",
                "node",
                "docker",
                "kubernetes",
                "tensorflow",
                "pytorch",
                "ai",
                "data science"
            ]

            for k in keywords:
                if k in desc:
                    skills.add(k)

    return list(skills)


if __name__ == "__main__":

    username = input("Enter GitHub username: ")

    skills = get_github_skills(username)

    print("Detected GitHub skills:")
    print(skills)