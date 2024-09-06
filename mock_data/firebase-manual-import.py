from random import random

import firebase_admin
import json
import util
import numpy
import faker
from datetime import datetime, timedelta
from firebase_admin import firestore

from dtos import Guardian

rng = numpy.random.default_rng()


def get_firebase_app() -> object:
    cred = firebase_admin.credentials.Certificate(
        "/home/nytri/Documents/ams.json"
    )
    firebase_app = firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://attendance-management-sy-4402a.firebaseio.com'
    })
    return firebase_app


app = get_firebase_app()
db = firestore.client(app)


def get_grade_levels():
    return db.collection(u'grade-levels').stream()


def get_strands():
    return db.collection(u'strands').stream()


def get_classes():
    return db.collection(u'classes').stream()


def main():
    print("Acquiring credentials...")
    print("Acquiring database reference...")
    doc_ref = db.collection(u'students')
    prompt = input("Do you want to import students? (y/n): ")
    if prompt == "n":
        students = get_existing_students()
        import_students_attendance(students)
        return
    print("Opening JSON file...")
    student_id_list: list[int] = []
    grade_level_list: list[int] = []
    strand_list: list[int] = []
    class_list: list[int] = []
    # Get the list of grade levels
    for grade_level in get_grade_levels():
        grade_level_list.append(grade_level.id)

    # Get the list of classes
    for class_ in get_classes():
        class_list.append(class_.id)

    # Get strand list
    for strand in get_strands():
        strand_list.append(strand.id)

    with open("Students.json", "r") as f:
        print("Importing...")
        student = json.load(f)

        for s in student:
            # Generate a random guardian for the student
            db.collection(u'guardians').document(str(s['id'])).set(generate_random_guardian().dict())
            student_id_list.append(s['id'])
            s["guardian"] = get_guardian_ref(s["id"])
            s["gradeLevel"] = get_grade_level_ref(rng.choice(grade_level_list))
            s["classroom"] = get_class_ref(rng.choice(class_list))
            s["strand"] = get_class_ref(rng.choice(strand_list))
            s["sex"] = s["sex"].upper()
            doc_ref.document(str(s['id'])).set(s)
        print("Done!")


def get_guardian_ref(guardian_id):
    return db.collection(u'guardians').document(str(guardian_id))

def get_class_ref(class_id):
    return db.collection(u'classes').document(class_id)


def get_grade_level_ref(grade_level_id):
    return db.collection(u'grade-levels').document(grade_level_id)


def get_existing_students():
    doc_ref = db.collection(u'students')
    docs = doc_ref.stream()
    existing_students = []
    for doc in docs:
        existing_students.append(doc.to_dict()['id'])
    return existing_students


def generate_random_guardian() -> Guardian:
    generator = faker.Faker()
    return Guardian(
        fullName=generator.name(),
        contactNumber=generator.phone_number(),
    )


def import_students_attendance(students: list[int]):
    print("Importing attendance...")
    # Loop date range, from start date to end date
    start_date = datetime.strptime("2024-09-1", "%Y-%m-%d").date()
    end_date = datetime.strptime("2024-12-31", "%Y-%m-%d").date()

    current_date = start_date
    batch = db.batch()
    count = 0
    while current_date <= end_date:
        if count <= 100:
            batch.commit()
            count = 0
        print(f"Importing attendance for {current_date}...")
        # Generate random time
        time_in = util.generate_time("06:00", "07:00")
        time_out = util.generate_time("12:30", "16:00")

        # Add attendance for each student
        for student_id in students:
            # Get Student Reference
            student_ref = db.collection(u'students').document(str(student_id))
            student_obj = student_ref.get().to_dict()
            class_ref = student_obj["classroom"]

            # Select attendance status randomly
            status = util.randomize_attendance_status()

            if status == "ABSENT":
                time_in = None
                time_out = None
            elif status == "ON_TIME":
                time_in = util.generate_time("06:00", "07:00")
                time_out = util.generate_time("13:00", "16:00")
            elif status == "LATE":
                time_in = util.generate_time("07:01", "08:00")
                time_out = util.generate_time("13:00", "16:00")

            # Add attendance
            batch.set(
                db.collection(u'attendances').document(),
                {
                    "studentObj": student_obj,
                    "student": student_ref,
                    "status": status,
                    "date": datetime.strptime(str(current_date), "%Y-%m-%d"),
                    "timeIn": time_in,
                    "timeOut": time_out,
                    "class": class_ref,
                    "notes": faker.Faker().text()
                }
            )

        print(f"Done for {current_date}.")
        current_date += timedelta(days=1)
    # Save all changes
    batch.commit()
    print("Done!")


if __name__ == '__main__':
    main()
