# Drivelah-contactUs-RESTapis
- About:
- An endpoint is provided for admin to be used directly from the browser and when hit a CSV file will be downloaded of all users data till date:
       (http://localhost:5000/api/usersData/downloadUserData)
       Tested for half million user data.
        Implementation : 
        As the data directly being fetched from mongo takes huge time to fetch ,
        So incorporated  cache kind file system in which when user will submit the form  the data will be stored in Mongo and also in a file local to the node directory.
        Hence the file will always be latest as equal to DB and when the above '/downloadUserData' api will be hit it will get the response from the server's cached file.
        Outcome: fetch time reduces to 5-7 sec from 6-8 mins and avoids heap out of memory problems.
        
- Another endpoint is provided for admin to be used directly from the browser to browse all half million data  page wise.