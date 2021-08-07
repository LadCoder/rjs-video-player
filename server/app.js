const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const thumbsupply = require('thumbsupply');

const app = express()

const videos = [
    {
        id: 0,
        thumbnail: '/video/0/poster',
        file: 'assets/grunfeld.mp4',
        duration: '3 mins',
        name: 'Sample 1'
    },
    {
        id: 1,
        thumbnail: '/video/1/poster',
        file: 'assets/grunfeld.mp4',
        duration: '4 mins',
        name: 'Sample 2'
    },
    {
        id: 2,
        thumbnail: '/video/2/poster',
        file: 'assets/grunfeld.mp4',
        duration: '2 mins',
        name: 'Sample 3'
    },
]

app.use(cors())

app.get('/video/:id/data', (req, res) => {
    const id = parseInt(req.params.id, 10)
    res.json(videos[id])
})

app.get('/videos', (req, res) => res.json(videos))

app.get('/video/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
    const path = videos[id].file
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1
        const chunksize = (end-start) + 1
        const file = fs.createReadStream(path, {start, end})
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(206, head)
        file.pipe(res)
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs.createReadStream(path).pipe(res)
    }
})

app.get('/video/:id/thumbnail', (req, res) => {
    const id = parseInt(req.params.id, 10)
    const path = videos[id].file
    thumbsupply.generateThumbnail(path)
        .then(thumb => res.sendFile(thumb))
})

app.listen(4000, () => {
    console.log('Listening on port 4000')
})