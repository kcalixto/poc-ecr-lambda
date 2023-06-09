docker:
	echo "\033[1;31m - Cleaning docker - \033[0m"
	docker rm -f puppet-azh || true
	docker image rm -f puppet-azh:latest || true

	echo "\033[1;31m - Building image - \033[0m"
	docker build --platform linux/amd64 --build-arg NODE_VERSION=18 -t puppet-azh:latest .

	echo "\033[1;31m - Running container - \033[0m"
	docker run --name puppet_azh --rm puppet-azh