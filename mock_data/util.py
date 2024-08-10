import datetime
import random
import numpy


def generate_time(start, end):
    # Parse the start and end times
    start_time = datetime.datetime.strptime(start, "%H:%M")
    end_time = datetime.datetime.strptime(end, "%H:%M")

    # Calculate the total seconds between start and end
    time_difference = (end_time - start_time).total_seconds()

    # Generate a random number of seconds within this range
    random_seconds = random.randint(0, int(time_difference))

    # Add the random seconds to the start time
    random_time = start_time + datetime.timedelta(seconds=random_seconds)

    # Return the randomized time in the same format
    return random_time.strftime("%H:%M")


def randomize_attendance_status():
    rng = numpy.random.default_rng()

    # Weight each attendance status equally
    attendance_status_weights = {
        "ON_TIME": 0.65,
        "LATE": 0.25,
        "ABSENT": 0.10
    }
    # Generate a random attendance status based on the weights
    attendance_status = rng.choice(
        list(attendance_status_weights.keys()),
        p=list(attendance_status_weights.values())
    )
    return attendance_status