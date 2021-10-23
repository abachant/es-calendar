#!/bin/bash
set -e

set /bin/bash -c ". ${WORKDIR}/backend/config/${ENVIRONMENT}/values.env && $(echo $@)"

if [[ ${MODE} == "local" ]]
then
  set fixuid -q "$@"
fi

set -- tini -- "$@"

exec "$@"
