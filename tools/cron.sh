#!/usr/bin/env bash
echo $1 $2
cd /home/abrikos/minter-bet

case "${1}" in
"minute" )
node server/cron.js --minute >log/minute.log.txt
;;

"minute5" )
node server/cron.js --minute5 >log/minute5.log.txt
;;

"day" )
node server/cron.js --day>>log/day.log.txt
;;

"hour" )
node server/cron.js --hour>>log/hour.log.txt
#git pull >log/pull.log
#rm package-lock.json
#npm i
#npm run build > log/build.log
;;
esac