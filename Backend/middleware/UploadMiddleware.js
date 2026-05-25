const multer = require("multer");

//consfigure storage for multer 
const storage = multer.diskStorage({
    destination :(req,file,cd)=>{
        cd(null,'utils/uploads/');
    },
    filename:(req,file,cd)=>{
        cd(null,`${Date.now()}-${file.originalname}`);
    },
});

const fileFilter = (req,file,cd)=>{
    const allowedTypes = ["image/jpeg","image/png","image/jpg"];
    if(allowedTypes.includes(file.mimetype)){
        cd(null,true);
    }else{
        cd(new Error("Invalid File "));
    }
}

const upload = multer({ storage , fileFilter });

module.exports = upload;