package controllers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
)

type BgImagesController struct {
	beego.Controller
}

func (c *BgImagesController) Get() {
	o := orm.NewOrm()

	var images []orm.Params

	o.Raw("SELECT * FROM bg_imgs ORDER BY year asc").Values(&images)

	c.Data["json"] = images
	c.ServeJSON()
}