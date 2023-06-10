# tennis-project

tennis-project mongo db graphql project

Tennis Project - Maria Pavlova 
This project represents a platform only for the four Grand Slam tournaments: French Open, Wimbledon, Australia Open, US Open.

Capabilities of the platform:

A user can be created, updated, get operation for a single user, get operation with pagination for all users.
A user can log in into the platform. When a user is created his password is hashed. If a user's password is updated, it is also hashed in the database.
If a user wants to delete another user he/she must have a role of an ADMIN or SUPER ADMIN.

Traditionally, a tournament from the Grand Slam can take place only in one country:
French Open (Roland Garros) in France
Wimbledon - England
Australia Open - Australia
US Open - USA

Only a user that has a role of an ADMIN or SUPER ADMIN can create, update or delete a country after he/she logs in and puts bearer token in the headers.
A user that has USER role can perform get operations. 

After a country is created a tournament can be also created.
Only a user that has a role of an ADMIN or SUPER ADMIN can create, update or delete a tournament after he/she logs in and puts bearer token in the headers.
A user that has USER role can perform get operations in order to see the present tournaments.
