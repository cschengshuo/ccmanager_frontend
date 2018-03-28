#!/bin/sh
rm -rf /deploy/distribution/*
cp -r $1/dist/* /deploy/distribution/