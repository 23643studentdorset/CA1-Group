
## Name: Luciano Gimenez
## StdentId: 23643 

---

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

---

Release [link](https://github.com/23643studentdorset/CA1-Group/releases/tag/v1.0.2)
Video [link](https://youtu.be/L2_1wloWN8g)

---

For the scope of this project, we were asked to create an app an show the authentication and authorization on firebase, as well generate data from the accelerometer and create three screens the home where we displayed the user info and collect the data, the leaderboard where we displayed an order leaderboard using a flat list sorting based on score and a third screen were the user can update the user info and that sends an update to the Firestore DB.
We decided to develop this project using react native and expo, because of the simplicity expo gives to the developer when testing by connecting and updating the app. Also, we wanted to explore react as front-end framework to learn and practice with it. For this project we are using all the APIs services from Firebase, user Authorization/Authentication and Firestore as DB.
When we started this project, we develop the app to being able to log in with any email, and after login the user would be redirected to the home screen were the accelerometer data is being stored. At that time the app would have to DBs one to store the user info, linking the user ID from the Authentication with all the user data, and a second DB to store the accelerometer data and that info again, when you would update the data from the user it would update the user info DB. After the requirements changed and the user could only login with the student email, we started storing all the info on the same DB, but we had to apply some changes to the code in order to being able to connect it with the shared DB.
With those changes some features started to crush, and we had to change the code in order to comply with the shared leaderboard. Also, the result we obtain when testing with expo in our physical device where different with the ones we obtained visualizing the device with android studio. We did not have time to check why the app was behaving different on those 2 devices.
