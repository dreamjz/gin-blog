#!/usr/bin/env sh

set -e

yellowFront='\e[33m'
redFront='\e[31m'
greenFront='\e[32m'
restoe='\e[0m'

echo -e $yellowFront'Start Deploy'$restoe

    yarn run build:prod
    distPath='dist'
    appPath=$HOME/MyDockerApps/blog-app/app/data
    echo -e $greenFront' Deploying resources ...'$restoe
        if [[ -d  $appPath/dist ]]
        then
            echo -e $redFront'  Deleting exists resources ...'$restoe
            rm -rf $appPath/dist
        fi
        cp -r $distPath $appPath
    echo -e $greenFront' Restart' `docker restart app-nginx`$restoe

echo -e $yellowFront'Deploy Done'$restoe