# Money Manager - CoinOpus 
This project is meant to provide a spending tracking and analysis tool specifically catered to university students. The application aims to help users track their income and expenses, analyze their financial data, and provide meaningful insights to users on financial management. It allows users to set target expenses and provides visual representations of income and expenses to help users gain insights into their financial habits.

# Functions (Higher Priority)
1. Create and Delete Transactions
Users can create income and expense transactions by providing details such as name, date, amount, and category. They can also delete existing transactions as needed.

2. Display Total Income and Spending
The application displays the total income and spending for a given period, both monthly and daily, allowing users to easily track their financial situation.

3. Set Target for Saving
Users can set saving goals for their expenses, helping them keep track of their savings goals and their progress.

# Functions 2.0 (Lower Priority)
1. Account Integration 
The project includes the option for users to link and sync their financial accounts, such as banks or credit cards. This feature can provide a seamless experience by automatically importing transactions.

2. Calendar View of Daily Income and Expenses
The application offers a calendar view that displays daily income and expenses, allowing users to visualize their financial activities over time.

3. Graphical Representation of Income and Expenses
Users can view graphical representations, such as charts, to gain insights into their income and expenses. These visualizations help users understand their spending patterns and make informed financial decisions.

# Tech Stack 
Frontend + Backend: React.js
The frontend and backend of the application are developed using React.js, a popular JavaScript library for building user interfaces. React.js provides a modular and efficient approach to creating interactive components, ensuring a smooth user experience.

Database: Firebase
Firebase is used as the database for this project. Firebase offers real-time data synchronization, allowing users to access their financial data across multiple devices seamlessly. It provides easy integration with other Firebase services and allows for scalable and secure data storage.

# User Guide
1. Login page
Upon opening the application, users will view the Login page. On the Login page, users are prompted to input their registered email address and the corresponding password.  Then, users can click on the Login button to log in to MoneyManager. If the login is successful, users will be directed to the Home page.
If the user wishes to change their password, the user can click on the "Forgot Password?" link and they will be directed to the Reset Password page. Else, if the user has not created an account beforehand, the user can click on the "Create Account" link and they will be directed to the Sign Up page.
  
2. Sign up page
Users are prompted to input their desired username, email address, and password. They are also prompted to fill in the confirm password input to confirm the inputted password. Then, users can click on the Create button to create a new account. If the account is successfully created, users will be directed to the Home page. Also, there is a "Login" link that will direct users to the Login page upon clicking.

3. Reset Password page
Users are prompted to input their registered email address and they can click on the "Send Email" button after. Users will then receive a link in their inputted email to change their password. Also, there is a "Create Account" link that will direct users to the Sign Up page upon clicking.

4. Navbar / Header
Users can navigate to different pages by clicking on the page name on the Header. The current page is indicated by the darker-colored text. Users can also sign out of the application by clicking on the "Signout" button on the right-most of the Header. 

5. Home page
Users will be directed to the Home page after successful user authentication. Users should be able to view their existing daily transactions every month and the total income, expenses, and balance. They can click on the left and right arrow to navigate to the previous and next month respectively. They can also create new transactions by clicking on the plus button on the bottom right side of the screen. To create transactions, users are prompted to choose one of the transaction types, income or expense. They are also prompted to input several required fields, such as transaction name, amount, and date, and choose a transaction category. Then, users can click on the Create button. Other than that, users can also delete a transaction by clicking on the "Delete" button on the transaction they wish to remove. A confirmation modal will pop up and the user should confirm it to delete the transaction.

6. Savings page

7. Insights page
Users should be able to view their current total income and expenses in a month and pie charts representing the income and expenses categorized by the transaction category. They can click on the left and right arrow to navigate to the previous and next month respectively. The figures in the pie charts will be displayed in percentages and there will be a legend for each chart that indicates the corresponding transaction category and its total amount. 

8. Profile page
Users should be able to view their username, email address, and profile picture on the Profile page. To update their profile information, users can click on the "Edit profile" button. They will be prompted to input their new username and/or email address and click on the "Save changes" button to continue the process. Other than that, they can also update their profile picture by clicking on the "Change profile picture" button. Users will be prompted to upload an image file. After the upload, they can click on the Upload button and the image upload progress will be displayed in the percentage below.
