# Live Website Link
[here](https://todo-deploy-4hf7.onrender.com/)
# features
This todo list provides the crud working, along with encryption and jwt authentication,
# installation
1. just clone the repository
2. to install dependencies following commands on cmd
   ```
   cd client
   npm install
   cd ../server
   npm install
   ```
3. To run the project You will need to create a .env file inside server folder, after that you need to add following: 
a. localhost port as PORT
b. mongodb url(you will need to add url to a database) as MONGO_URL
c. jwt private key as JWT_PRIVATE
d. bcrypt salted rounds as BCRYPT_SALT
4. now just open two different terminals and add 2 of the commands: 

   server: 
   ```
   cd server
   npm start
   ```
   client: 
   ```
   cd client
   npm start
   ```

# Screenshots
login page: 
![image](https://github.com/user-attachments/assets/d33d38f6-9fdb-40a8-9bdb-38d3b408b8c7)
Signup Page: 
![image](https://github.com/user-attachments/assets/ed6820db-9d98-4de5-ad4a-c340bd2a2bc7)
Todo List page: 
![image](https://github.com/user-attachments/assets/a6f542f6-d2e4-441e-a78a-87cf420a4cb6)
Profile page:
![image](https://github.com/user-attachments/assets/97855967-7771-47f7-b7c7-37361e1526ce)


