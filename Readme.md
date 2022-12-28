The objective of this project is to develop a cloud connected mobile app to collect and upload accelerometer data and display a leaderboard. 
The requirements are as follows and both requirements carry equal weightage:

---
- Authenticate using Firebase1, upload data to Firestore
    - [x] Sign up using StudentID@student.dorset-college.ie (as email) and a password
    - [x] After sign up, collect and update details such as name, course, year in Firestore > StudentID, allow editing these details later
    - [x] Collect and store locally 1000 accelerometer data points
    - [x] Once 1000 data points are collected, upload to Firestore under: Users > StudentID > accelerometer_data
    - [x] Repeat 3 and 4 as long as the app is open and is in the foreground (Don't record when minimised)
- Display Leaderboard
    - [x] Retrieve accelerometer_data of all users and calculate movement score for each user
    - [x] If accelerometer_data is unavailable or not in correct format or has more than 1000 data points, show score "N/A".
    - [x] Show recycler view to display leaderboard with columns rank, name and score (use score for ranking)
    - [ ] Refresh every minute, show information: last refreshed (in time ago format), and refreshing in x seconds
    - [x] Show details of user when clicked in full screen, allow going back to leaderboard
