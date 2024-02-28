set dotenv-load := false

alias social := screenshots

# Replace DOMAIN with your Netlify link if our templates are not deployed yet.

DOMAIN := "https://2024.djangocon.us"
IMAGE_SIZE := "1200x630"

# IMAGE_SIZE := "1024x512"
# IMAGE_SIZE = "1400x700"

@_default:
    just --list

@bootstrap:
    python -m pip install --upgrade pip uv
    uv pip install --requirement ./bin/requirements.in
    python -m playwright install

@build:
    docker-compose build

@down:
    docker-compose down

@fmt:
    just --fmt --unstable

@lint:
    python -m pre_commit run --all-files

@lock:
    uv pip compile --output-file ./bin/requirements.txt ./bin/requirements.in

@logs *ARGS:
    docker-compose logs {{ ARGS }}

@screenshots:
    python bin/process.py generate-shots > ./shots.yml
    shot-scraper multi --no-clobber ./shots.yml

@start *ARGS:
    just up --detach {{ ARGS }}

@stop *ARGS:
    just down {{ ARGS }}

@up *ARGS:
    docker-compose up {{ ARGS }}

@test:
    bundle exec rake test

@update:
    uv pip install --requirement ./bin/requirements.in
    just lock
