package controllers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
	"strings"
	"historymap/models"
	"github.com/astaxie/beego/orm"
	"strconv"
)

type PhotosController struct {
	beego.Controller
	logger *logs.BeeLogger
	response models.ApiResponse
}

func (this *PhotosController) Prepare() {
	this.logger = logs.NewLogger(CHANNEL_LEN)
	this.logger.SetLogger("console")
}

func (this *PhotosController) UploadPhoto() {
	defer func() {
		this.Data["json"] = this.response
		this.ServeJSON()
	}()

	newPhotoId, err := this.CreatePhoto("file", this.GetString("marker_id"), this.GetString("text"), "ru")

	if err == nil {
		this.response.SetSuccess()
		this.response.Data["newPhotoId"] = strconv.FormatInt(newPhotoId, 10)
	} else {
		this.response.SetError(models.DB_ERROR, err)
	}
}

func (this *PhotosController) CreatePhoto(file string, marker string, text string, lang string) (int64, error) {
	o := orm.NewOrm()

	_, fileHeader, err := this.GetFile(file)

	var fileExt string
	if err == nil {
		fileExt = getFileExtension(fileHeader.Filename)
		err = o.Begin()
	}

	var curLang models.Lang
	if err == nil {
		curLang.Code = lang
		err = o.Read(&curLang, "Code")
	}

	var curMarker models.Marker
	curMarker.Marker_id, err = strconv.ParseInt(marker, 10, 64)


	if err == nil {
		err = o.Read(&curMarker)
	}

	var newPhoto models.Photo
	if err == nil {
		newPhoto.Marker_id = curMarker.Marker_id
		newPhoto.Photo_id, err = o.Insert(&newPhoto)
	}

	this.logger.Debug("%v", newPhoto)

	newFileName := strconv.FormatInt(newPhoto.Photo_id, 10) + fileExt
	err = this.SaveToFile("file", beego.AppConfig.String("uploadDir") + newFileName)

	if err == nil {
		newPhoto.Src = newFileName
		_, err = o.Update(&newPhoto)
	}

	var newPhotoText models.PhotoText
	if err == nil {
		newPhotoText.Photo_id = newPhoto.Photo_id
		newPhotoText.Lang_id = curLang.Lang_id
		newPhotoText.About = text

		newPhotoText.Text_id, err = o.Insert(&newPhotoText)
	}

	this.logger.Debug("%v", newPhotoText)

	if err != nil {
		o.Rollback()
	} else {
		err = o.Commit()
	}

	return newPhoto.Photo_id, err
}

func getFileExtension(fileName string) string {
	parts := strings.Split(fileName, ".")

	if len(parts) > 0 {
		return "." + parts[len(parts) - 1]
	}

	return ""
}