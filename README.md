# Examplar


Examplar is a platform that allow students to work 
on solutions for past exam papers collaboratively. 


### Stack 
Examplar is built using the following: 
* [React](https://github.com/facebook/react)
* [React Router](https://github.com/ReactTraining/react-router)
* [Axios](https://github.com/axios/axios)
* [Ant Design](https://github.com/ant-design/ant-design)
* [Express](https://github.com/expressjs/express)
* [MySQL](https://www.mysql.com/)
* [Mysql2](https://github.com/brianmario/mysql2)


### Installation
Use the package manager [npm](https://www.npmjs.com/get-npm) to install Examplar. 
```bash
$ cd examplar
$ npm install
$ sudo apt-get update 
$ sudo apt-get install mysql-server
$ sudo mysql -u root
  mysql> GRANT ALL PRIVILEGES ON *.* TO 'examplar'@'localhost' IDENTIFIED BY 'password';
  mysql> exit
$ sudo mysql -u examplar -p < database/setup.sql # Password is 'password'
$ node database/universitySetup.js
$ npm start
```

