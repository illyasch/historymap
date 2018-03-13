package controllers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
)

type MarkersController struct {
	beego.Controller
}

// @router /:lang/markers
func (c *MarkersController) Get() {
	var lang string
	lang = c.Ctx.Input.Param(":lang")

	var markers []orm.Params

	o := orm.NewOrm()

	o.Raw("SELECT m.marker_id, m.x, m.y, t.title FROM markers m " +
		"INNER JOIN marker_titles t ON t.marker_id = m.marker_id " +
			"INNER JOIN langs l ON t.lang_id = l.lang_id " +
				"WHERE l.code = ? ORDER BY m.marker_id ASC", lang).Values(&markers)

	c.Data["json"] = markers
	c.ServeJSON()
}