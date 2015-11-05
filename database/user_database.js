var Sequelize = require('sequelize');

var sequelize = new Sequelize('Run_Users', 'brian', 'runs', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize.authenticate().then(function(err, data) {
  console.log('Connected with PostgreSQL Run - Run_Users');
}).catch(function(err) {
  console.log(err);
});


//User table
var users = sequelize.define('users', {
  user_id: Sequelize.INTEGER ,
  username: Sequelize.STRING,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  profilepic: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  country: Sequelize.STRING,
  sex: Sequelize.STRING,
  email: Sequelize.STRING,
  average_speed: Sequelize.STRING,
  average_distance: Sequelize.FLOAT
});

// users.sync();

//Sync User table with information from Strava, if User exists do nothing, else create new user.
var syncUsers = function(data) {
  sequelize.sync().then(function(err){
    // if(err) console.log(err);
    users.findOne({
      where: {user_id: data.id}
    })
    .then(function(user) {
        if(!user){
          users.create({
            user_id: data.id,
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            profilepic:data.profile,
            city:data.city,
            state: data.state,
            country: data.country,
            sex: data.sex,
            email: data.email,
            average_speed: '0',
            average_distance: '0'
          });
        }
      });
  });
};

var allUsers = function(data, req, res) {
  users
  .findAll({
    //  where: {
    //     user_id: {$ne: data},
    //  }
  })
  .then(function(result) {
    res.send(result);
  });
};

module.exports = {userModel: users, syncUserModel: syncUsers, findAll: allUsers};
