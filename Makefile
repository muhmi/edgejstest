
all: run

deps.get:
	npm update

build: mono/*.cs
	@mcs -debug -define:SERVER,DEBUG -nowarn:1998 -sdk:4.5 -r:System.Data.dll -out:game.dll -t:library mono/*.cs

# npm install -g wscat
chat:
	@wscat --connect ws://localhost:8888/ws

# npm install -g websocket-benchmark
bench:
	@websocket-benchmark -h  "ws://localhost:8888/ws"

run: build
	@node lib/server.js

.PHONY: all deps.get
