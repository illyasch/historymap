package models

import (
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
	"github.com/astaxie/beego"
)

type BgImage struct {
	Bi_id int `orm:"column(bi_id);pk"`
	Src string `orm:"size(255)"`
	Year int
	North float64
	West float64
	South float64
	East float64
}

type Marker struct {
	Marker_id int `orm:"column(marker_id);pk"`
	X float64
	Y float64
}

func init() {
	orm.RegisterModel(new(BgImage))
	orm.RegisterModel(new(Marker))
	orm.RegisterDataBase(
		"default",
			"mysql",
			beego.AppConfig.String("mysqluser") + ":" + beego.AppConfig.String("mysqlpass") + "@/" + beego.AppConfig.String("mysqldb") + "?charset=utf8",
			30)
}
