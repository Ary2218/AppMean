const router = require('express').Router();

const Song = require('../../models/songs.model');


router.get('/', async (req, res) => {
    try{
    const songs = await Song.find();
    res.json(songs);
    } catch(error){
        res.json({error: error.message});
    } 
});

router.get('/:songId', async (req, res) =>{
    const {songId} = req.params;

    const song = await Song.findById(songId);
    res.json(song); 

});

router.post('/', async (req, res) => {
    try {
        const newSong = new Song(req.body);
        const savedSong = await newSong.save();
        res.status(201).json(savedSong);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
});


module.exports = router;