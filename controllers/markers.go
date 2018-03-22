package controllers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
	"encoding/json"
	"historymap/models"
	"github.com/astaxie/beego/logs"
	"strconv"
)

type MarkersController struct {
	beego.Controller
}

// @router /:lang/markers/list
func (this *MarkersController) Get() {
	logger := logs.NewLogger(10000)
	logger.SetLogger("console")

	var lang string
	lang = this.Ctx.Input.Param(":lang")

	logger.Debug(lang)

	var markers []orm.Params

	o := orm.NewOrm()

	o.Raw("SELECT m.marker_id, m.x, m.y FROM marker m").Values(&markers)
	/*
	o.Raw("SELECT m.marker_id, m.x, m.y, t.title FROM marker m " +
		"INNER JOIN marker_titles t ON t.marker_id = m.marker_id " +
			"INNER JOIN langs l ON t.lang_id = l.lang_id " +
				"WHERE l.code = ? ORDER BY m.marker_id ASC", lang).Values(&markers)
*/
	this.Data["json"] = markers
	this.ServeJSON()
}

type LatLng struct {
	Lat float64 `json:"lat"`
	Lng float64 `json:"lng"`
}

// @router /markers/create
func (this *MarkersController) CreateMarker() {
	var response models.ApiResponse

	defer func() {
		this.Data["json"] = response
		this.ServeJSON()
	}()

	logger := logs.NewLogger(10000)
	logger.SetLogger("console")
	logger.Debug("%s", string(this.Ctx.Input.RequestBody))

	var newPosition LatLng
	err := json.Unmarshal(this.Ctx.Input.RequestBody, &newPosition)

	if err != nil {
		response.SetError(models.JSON_PARSING, err)
		return
	}

	logger.Debug("%v", newPosition)

	o := orm.NewOrm()

	var newMarker models.Marker

	newMarker.X = newPosition.Lat
	newMarker.Y = newPosition.Lng

	id, err := o.Insert(&newMarker)

	if err == nil {
		response.SetSuccess()
		response.Data["newId"] = strconv.FormatInt(id, 10)
	} else {
		response.SetError(models.DB_ERROR, err)
	}
}