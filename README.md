# Koa Boilerplate

Quickly bootstrap a KoaJS application.

## Setup

**Install Components**

The development toolchain is based on docker.
* [docker](http://docs.docker.com/engine/installation/)
* [docker-compose](https://docs.docker.com/compose/install/)

*Note:* If you're developing on OSX, you need to use [boot2docker](http://boot2docker.io/).  After you install it, follow these configuration steps.
```bash
$ boot2docker init
$ VBoxManage modifyvm "boot2docker-vm" --natpf1 "tcp-port3000,tcp,,3000,,3000";
$ boot2docker start           # <-- Do this after you reboot your computer
$ $(boot2docker shellinit)    # <-- Do this for every session
```

**Configure Environment**

The defaults in env.local are sufficient for running the app.
```bash
$ cp env.local .env
```

*Note:* OAuth will not be enabled by default.  If you want to test any functionality related to OAuth, create your own development tokens and update the environment file.
* [Facebook Developers](https://developers.facebook.com/products/ads/?)
* [Google Developers](https://developers.google.com/)

**Build the Frontend**

You need to build the frontend before you deploy.
```bash
$ bower install
$ gulp build                # <-- Do this whenever you want to see changes on the frontend
```

We've added a few extra tools, such as live reloading, to the gulp dev task.
```bash
$ gulp dev
```

**Run the Server**

Before you run the app the first time, you should the images used in testing.  You'll need to run this periodically when the infrastructure changes.  As a rule of thumb, you should run this whenever you merge code.
```bash
$ npm install
$ docker-compose build
```

Now you're ready to start the app.
```bash
$ docker-compose up
```

Now, you should be able to view the app by visiting http://localhost:3000 in your browser.

*Note:* If you get an error related to the bcrypt module, it's probably because the version that compiled on your mac is incompatible with the Linux docker container.  You can fix this by running the following.
```bash
$ docker exec koa_web_1 npm install --force bcrypt
```

## Reloading

**backend**

When you make changes on the backend that you want to make active.
```bash
$ docker exec koa_web_1 touch server.js
```

**frontend**

To view changes on the frontend, you just need to recreate the build directory.
```bash
$ gulp build
```

## Development

**Database Migrations**

If you want to make any model changes, first create a new migration using [sequelize-cli](https://github.com/sequelize/cli).
```bash
$ sequelize migration:create
```

If you want to add some seed data.
```bash
$ sequelize seed:create --name=<title>
```

When you're satisfied with your changes and want to go live.
```bash
$ docker exec koa_web_1 sequelize db:migrate
```

## Testing

Run tests with mocha.
```bash
$ docker exec koa_web_1 npm test
```

You can see debugging output during testing like this.
```bash
$ docker exec koa_web_1 bash -c 'DEBUG=verbose npm test'
```
