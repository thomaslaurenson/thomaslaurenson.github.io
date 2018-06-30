FROM jekyll/jekyll:latest  
MAINTAINER Thomas Laurenson <thomas@thomaslaurenson.com>

# Install Jekyll
RUN gem install bundler jekyll

# Install nokogiri separately because it's special
RUN gem install nokogiri -v 1.6.7.2 -- --use-system-libraries

# Copy the Gemfile and Gemfile.lock into the image and run bundle install in a
# way that will be cached
WORKDIR /tmp
ADD Gemfile Gemfile
ADD Gemfile.lock Gemfile.lock
RUN bundle install

# Copy source
RUN mkdir -p /src
VOLUME ["/src"]
WORKDIR /src
ADD . /src

# Jekyll runs on port 4000 by default
EXPOSE 4000

# Run jekyll serve
CMD ["./jekyll-serve-docker.sh"]