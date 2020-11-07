# ASP .NET website -ACME corporation-

## How to Start with this project

- clone the git repo
- you need to have sqlexpress on your machine or have access to sql server (newer than SQL Server 2012)
- overwrite appsettings.json ConnectionStrings's "DefaultConnection" property to your own Server, user and password
- build the project
- Update database from Command line/powershell using  "dotnet ef database update" command
- run the project

# Things to do on first run
- sign up with your email and log in
- Seed the database with example products, to do this go to {https://localhost:5001/api/seed/importproducts} you can have different port so watch out
- you can alter the example data in the Sources/MOCK_DATA.xlsx file

# Things to know

If you are not logged in then you only see the landingpage and by pressing the button you can enter the draw.
If you are logged in, you can see the tickets submitted under Draw menu, and there you can select a random winner with a button
You can also see all the products generated under ACME products

## Thank you for the read :smile:
