#! /usr/bin/env node

const { spawn } = require('child_process')

const repoUrl = "https://github.com/pranavtalwar/express-api-skeleton"

const runCommand = (command, args, options=undefined) => {
    const spawned = spawn(command, args, options)
    return new Promise((resolve) => {
        spawned.stdout.on("data", data => {
            console.log(data.toString());
        });
        
        spawned.stderr.on("data", data => {
            console.log(data.toString());
        });

        spawned.on('error', (err) => {
            console.log('error:', err.message)
        })
        
        spawned.on("close", () => {
            resolve()
        });
    })
}

const folderName = process.argv[2]
if(!folderName) {
    return console.log('Please specify a directory name')
}

runCommand('git', ['clone', repoUrl, folderName])
.then(() => {
    return runCommand('rm', ['-rf', `${folderName}/.git`])
})
.then(() => {
    console.log('cloned')
    console.log('Installing dependencies...')
    return runCommand('npm',['install'], {
        cwd: process.cwd() + '/' + folderName 
    })
})
.then(() => {
    console.log('Done')
    console.log('To run')
    console.log(`cd ${folderName}`)
    console.log('npm run dev')
})




