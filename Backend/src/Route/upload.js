const multer = require('multer')
const path = require('path')

const image_Path = "D:/wamp64/www/Images"

// storage engine
const storage = multer.diskStorage({
    // destination: './upload/images',
    destination: function (req, file, callback) {
        callback(null, image_Path);
    },
    filename: (req, file, callback) => {

        if (!file.originalname.match(/\.(png|jpg)$/)) {
            // upload only png and jpg format
            return callback(new Error('Please upload a Image'))
        }

        return callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }

})

const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3
    }
})

module.exports = { upload }