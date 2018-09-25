FROM node:6.13.0
COPY . /root/solidarity
RUN npm install --global webpack@3.5.5

WORKDIR /root/solidarity/solidarity/static
RUN yarn install --ignore-engines
RUN npm run build

FROM python:3.6
RUN pip3 install --disable-pip-version-check --no-cache-dir setuptools==32.2.0 && pip3 uninstall -y six || true
COPY . /root/solidarity
WORKDIR /root/solidarity/solidarity/static
COPY --from=0 /root/solidarity/solidarity/static/build ./build
WORKDIR /root/solidarity

RUN python bootstrap.py
RUN bin/buildout
ENV ENV_MODE=production
CMD ["bin/pserve", "production.ini"]