dev:
	ng serve

build:
	ng build

docker:
	sudo docker build -t hub-client -f Dockerfile .

run:
	sudo docker run -p 4242:80 hub-client:latest
	echo hosting docker on port 4242
