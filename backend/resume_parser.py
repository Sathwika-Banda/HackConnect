import os
import requests
from pdf2image import convert_from_path
import pytesseract
from sentence_transformers import SentenceTransformer

embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

def download_file(url, filename):

    response = requests.get(url)

    with open(filename, "wb") as f:
        f.write(response.content)

    return filename


def pdf_to_images(pdf_path):

    images = convert_from_path(pdf_path)

    paths = []

    for i, img in enumerate(images):

        path = f"page_{i}.png"

        img.save(path)

        paths.append(path)

    return paths


def extract_text_from_image(image_path):

    text = pytesseract.image_to_string(image_path)

    return text


def extract_skills(text):

    skill_keywords = [
    "python", "java", "c", "c++", "javascript", "typescript", "go", "rust",
    "kotlin", "swift", "ruby", "php", "scala", "r", "matlab", "bash",

    "html", "css", "sass", "tailwind", "bootstrap",
    "react", "next.js", "vue", "nuxt", "angular",
    "redux", "zustand", "webpack", "vite", "three.js", "webgl",

    "node.js", "express", "fastapi", "django", "flask",
    "spring boot", "asp.net", "laravel",
    "graphql", "rest api", "grpc",

    "mysql", "postgresql", "mongodb", "firebase", "firestore",
    "redis", "sqlite", "oracle", "cassandra", "dynamodb", "supabase",

    "docker", "kubernetes", "terraform",
    "aws", "azure", "gcp",
    "nginx", "ci/cd", "github actions", "jenkins", "ansible",

    "machine learning", "deep learning", "nlp", "computer vision",
    "transformers", "llm",
    "pytorch", "tensorflow", "keras", "scikit-learn", "xgboost",
    "pandas", "numpy", "matplotlib", "seaborn",
    "data analysis", "data science",

    "android", "ios", "react native", "flutter", "swiftui",
    "kotlin multiplatform",

    "blockchain", "ethereum", "solidity", "web3.js",
    "smart contracts", "hardhat", "truffle",

    "cybersecurity", "ethical hacking", "penetration testing",
    "network security", "cryptography", "owasp",

    "git", "github", "gitlab", "linux", "bash scripting",
    "figma", "postman", "jira", "notion", "slack",

    "ui/ux", "design systems",

    "leadership", "communication", "teamwork",
    "problem solving", "time management", "adaptability"
]


    found = []

    for skill in skill_keywords:

        if skill.lower() in text.lower():
            found.append(skill)

    return found


def parse_resume(resume_link):

    file_name = "resume.pdf"

    download_file(resume_link,file_name)

    images = pdf_to_images(file_name)

    full_text = ""

    for img in images:

        full_text += extract_text_from_image(img)

    skills = extract_skills(full_text)

    vector = embedding_model.encode(" ".join(skills))

    os.remove(file_name)

    for img in images:
        os.remove(img)

    return skills, vector


if __name__ == "__main__":

    link = input("Enter resume link: ")

    skills, vector = parse_resume(link)

    print("\nExtracted skills:")
    print(skills)

    print("\nVector:")
    print(vector)