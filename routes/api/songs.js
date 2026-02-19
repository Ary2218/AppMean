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
// PUT - Actualizar una canción ⭐ NUEVO
router.put('/:songId', async (req, res) => {
    const {songId} = req.params;
    
    try {
        const updatedSong = await Song.findByIdAndUpdate(
            songId, 
            req.body, 
            { new: true, runValidators: true }
        );
        
        if (!updatedSong) {
            return res.status(404).json({error: 'Canción no encontrada'});
        }
        
        res.json(updatedSong);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
});

// DELETE - Eliminar una canción ⭐ NUEVO
router.delete('/:songId', async (req, res) => {
    const {songId} = req.params;
    
    try {
        const deletedSong = await Song.findByIdAndDelete(songId);
        
        if (!deletedSong) {
            return res.status(404).json({error: 'Canción no encontrada'});
        }
        
        res.json({message: 'Canción eliminada correctamente', song: deletedSong});
    } catch(error) {
        res.status(400).json({error: error.message});
    }
});

module.exports = router;