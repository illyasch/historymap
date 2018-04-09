package controllers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
	"historymap/models"
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

	_, fileHeader, err := this.GetFile("file")
	if err != nil {
		this.response.SetError(models.INPUT_PARAMS_ERROR, err)
	}

	newPhotoId, err := models.CreatePhoto(this, "file", fileHeader.Filename, this.GetString("marker_id"), this.GetString("text"), "ru")

	if err == nil {
		this.response.SetSuccess()
		this.response.Data["newPhotoId"] = strconv.FormatInt(newPhotoId, 10)
	} else {
		this.response.SetError(models.DB_ERROR, err)
	}
}

func (this *PhotosController) Get() {
	defer func() {
		this.Data["json"] = this.response
		this.ServeJSON()
	}()

	lang := this.GetString(":lang")
	markerId, err := this.GetInt64(":markerid")

	if err != nil {
		this.response.SetError(models.INPUT_PARAMS_ERROR, err)
		return
	}

	photos, err := models.GetPhotosList(lang, markerId)

	if err == nil {
		this.response.SetSuccess()
		this.response.Data["markers"] = photos
	} else {
		this.response.SetError(models.DB_ERROR, err)
	}
}