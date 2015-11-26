# Koa Boilerplate

Quickly bootstrap a KoaJS application.

## Setup

**Install Host Dependencies**

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

**Build Components**

You need to run through all of these steps at least once to run the app.  Periodically, you may need to repeat steps in this section.

* Install node dependencies.
* Build infrastructure.
* Build the frontend.

```bash
$ npm install
$ docker-compose build
$ gulp build
```

**Run the Server**

Now you're ready to start the app.

```bash
$ docker-compose up
```

Now, you should be able to view the app by visiting http://localhost:3000 in your browser.

*Note:* If you get an error related to the bcrypt module, it's probably because the version that compiled on your mac is incompatible with the Linux docker container.  You can fix this by running the following.

```bash
$ docker exec koaboilerplate_web_1 npm install --force bcrypt
```

## Development

**Reload Changes**

_Frontend_

We provide a local development server with live-reloading for frontend development.  This runs outside of docker and is available at http://localhost:9000.

```bash
$ gulp dev
```

Alternatively, you can rebuild the frontend to push changes to the docker server.

```bash
$ gulp build
```

_Backend_

In development, the backend is running on nodemon.

```bash
$ docker exec koaboilerplate_web_1 touch server.js
```

**Database Migrations**

This project uses [sequelize-cli](https://github.com/sequelize/cli) for database migrations.

_Create new model and migration_

```bash
$ sequelize model:create --name=<title> --attributes="<attr>:<type>, <attr>:<type>"
```

_Seed data_

```bash
$ sequelize seed:create --name=<title>
```

_Run migrations_

```bash
$ docker exec koaboilerplate_web_1 sequelize db:migrate
$ docker exec koaboilerplate_web_1 sequelize db:migrate:undo
$ docker exec koaboilerplate_web_1 sequelize db:migrate:undo:all
```

## Testing

Run tests with mocha.

```bash
$ docker exec koaboilerplate_web_1 npm test
```

You can see debugging output during testing like this.

```bash
$ docker exec koaboilerplate_web_1 bash -c 'DEBUG=verbose npm test'
```
