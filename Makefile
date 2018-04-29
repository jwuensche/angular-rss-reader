dev:
	ng serve

build:
	ng build

docker:
	ng build
	sudo docker build -t hub-client -f Dockerfile .

run:
	@echo Starting container on port 4242
	sudo docker run -p 4242:80 hub-client:latest
