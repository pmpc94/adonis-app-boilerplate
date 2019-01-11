'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

// import('@adonisjs/lucid/src/Factory')}
const Factory = use('Factory');
const User = use('App/Models/User');
const Config = use('Config');

class UserSeeder {
  async run () {
    //create the Master Users
    const vendor = await User.create({
      firstName: 'Pedro',
      lastName: 'Carolina',
      email: 'pedro.carolina@polygon.pt',
      password: Config.get('database.password'),
      role: 'vendor'
    });

    const customer = await User.create({
      firstName: 'Pedro',
      lastName: 'Carolina',
      email: 'pmpcwork@hotmail.com',
      password: Config.get('database.password'),
      role: 'customer'
    });

    await Factory.model('App/Models/User').createMany(99);
  }
}

module.exports = UserSeeder
