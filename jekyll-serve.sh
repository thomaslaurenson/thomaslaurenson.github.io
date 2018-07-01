#!/bin/bash

set -e

rm -rf _site

bundle exec jekyll serve --host 0.0.0.0
#bundle exec jekyll serve --incremental --host 0.0.0.0
#bundle exec jekyll serve --drafts --host 0.0.0.0
