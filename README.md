![Desktop](https://nimbusweb.me/box/attachment/5727653/uvb06zwdwpzzr8yzp283/6hxErLyUcdhfxcFq/screenshot-nimbus-capture-2021.06.25-22_05_24.png "Desktop")

![Desktop - Login](https://nimbusweb.me/box/attachment/5727663/iy0glrob3gxlm5nt2t8i/d59HQrzF4vO6nPqz/screenshot-nimbus-capture-2021.06.25-22_17_19.png "Desktop - Login")

## About
- LetMeAsk is an application developed during Next Level Week #6 ; LetMeAsk is a open source Q&A app. Developed with react js and firebase;

## Getting started

- git clone https://github.com/hfmiguel/nlw-together-letmeask

### Docker
 - This repository contain a Dockerfile to build the aplication in docker containers. To start the project  , you need run:
    - **docker build . && docker-compose up -d**
    - This command will start a docker container with name: **reactjs-nlwt-2021**
    - To access the container , you have to run : **docker exec -it reactjs-nlwt-2021 bash** . You will start on **/opt** folder
	  - If you want SSL , you can run **./generateSSL.sh**  , by default  , the script receive localhost like domain ( not tested ). If you use a domain , replace every occurrence from **localhost** to **your domain** at **./generateSSL.sh** file.
	
### Starting the project

- Access the folder:
   -  cd letmeask

- Install the dependencies:
   -  yarn

- Start the server:
   -  yarn start
   - The server will start at port 3000

 - You can access the app on browser by : http://localhost:30000 or by your domain;


## Contribute
 - clone the repo at https://github.com/hfmiguel/nlw-together-letmeask
- Create a branch with your feature: git checkout -b my-feature;
- Commit your changes: git commit -m 'feat | my new feature';
- Push to your branch: git push origin my-feature.
- By Henrique Felix