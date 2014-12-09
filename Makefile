
all: run

build: mono/*.cs
	@mcs -debug -define:SERVER,DEBUG -sdk:4.5 -r:System.Data.dll -out:game.dll -t:library mono/*.cs

run: build
	@node lib/server.js

.PHONY: all
