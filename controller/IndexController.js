const  path = require("path");
const fs = require("fs");
const { SuccessModel, ErrorModel } = require("../utils/resModel");

class IndexController{
    uploadFile(req, res){
        const file = req.file;
        const extname = path.extname(file.originalname);
        const filepath = file.path; /* 上传文件路径 */
        const filename = file.filename + extname; /* 文件名称 */
        try{
            fs.renameSync(filepath, path.join(path.dirname(filepath), filename));
            return res.json(new SuccessModel({path: "http:localhost:3000/upload/" + filename}, "success"));
        }catch(e){
            return res.json(new ErrorModel(e.message));
        }
    }
}

module.exports = new IndexController();