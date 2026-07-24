import multer from "multer";
const storage=multer.diskStorage({
    destination:"public/uploads/",
    filename:(req,file,cb)=>{
        const uniqueSuffix=Date.now();

        let ext=file.originalname.substring(
            file.originalname.lastIndexOf("."),
            file.originalname.length,
        
    );
    cb(null,uniqueSuffix+ext);

    },
});

const fileFilter=(req,file,cb)=>{
    if (
        !file.mimetype.includes("jpeg") &&
        !file.mimetype.includes("jpg") &&
        !file.mimetype.includes("png") 
    ) {
        cb(null,false);
        cb(new Error("Only JPG/JPEG.PNG images are Allowed"))

    }
    cb(null,true);
}
const maxSize=1024 * 1024 * 2; //2MB

export const upload=multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{ fileSize:maxSize },
});