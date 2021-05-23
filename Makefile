SRCPATH := $(CURDIR)

define HELP
Build and run commands for Stockholm GatsbyJS theme.

Usage:

make build           - Build site & Lambdas for production.
make serve           - Build & serve production build locally.
make reset           - Purge cache & reinstall modules.
make clean           - Purge cache & modules.
make update          - Update npm production dependencies.
endef
export HELP

.PHONY: build serve clean update help

all help:
	@echo "$$HELP"

build:
	mkdir -p functions
	GOOS=linux
	GOARCH=amd64
	GO111MODULE=on
	GOBIN=${PWD}/functions go get ./...
	GOBIN=${PWD}/functions go install ./...

.PHONY: serve
serve:
	gatsby clean
	gatsby build
	gatsby serve

.PHONY: reset
reset:
	gatsby clean
	find . -maxdepth 1 -name "package-lock.json" -delete
	rm -rf "node_modules"
	npm i
	npm audit fix

.PHONY: update
update:
	ncu -u --dep=prod
	npm i
	npm audit fix

.PHONY: clean
clean:
	gatsby clean
	find . -name 'package-lock.json' -delete
	find . -name 'yarn.lock' -delete
	find . -wholename '.yarn' -delete
	find . -wholename '**/node_modules' -delete
