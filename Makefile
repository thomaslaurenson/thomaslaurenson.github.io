.PHONY: install run build preview build_and_preview update lint lint_fix images thumbnails

install:
	npm install

run:
	npm run dev

build:
	npm run build

preview:
	npm run preview

build_and_preview:
	npm run build && npm run preview

update:
	npx npm-check -u

lint:
	npm run lint

lint_fix:
	npm run lint_fix

images:
	npm run images

thumbnails:
	npm run thumbnails
