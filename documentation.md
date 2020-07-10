- use node.cli
```
node
require('crypto').randomBytes(64).toString('hex')
```

# mvc node mysql mysql-migrations
- backend
- la structure de dossier:

- api{
        controllers : UserController.js
        middlewares: 
        models:
    }
- database{
    migrations : 159.._create_user_table
}
- routes{
    user.js
}
- index.js
- migration.js
- router.js

# steps:
- database migration 
- add tout à bord routes, ensuite models & à la fin controllers 
    - user routes, user modele, userController
    -

# the use of mysql-migraiton:
- do : create migration.js sous la route directory
- do : config migration.js
- command : node migration.js add migration create_table_user
- return du command : 15976544..564_creat_table_user.js (i will call it create_table_user.js)
- do :config create_table_user.js (the query of up and down)
- explation of command : up: forward migration
             down : backward
- explaction of command:
    - node migration.js up : run all the pending up migrations
    - node migration.js up 2 : run 2 pending up migraitons from the last position
    - node migration.js down : run only 1 down migrations
    - node migration.js refresh : runs all down migraitons followed by all up.

# important part
- UserController.js: how db.query interactive with cb()
    
