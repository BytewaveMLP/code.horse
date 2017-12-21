default: all

pug = $(shell find . -type f -name "*.pug")
html = $(pug:%.pug=%.html)
pugc = node_modules/.bin/pug

styl = $(shell find . -type f -name "*.styl")
css = $(styl:%.styl=%.css)
stylus = node_modules/.bin/stylus

ls = $(shell find . -type f -name "*.ls")
js = $(ls:%.ls=%.js)
lsc = node_modules/.bin/lsc

.PHONY: all
all: $(html) $(css) $(js)

$(pugc):
	npm link pug pug-cli

$(stylus):
	npm link stylus

$(lsc):
	npm link livescript

$(html): %.html: %.pug $(pugc)
	$(pugc) -P < "$<" > "$@"
	@echo "--> compiled $<"

$(css): %.css: %.styl $(stylus)
	$(stylus) -p < "$<" > "$@"
	@echo "--> compiled $<"

$(js): %.js: %.ls $(lsc)
	$(lsc)  --no-header -p -b -c "$<" > "$@"
	@echo '--> compiled $<'

