package controllers

import (
	"github.com/astaxie/beego"
	_ "github.com/go-sql-driver/mysql"
	"encoding/json"
	"historymap/models"
	"github.com/astaxie/beego/logs"
	"strconv"
)

const CHANNEL_LEN = 10000

type MarkersController struct {
	beego.Controller
	logger *logs.BeeLogger
	response models.ApiResponse
}

func (this *MarkersController) Prepare() {
	this.logger = logs.NewLogger(CHANNEL_LEN)
	this.logger.SetLogger("console")
}

// @router /:lang/markers/list
func (this *MarkersController) Get() {
	defer func() {
		this.Data["json"] = this.response
		this.ServeJSON()
	}()

	var lang string
	lang = this.Ctx.Input.Param(":lang")

	this.logger.Debug(lang)

	markers, err := models.GetMarkersList(lang)

	if err == nil {
		this.response.SetSuccess()
		this.response.Data["markers"] = markers
	} else {
		this.response.SetError(models.DB_ERROR, err)
	}
}

type markerRequest struct {
	Lat float64 `json:"lat"`
	Lng float64 `json:"lng"`
	Title string
}

// @router /markers/create
func (this *MarkersController) CreateMarker() {
	defer func() {
		this.Data["json"] = this.response
		this.ServeJSON()
	}()

	//this.logger.Debug("%s", string(this.Ctx.Input.RequestBody))

	var request markerRequest
	err := json.Unmarshal(this.Ctx.Input.RequestBody, &request)

	if err != nil {
		this.response.SetError(models.JSON_PARSING, err)
		return
	}

	//this.logger.Debug("%v", request)

	id, err := models.CreateMarker(request.Lat, request.Lng, request.Title, "ru")

	if err == nil {
		this.response.SetSuccess()
		this.response.Data["newId"] = strconv.FormatInt(id, 10)
	} else {
		this.response.SetError(models.DB_ERROR, err)
	}
}