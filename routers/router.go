package routers

import (
	"historymap/controllers"
	"github.com/astaxie/beego"
)

func init() {
    beego.Router("/", &controllers.MainController{})
	beego.Router("/bgimages", &controllers.BgImagesController{})
	beego.Router("/:lang/markers/list", &controllers.MarkersController{})
	beego.Router("/markers/create", &controllers.MarkersController{},"post:CreateMarker")
	beego.Router("/photos/upload", &controllers.PhotosController{},"post:UploadPhoto")
	beego.Router("/:lang/photos/list/:markerid", &controllers.PhotosController{})
}