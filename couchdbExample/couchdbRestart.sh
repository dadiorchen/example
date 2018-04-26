#!/bin/bash
# To kill the local CouchDB and start it again 
echo 'To kill all CouchDB progress...'
ps -ef |grep beam.smp | grep -v grep |awk '{print $2}' | xargs kill -9
sleep 1
echo 'CouchDB starting...'
nohup /Users/deanchen/soft/couchdb/bin/couchdb > /Users/deanchen/temp/couchdb.log &
echo 'CouchDB start finished!'
exit 0
