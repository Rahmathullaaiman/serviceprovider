const words = require('../Modal/Descriptionschema')

exports.descriptions = async (req, res) => {
    const { title, description } = req.body;
    const image = req.file.filename;
    
    try {
        const newDescription = new words({
            title,
            image,
            description
        });
        await newDescription.save();
        res.status(200).json(newDescription);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Failed to create description' });
    }
};



exports.getDescriptions = async (req, res) => {
    try {
        const descriptions = await words.find();
        
        if (descriptions.length === 0) {
            return res.status(404).json({ error: 'No descriptions found' });
        }

        res.status(200).json(descriptions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve descriptions' });
    }
};