import firebase_admin
import json
import util
import dtos
from datetime import datetime, timedelta
from firebase_admin import firestore


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
    with open("Students.json", "r") as f:
        print("Importing...")
        student = json.load(f)
        for s in student:
            student_id_list.append(s['id'])
            doc_ref.document(str(s['id'])).set(s)
        print("Done!")


def get_existing_students():
    doc_ref = db.collection(u'students')
    docs = doc_ref.stream()
    existing_students = []
    for doc in docs:
        existing_students.append(doc.to_dict()['id'])
    return existing_students


def import_students_attendance(students: list[int]):
    print("Importing attendance...")
    # Loop date range, from start date to end date
    start_date = datetime.strptime("2024-08-01", "%Y-%m-%d").date()
    end_date = datetime.strptime("2024-08-31", "%Y-%m-%d").date()

    current_date = start_date
    while current_date <= end_date:
        print(f"Importing attendance for {current_date}...")
        # Generate random time
        time_in = util.generate_time("06:00", "07:00")
        time_out = util.generate_time("13:00", "20:00")

        # Add attendance for each student
        for student_id in students:
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
            # Create attendance data class
            attendance: dtos.Attendance = dtos.Attendance(
                student=student_id,
                status=status,
                date=current_date,
                timeIn=time_in,
                timeOut=time_out,
                notes="",
            )

            # Add attendance
            doc_ref = db.collection(u'attendances').document()
            doc_ref.set(
                {
                    "student": f"/students/{attendance.student}",
                    "status": attendance.status,
                    "date":  datetime.strptime(str(attendance.date), "%Y-%m-%d"),
                    "timeIn": time_in,
                    "timeOut": time_out,
                    "notes": attendance.notes
                }
            )

        current_date += timedelta(days=1)
    print("Done!")


if __name__ == '__main__':
    main()