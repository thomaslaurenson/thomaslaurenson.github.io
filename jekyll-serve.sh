#!/bin/bash

set -e

rm -rf _site

bundle exec jekyll server --future --incremental --host 0.0.0.0

#bundle exec jekyll server --host 0.0.0.0
#bundle exec jekyll serve --future --host 0.0.0.0
#bundle exec jekyll serve --incremental --host 0.0.0.0
#bundle exec jekyll serve --drafts --host 0.0.0.0
