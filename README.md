# jsfe2018

myDREAMjob

For correct usage needed to setup locally and start the JSON server - "light backend" (npm run server). Afterwards db.json file plays the role of a backend database.

General features:
- The headhunting site based on a semantic markup the with ability to view info (incl. map, contacts, team, gallery with css-sliders), registeration, login and different rights based on the client type (user / administrator).
    - For user - ability to create a set of skills with a fluency levels and create the appropriate record in the "database" (db.json file).
    - For administrator - ability to view statistics  of registered user, including filtering, sorting, pagination and downloading the query result into csv file.
- Primitive backend with a database and authentication (passing not encoded data, storing it open etc).
- Primitive unit testing (Jest) and e2e testing (Selenium).

Further improvement:
- setup the "real" authentication with the modern security requirements (password hashing and encoding). Deployment of the "real" databases, secured and well managed;
- verifying the email address by sending the activation link to the email address when registering (SMTP server deployment). Including activation the regular email-promotion messages;
- possibility to attach CV and parse it automatically;
- adding the essence of free and paid packages and dividing all site features to free and paid (for capitalization purposes);
- development well-established unit tests and e2e-tests on the modern platforms (on Java, C# etc).
