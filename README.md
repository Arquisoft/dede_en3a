# dede_en3A
## https://dedeen3a.web.app/home

[![Actions Status](https://github.com/arquisoft/dede_en3a/workflows/CI%20for%20ASW2122/badge.svg)](https://github.com/arquisoft/dede_en3a/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_dede_en3a&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Arquisoft_dede_en3a)
[![codecov](https://codecov.io/gh/arquisoft/dede_en3a/branch/master/graph/badge.svg?token=VN4XG9NTRO)](https://codecov.io/gh/arquisoft/dede_en3a)
[![pages-build-deployment](https://github.com/Arquisoft/dede_en3a/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/Arquisoft/dede_en3a/actions/workflows/pages/pages-build-deployment)

<p float="left">
<img src="https://blog.wildix.com/wp-content/uploads/2020/06/react-logo.jpg" height="100">
<img src="https://miro.medium.com/max/1200/0*RbmfNyhuBb8G3LWh.png" height="100">
<img src="https://i0.wp.com/unaaldia.hispasec.com/wp-content/uploads/2020/05/firebase.png?fit=1200%2C600&ssl=1" height="100">
</p>


This project is a basic example of website using **React** with **Typescript** and serverless backend using Firebase.

## Quick start guide
<mark>In case you already have node.js and npm, make sure you update them before attempting to build the images</mark>

If you want to execute the project you will need [git](https://git-scm.com/downloads), [Node.js and npm](https://www.npmjs.com/get-npm) and [Docker](https://docs.docker.com/get-docker/). Make sure the three of them are installed in your system. Download the project with `git clone https://github.com/arquisoft/dede_0`. The fastest way to launch everything is with docker:
```bash
docker-compose up --build
```
This will create two docker images as they don't exist in your system (the webapp and the restapi) and launch a mongo container database. It will also launch Prometheus and Grafana containers to monitor the webservice. You should be able to access everything from here:
 - [Webapp - http://localhost:3000](http://localhost:3000)
 - [RestApi example call - http://localhost:5000/api/users/list](http://localhost:5000/api/users/list)
 - [RestApi raw metrics - http://localhost:5000/metrics](http://localhost:5000/metrics)
 - [Prometheus server - http://localhost:9090](http://localhost:9090)
 - [Grafana server http://localhost:9091](http://localhost:9091)
 
If you want to run it without docker. Compile and run the restapi:
```shell
cd restapi
npm install
npm start
```

Now the webapp:

```shell
cd webapp
npm install
npm start
```

You should be able to access the application in [http://localhost:3000](http://localhost:3000).

## More information
You can get more information about the respository in the other README files:
- Documentation: https://arquisoft.github.io/dede_en3a/
- Webapp: https://dedeen3a.web.app/cart
- Restapi: NO RESTAPI
